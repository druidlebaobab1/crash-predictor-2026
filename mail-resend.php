<?php
require_once __DIR__ . "/maketou-config.php";

if (!defined("RESEND_FROM")) {
    define("RESEND_FROM", "PREDICTOR <support@mail.crashpredictor.fr>");
    define("RESEND_REPLY_TO", "PREDICTOR <support@mail.crashpredictor.fr>");
    define("RESEND_SITE", "https://crashpredictor.fr");
    define("RESEND_UNSUB_SECRET", "crashpredictor-unsub-2026");
}

function mail_secrets_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "mail-secrets.php";
}

function mail_api_key() {
    $env = getenv("RESEND_API_KEY");
    if (is_string($env) && strpos($env, "re_") === 0) {
        return trim($env);
    }
    $file = mail_secrets_file();
    if (!is_file($file)) {
        return "";
    }
    $data = include $file;
    if (!is_array($data)) {
        return "";
    }
    $key = trim((string) ($data["api_key"] ?? ""));
    return strpos($key, "re_") === 0 ? $key : "";
}

function mail_is_configured() {
    return mail_api_key() !== "";
}

function mail_secrets_read() {
    $file = mail_secrets_file();
    if (!is_file($file)) {
        return [];
    }
    $data = include $file;
    return is_array($data) ? $data : [];
}

function mail_secrets_write($data) {
    if (!is_array($data)) {
        return false;
    }
    $file = mail_secrets_file();
    $php = "<?php\nreturn " . var_export($data, true) . ";\n";
    $tmp = $file . ".tmp";
    if (@file_put_contents($tmp, $php, LOCK_EX) === false) {
        return false;
    }
    return @rename($tmp, $file);
}

function mail_save_api_key($key) {
    $key = trim((string) $key);
    if (!preg_match("/^re_[A-Za-z0-9_]+$/", $key)) {
        return false;
    }
    $data = mail_secrets_read();
    $data["api_key"] = $key;
    return mail_secrets_write($data);
}

function mail_normalize_address($email) {
    $email = html_entity_decode((string) $email, ENT_QUOTES | ENT_HTML5, "UTF-8");
    $email = str_replace(["\r", "\n", "\t", "\0", "\xC2\xA0"], "", $email);
    if (function_exists("preg_replace")) {
        $email = preg_replace("/[\x00-\x1F\x7F]/", "", $email);
        $email = preg_replace("/^[\p{Z}\p{C}]+|[\p{Z}\p{C}]+$/u", "", $email);
    }
    $email = strtolower(trim((string) $email));
    $email = str_replace(" ", "", $email);
    return $email;
}

function mail_address_ok($email) {
    if ($email === "" || strpos($email, "@") === false || substr_count($email, "@") !== 1) {
        return false;
    }
    if (function_exists("filter_var") && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    return true;
}

function mail_rate_lock_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "mail-rate.lock";
}

function mail_wait_rate_slot() {
    $file = mail_rate_lock_file();
    $fh = @fopen($file, "c+");
    if ($fh === false) {
        usleep(550000);
        return;
    }
    if (!flock($fh, LOCK_EX)) {
        fclose($fh);
        usleep(550000);
        return;
    }
    $raw = stream_get_contents($fh);
    $last = is_numeric($raw) ? (float) $raw : 0.0;
    $now = microtime(true);
    $gap = 0.55;
    $wait = $gap - ($now - $last);
    if ($wait > 0 && $wait < 5) {
        usleep((int) round($wait * 1000000));
        $now = microtime(true);
    }
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, (string) $now);
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
}

function mail_log_result($ok, $id, $status, $errorMessage, $extra = []) {
    $payload = array_merge([
        "ok" => (bool) $ok,
        "resendId" => (string) $id,
        "http" => (int) $status,
        "error" => (string) $errorMessage
    ], is_array($extra) ? $extra : []);
    maketou_log("mail_send", $payload);
    if ($ok) {
        error_log("[resend] ok id=" . $id);
    } else {
        error_log("[resend] error http=" . (int) $status . " message=" . $errorMessage);
    }
}

function mail_http($method, $path, $payload = null, $timeout = 8) {
    $url = "https://api.resend.com" . $path;
    $headers = [
        "Authorization: Bearer " . mail_api_key(),
        "Content-Type: application/json",
        "Accept: application/json"
    ];
    $json = $payload === null ? null : json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (!function_exists("curl_init")) {
        return [0, ""];
    }
    $ch = curl_init($url);
    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CONNECTTIMEOUT => 2,
        CURLOPT_TIMEOUT => max(4, (int) $timeout)
    ];
    if ($json !== null) {
        $options[CURLOPT_POSTFIELDS] = $json;
    }
    curl_setopt_array($ch, $options);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return [$status, $body === false ? "" : (string) $body];
}

function mail_unsub_token($email) {
    return rtrim(strtr(base64_encode(hash_hmac("sha256", strtolower(trim((string) $email)), RESEND_UNSUB_SECRET, true)), "+/", "-_"), "=");
}

function mail_unsub_email($token) {
    $token = trim((string) $token);
    if ($token === "") {
        return "";
    }
    $file = maketou_members_file();
    if (!is_file($file)) {
        return "";
    }
    $members = json_decode((string) @file_get_contents($file), true);
    if (!is_array($members)) {
        return "";
    }
    foreach ($members as $email => $record) {
        if (hash_equals(mail_unsub_token($email), $token)) {
            return strtolower(trim((string) $email));
        }
    }
    return "";
}

function mail_record_is_active($record) {
    if (!is_array($record)) {
        return false;
    }
    $expires = maketou_parse_ts($record["subscriptionExpiresAt"] ?? ($record["vipUntil"] ?? ""));
    if ($expires > 0) {
        return $expires > time();
    }
    return !empty($record["isSubscribed"]);
}

function mail_email_is_active($email) {
    return mail_record_is_active(maketou_read_local_member($email));
}

function mail_opted_out($email) {
    $record = maketou_read_local_member(mail_normalize_address($email));
    return is_array($record) && !empty($record["emailOptOut"]);
}

function mail_mark_opt_out($email) {
    $email = mail_normalize_address($email);
    $record = maketou_read_local_member($email);
    if (!is_array($record)) {
        return false;
    }
    $record["emailOptOut"] = true;
    return maketou_write_local_member($email, $record);
}

function mail_record_can_campaign($record) {
    if (!is_array($record)) {
        return false;
    }
    if (!empty($record["emailOptOut"]) || !empty($record["emailBounced"])) {
        return false;
    }
    return !empty($record["emailInboxOk"]);
}

function mail_event_is_inbox($event) {
    return in_array($event, ["delivered", "opened", "clicked"], true);
}

function mail_event_is_dead($event) {
    return in_array($event, ["bounced", "failed", "suppressed", "complained"], true);
}

function mail_apply_resend_event($email, $event, $at = 0) {
    $email = mail_normalize_address($email);
    $event = strtolower(trim((string) $event));
    $event = preg_replace("/^email\./", "", $event);
    if ($email === "" || $event === "") {
        return false;
    }
    $record = maketou_read_local_member($email);
    if (!is_array($record)) {
        return false;
    }
    $at = (int) $at;
    $prevAt = (int) ($record["emailLastEventAt"] ?? 0);
    if ($at > 0 && $prevAt > $at) {
        return true;
    }
    if (mail_event_is_inbox($event)) {
        $record["emailInboxOk"] = true;
        $record["emailBounced"] = false;
    } elseif (mail_event_is_dead($event)) {
        $record["emailBounced"] = true;
        $record["emailInboxOk"] = false;
        if ($event === "complained") {
            $record["emailOptOut"] = true;
        }
    } else {
        return true;
    }
    $record["emailLastEvent"] = $event;
    $record["emailLastEventAt"] = $at > 0 ? $at : time();
    return maketou_write_local_member($email, $record);
}

function mail_apply_resend_events_batch($rows) {
    if (!is_array($rows) || !$rows) {
        return 0;
    }
    $file = maketou_members_file();
    $members = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        $members = is_array($decoded) ? $decoded : [];
    }
    $changed = 0;
    foreach ($rows as $row) {
        $email = mail_normalize_address($row[0] ?? "");
        $event = strtolower(trim((string) ($row[1] ?? "")));
        $event = preg_replace("/^email\./", "", $event);
        $at = (int) ($row[2] ?? 0);
        if ($email === "" || $event === "" || !is_array($members[$email] ?? null)) {
            continue;
        }
        $record = $members[$email];
        $prevAt = (int) ($record["emailLastEventAt"] ?? 0);
        if ($at > 0 && $prevAt > $at) {
            continue;
        }
        if (mail_event_is_inbox($event)) {
            $record["emailInboxOk"] = true;
            $record["emailBounced"] = false;
        } elseif (mail_event_is_dead($event)) {
            $record["emailBounced"] = true;
            $record["emailInboxOk"] = false;
            if ($event === "complained") {
                $record["emailOptOut"] = true;
            }
        } else {
            continue;
        }
        $record["emailLastEvent"] = $event;
        $record["emailLastEventAt"] = $at > 0 ? $at : time();
        $members[$email] = $record;
        $changed++;
    }
    if ($changed > 0) {
        $tmp = $file . ".tmp";
        if (@file_put_contents($tmp, json_encode($members, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX) !== false) {
            @rename($tmp, $file);
        }
    }
    return $changed;
}

function mail_mark_dead_address($email, $reason = "invalid") {
    mail_apply_resend_event($email, "bounced", time());
    maketou_log("mail_inbox", ["email" => mail_normalize_address($email), "event" => "bounced", "reason" => (string) $reason]);
}

function mail_send_looks_dead($result) {
    if (!is_array($result) || !empty($result["ok"])) {
        return false;
    }
    $http = (int) ($result["http"] ?? 0);
    $err = strtolower((string) ($result["error"] ?? ""));
    if ($http === 422) {
        return true;
    }
    return (bool) preg_match("/invalid|bounce|suppress|undeliver|not a valid|does not exist/", $err);
}

function mail_webhook_endpoint() {
    return RESEND_SITE . "/index.php?action=resend_webhook";
}

function mail_ensure_webhook() {
    static $done = false;
    if ($done || !mail_is_configured()) {
        return $done;
    }
    $secrets = mail_secrets_read();
    if (trim((string) ($secrets["webhook_secret"] ?? "")) !== "") {
        $done = true;
        return true;
    }
    $endpoint = mail_webhook_endpoint();
    $found = null;
    list($status, $body) = mail_http("GET", "/webhooks", null, 12);
    $list = json_decode((string) $body, true);
    $items = is_array($list["data"] ?? null) ? $list["data"] : [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }
        if (rtrim((string) ($item["endpoint"] ?? ""), "/") === rtrim($endpoint, "/")) {
            $found = $item;
            break;
        }
    }
    if (!is_array($found)) {
        list($status, $body) = mail_http("POST", "/webhooks", [
            "endpoint" => $endpoint,
            "events" => [
                "email.delivered",
                "email.opened",
                "email.clicked",
                "email.bounced",
                "email.complained",
                "email.failed",
                "email.suppressed"
            ]
        ], 12);
        $found = json_decode((string) $body, true);
        if ($status < 200 || $status >= 300 || !is_array($found)) {
            return false;
        }
    }
    $secret = trim((string) ($found["signing_secret"] ?? ($found["secret"] ?? "")));
    $id = trim((string) ($found["id"] ?? ""));
    if ($secret === "" && $id !== "") {
        list($st2, $one) = mail_http("GET", "/webhooks/" . rawurlencode($id), null, 12);
        $detail = json_decode((string) $one, true);
        if ($st2 >= 200 && $st2 < 300 && is_array($detail)) {
            $secret = trim((string) ($detail["signing_secret"] ?? ($detail["secret"] ?? "")));
        }
    }
    if ($secret === "") {
        return false;
    }
    $secrets["webhook_id"] = $id;
    $secrets["webhook_secret"] = $secret;
    if (!mail_secrets_write($secrets)) {
        return false;
    }
    $done = true;
    return true;
}

function mail_backfill_inbox($maxPages = 4) {
    if (!mail_is_configured()) {
        return 0;
    }
    $secrets = mail_secrets_read();
    $after = trim((string) ($secrets["inbox_backfill_after"] ?? ""));
    $doneAt = (int) ($secrets["inbox_backfill_done_at"] ?? 0);
    if ($doneAt > 0 && (time() - $doneAt) < 600 && $after === "") {
        return 0;
    }
    $rows = [];
    $pages = 0;
    $hasMore = true;
    while ($hasMore && $pages < max(1, (int) $maxPages)) {
        $path = "/emails?limit=100";
        if ($after !== "") {
            $path .= "&after=" . rawurlencode($after);
        }
        list($status, $body) = mail_http("GET", $path, null, 12);
        $pack = json_decode((string) $body, true);
        if ($status < 200 || $status >= 300 || !is_array($pack)) {
            break;
        }
        $items = is_array($pack["data"] ?? null) ? $pack["data"] : [];
        if (!$items) {
            $hasMore = false;
            $after = "";
            break;
        }
        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }
            $event = strtolower((string) ($item["last_event"] ?? ""));
            $at = strtotime((string) ($item["created_at"] ?? "")) ?: time();
            $tos = $item["to"] ?? [];
            if (!is_array($tos)) {
                $tos = [$tos];
            }
            foreach ($tos as $to) {
                $rows[] = [(string) $to, $event, $at];
            }
        }
        $after = (string) ($items[count($items) - 1]["id"] ?? "");
        $hasMore = !empty($pack["has_more"]);
        $pages++;
        if ($after === "") {
            $hasMore = false;
        }
    }
    $changed = mail_apply_resend_events_batch($rows);
    $secrets = mail_secrets_read();
    if ($hasMore && $after !== "") {
        $secrets["inbox_backfill_after"] = $after;
        unset($secrets["inbox_backfill_done_at"]);
    } else {
        $secrets["inbox_backfill_after"] = "";
        $secrets["inbox_backfill_done_at"] = time();
    }
    mail_secrets_write($secrets);
    return $changed;
}

function mail_svix_ok($raw, $id, $timestamp, $signature, $secret) {
    $id = trim((string) $id);
    $timestamp = trim((string) $timestamp);
    $signature = trim((string) $signature);
    $secret = trim((string) $secret);
    if ($id === "" || $timestamp === "" || $signature === "" || $secret === "") {
        return false;
    }
    if (abs(time() - (int) $timestamp) > 300) {
        return false;
    }
    $key = $secret;
    if (stripos($secret, "whsec_") === 0) {
        $decoded = base64_decode(substr($secret, 6), true);
        if ($decoded !== false && $decoded !== "") {
            $key = $decoded;
        }
    }
    $digest = base64_encode(hash_hmac("sha256", $id . "." . $timestamp . "." . $raw, $key, true));
    foreach (preg_split("/\s+/", $signature) as $item) {
        $item = trim((string) $item);
        if (stripos($item, "v1,") === 0 && hash_equals($digest, substr($item, 3))) {
            return true;
        }
    }
    return false;
}

function mail_handle_resend_webhook() {
    header("Content-Type: application/json; charset=utf-8");
    $raw = (string) file_get_contents("php://input");
    mail_ensure_webhook();
    $secret = trim((string) (mail_secrets_read()["webhook_secret"] ?? ""));
    $svixId = (string) ($_SERVER["HTTP_SVIX_ID"] ?? "");
    $svixTs = (string) ($_SERVER["HTTP_SVIX_TIMESTAMP"] ?? "");
    $svixSig = (string) ($_SERVER["HTTP_SVIX_SIGNATURE"] ?? "");
    if ($secret === "" || !mail_svix_ok($raw, $svixId, $svixTs, $svixSig, $secret)) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "invalid_signature"]);
        exit;
    }
    $payload = json_decode($raw, true);
    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(["ok" => false]);
        exit;
    }
    $event = strtolower((string) ($payload["type"] ?? ""));
    $data = is_array($payload["data"] ?? null) ? $payload["data"] : [];
    $at = strtotime((string) ($payload["created_at"] ?? "")) ?: time();
    $tos = $data["to"] ?? [];
    if (!is_array($tos)) {
        $tos = [$tos];
    }
    foreach ($tos as $to) {
        mail_apply_resend_event($to, $event, $at);
    }
    echo json_encode(["ok" => true]);
    exit;
}

function mail_release_client() {
    ignore_user_abort(true);
    if (function_exists("session_write_close")) {
        @session_write_close();
    }
    if (function_exists("fastcgi_finish_request")) {
        @fastcgi_finish_request();
        return;
    }
    while (ob_get_level() > 0) {
        @ob_end_flush();
    }
    @flush();
}

function mail_display_name($name) {
    $name = trim(preg_replace("/\s+/", " ", (string) $name));
    if ($name === "" || strcasecmp($name, "Client") === 0) {
        return "";
    }
    $parts = preg_split("/\s+/", $name);
    return is_array($parts) && isset($parts[0]) ? (string) $parts[0] : $name;
}

function mail_cta($label, $url) {
    $label = htmlspecialchars((string) $label, ENT_QUOTES, "UTF-8");
    $url = htmlspecialchars((string) $url, ENT_QUOTES, "UTF-8");
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 10px;"><tr><td align="center">'
        . '<a href="' . $url . '" style="display:block;width:100%;max-width:100%;box-sizing:border-box;padding:16px 12px;border-radius:14px;background:#ffc837;background:linear-gradient(135deg,#ffe08a,#ffc837 45%,#f59e0b);color:#140a08;font-weight:900;font-size:15px;line-height:1.35;text-decoration:none;letter-spacing:.02em;text-align:center;white-space:normal;">' . $label . "</a>"
        . "</td></tr></table>";
}

function mail_platform_links() {
    $url = htmlspecialchars(RESEND_SITE, ENT_QUOTES, "UTF-8");
    return mail_cta("ACCÉDER À MON ESPACE — 4 900 FCFA", RESEND_SITE)
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 6px;"><tr><td align="center" style="font-size:11px;line-height:1.35;color:#e5e7eb;white-space:nowrap;word-break:normal;">'
        . '<span style="white-space:nowrap;word-break:normal;font-size:11px;">👉&nbsp;Lien&nbsp;direct&nbsp;vers&nbsp;la&nbsp;plateforme&nbsp;:&nbsp;<a href="' . $url . '" style="color:#ffc837;font-weight:700;font-size:11px;text-decoration:underline;white-space:nowrap;word-break:normal;">' . $url . "</a></span>"
        . "</td></tr></table>";
}

function mail_welcome_badge() {
    return '<tr><td align="center" style="padding:18px 18px 6px;background:#0c0716;">'
        . '<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">'
        . '<tr><td align="center" style="padding:9px 16px;border:1px solid #ffc837;border-radius:999px;background:#140c1c;color:#ffc837;font-size:11px;letter-spacing:.10em;font-weight:800;line-height:1.35;white-space:nowrap;">'
        . "✨ COMPTE CRÉÉ AVEC SUCCÈS ✨"
        . "</td></tr></table></td></tr>";
}

function mail_wrap($preheader, $innerHtml, $email, $badgeHtml = "") {
    $unsub = RESEND_SITE . "/index.php?action=mail_unsub&t=" . rawurlencode(mail_unsub_token($email));
    $preheader = htmlspecialchars((string) $preheader, ENT_QUOTES, "UTF-8");
    return '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PREDICTOR</title></head>'
        . '<body style="margin:0;padding:0;background:#07040f;color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">'
        . '<div style="display:none;max-height:0;overflow:hidden;">' . $preheader . "</div>"
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07040f;padding:24px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0c0716;border:1px solid rgba(255,200,55,.35);border-radius:18px;overflow:hidden;">'
        . $badgeHtml
        . '<tr><td style="padding:18px 22px 8px;text-align:center;background:linear-gradient(180deg,#1a1028,#0c0716);">'
        . '<div style="color:#ffc837;font-size:13px;letter-spacing:.18em;font-weight:800;">PREDICTOR</div>'
        . '<div style="color:#fff;font-size:22px;font-weight:900;margin-top:8px;">SUITE MULTI-JEUX</div>'
        . "</td></tr>"
        . '<tr><td style="padding:8px 24px 8px;font-size:15px;line-height:1.55;color:#e5e7eb;">' . $innerHtml . "</td></tr>"
        . '<tr><td style="padding:25px 24px 18px;font-size:11px;line-height:1.5;color:#777777;text-align:center;">'
        . "PREDICTOR · crashpredictor.fr<br>"
        . '<a href="' . htmlspecialchars($unsub, ENT_QUOTES, "UTF-8") . '" style="color:#777777;font-size:11px;text-decoration:underline;">Ne plus recevoir d\'emails de Predictor</a>'
        . "</td></tr></table></td></tr></table></body></html>";
}

function mail_html_welcome($email, $uniqueId, $name = "") {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $safeEmail = htmlspecialchars((string) $email, ENT_QUOTES, "UTF-8");
    $display = mail_display_name($name);
    $hello = $display !== ""
        ? "Bienvenue " . htmlspecialchars($display, ENT_QUOTES, "UTF-8") . ", votre compte PREDICTOR est prêt !"
        : "Bienvenue, votre compte PREDICTOR est prêt !";
    $inner = "<p style=\"font-size:18px;font-weight:800;color:#fff;margin:8px 0 16px;\">" . $hello . "</p>"
        . "<p>Email : <strong style=\"color:#fff;\">" . $safeEmail . "</strong></p>"
        . ($uniqueId !== "" ? "<p>Identifiant : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . "<p style=\"margin:12px 0 8px;font-size:13px;line-height:1.35;\">Connectez-vous pour débloquer vos signaux VIP pour seulement <strong style=\"color:#ffc837;\">4 900 FCFA</strong>.</p>"
        . mail_platform_links();
    return mail_wrap($hello, $inner, $email, mail_welcome_badge());
}

function mail_html_abandon($email, $uniqueId, $name = "") {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $display = mail_display_name($name);
    $hello = $display !== ""
        ? "Bonjour " . htmlspecialchars($display, ENT_QUOTES, "UTF-8") . ","
        : "Bonjour,";
    $inner = "<p>" . $hello . " vous avez commencé à débloquer PREDICTOR, mais le paiement n’est pas allé au bout.</p>"
        . "<p>Débloquez vos signaux VIP pour seulement <strong style=\"color:#ffc837;\">4 900 FCFA</strong>.</p>"
        . "<p>Vous ouvrez Crash, Aviator, Lucky Jet, Mines, Penalty, Apple of Fortune, et le module sport <strong>LE BOSS</strong>.</p>"
        . "<p>Les 6 algorithmes live et le module sport <strong>LE BOSS</strong> tournent déjà avec des signaux validés en continu.</p>"
        . ($uniqueId !== "" ? "<p>ID : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . mail_platform_links();
    return mail_wrap("Votre accès VIP à 4 900 FCFA n’est pas encore débloqué.", $inner, $email);
}

function mail_live_sport_pick() {
    $base = [
        "team1" => "DINAMO MINSK",
        "odd1" => "1.34",
        "team2" => "BARANOVICI",
        "odd2" => "8.57",
        "winner" => 2
    ];
    $file = __DIR__ . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "sport-match.json";
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $base = array_merge($base, $decoded);
        }
    }
    $winner = ((int) ($base["winner"] ?? 2) === 1) ? 1 : 2;
    $teamWinner = strtoupper(trim((string) ($winner === 1 ? ($base["team1"] ?? "") : ($base["team2"] ?? ""))));
    $teamOpponent = strtoupper(trim((string) ($winner === 1 ? ($base["team2"] ?? "") : ($base["team1"] ?? ""))));
    $oddsWinner = trim((string) ($winner === 1 ? ($base["odd1"] ?? "") : ($base["odd2"] ?? "")));
    if ($teamWinner === "") {
        $teamWinner = "BARANOVICI";
    }
    if ($teamOpponent === "") {
        $teamOpponent = "DINAMO MINSK";
    }
    if ($oddsWinner === "") {
        $oddsWinner = "8.57";
    }
    $key = strtolower($teamWinner . "|" . $teamOpponent . "|" . $oddsWinner);
    return [
        "teamWinner" => $teamWinner,
        "teamOpponent" => $teamOpponent,
        "oddsWinner" => $oddsWinner,
        "key" => $key
    ];
}

function mail_html_signal($email, $uniqueId, $name, $pick) {
    $teamWinner = htmlspecialchars((string) ($pick["teamWinner"] ?? ""), ENT_QUOTES, "UTF-8");
    $teamOpponent = htmlspecialchars((string) ($pick["teamOpponent"] ?? ""), ENT_QUOTES, "UTF-8");
    $oddsWinner = htmlspecialchars((string) ($pick["oddsWinner"] ?? ""), ENT_QUOTES, "UTF-8");
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $display = mail_display_name($name);
    $hello = $display !== ""
        ? "Bonjour " . htmlspecialchars($display, ENT_QUOTES, "UTF-8") . ","
        : "Bonjour,";
    $site = htmlspecialchars(RESEND_SITE, ENT_QUOTES, "UTF-8");
    $inner = "<p style=\"margin:4px 0 14px;color:#e5e7eb;\">" . $hello . "</p>"
        . "<p style=\"margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:900;color:#ffc837;\">💣 PRÉDICTION GAGNANTE VALIDÉE EN DIRECT !</p>"
        . "<p style=\"margin:0 0 18px;padding:14px 12px;border:1px solid rgba(255,200,55,.4);border-radius:12px;background:#10182a;color:#fff;font-size:16px;line-height:1.45;font-weight:800;\">⚽ "
        . $teamWinner . " bat " . $teamOpponent . " — Cote de " . $oddsWinner . " encaissée avec succès par l'algorithme !</p>"
        . ($uniqueId !== "" ? "<p style=\"margin:0 0 14px;color:#cbd5e1;\">ID : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . "<p style=\"margin:0 0 16px;color:#f8fafc;line-height:1.55;\">L'accès VIP complet aux 6 signaux en continu est exceptionnellement à <strong style=\"color:#ffc837;\">4 900 FCFA</strong> pour quelques heures avant passage au tarif normal de <strong style=\"color:#fff;\">15 000 FCFA</strong>.</p>"
        . "<p style=\"margin:0 0 8px;color:#cbd5e1;font-size:14px;\">Paiement instantané : Wave, Orange Money, MTN, Moov &amp; Carte Bancaire.</p>"
        . mail_cta("⚡ DÉBLOQUER MON ACCÈS — 4 900 FCFA", RESEND_SITE)
        . '<p style="margin:12px 0 0;text-align:center;font-size:12px;color:#d1d5db;">Lien direct : <a href="' . $site . '" style="color:#ffc837;font-weight:800;">' . $site . "</a></p>";
    $unsub = RESEND_SITE . "/index.php?action=mail_unsub&t=" . rawurlencode(mail_unsub_token($email));
    return '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PREDICTOR</title></head>'
        . '<body style="margin:0;padding:0;background:#0a0f1d;color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">'
        . '<div style="display:none;max-height:0;overflow:hidden;">Cote ' . $oddsWinner . " validée sur " . $teamWinner . "</div>"
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1d;padding:24px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a0f1d;border:1px solid rgba(255,200,55,.4);border-radius:18px;overflow:hidden;">'
        . '<tr><td style="padding:20px 22px 10px;text-align:center;background:linear-gradient(180deg,#161b2c,#0a0f1d);">'
        . '<div style="color:#ffc837;font-size:13px;letter-spacing:.18em;font-weight:800;">PREDICTOR</div>'
        . '<div style="color:#fff;font-size:20px;font-weight:900;margin-top:8px;">ALERTE SIGNAL FOOT</div>'
        . "</td></tr>"
        . '<tr><td style="padding:8px 22px 10px;font-size:15px;line-height:1.55;color:#e5e7eb;">' . $inner . "</td></tr>"
        . '<tr><td style="padding:22px;font-size:11px;line-height:1.5;color:#777777;text-align:center;">'
        . "PREDICTOR · crashpredictor.fr<br>"
        . '<a href="' . htmlspecialchars($unsub, ENT_QUOTES, "UTF-8") . '" style="color:#777777;font-size:11px;text-decoration:underline;">Ne plus recevoir d\'emails de Predictor</a>'
        . "</td></tr></table></td></tr></table></body></html>";
}

function mail_html_reactivate($email, $uniqueId, $name = "") {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $display = mail_display_name($name);
    $hello = $display !== ""
        ? "Bonjour " . htmlspecialchars($display, ENT_QUOTES, "UTF-8") . ","
        : "Bonjour,";
    $inner = "<p>" . $hello . " votre compte PREDICTOR est toujours là, mais la licence n’est pas activée.</p>"
        . ($uniqueId !== "" ? "<p>ID : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . "<p>Les 6 algorithmes live et le module sport <strong>LE BOSS</strong> tournent déjà avec des signaux validés en continu.</p>"
        . "<p>Débloquez vos signaux VIP pour seulement <strong style=\"color:#ffc837;\">4 900 FCFA</strong>.</p>"
        . mail_platform_links();
    return mail_wrap("Reprenez vos signaux VIP sur PREDICTOR.", $inner, $email);
}

function mail_send($to, $subject, $html, $extra = []) {
    $to = mail_normalize_address($to);
    if (!mail_address_ok($to) || mail_opted_out($to)) {
        mail_log_result(false, "", 0, "invalid_or_opted_out");
        return ["ok" => false, "id" => ""];
    }
    if (!mail_is_configured()) {
        mail_log_result(false, "", 0, "no_key");
        return ["ok" => false, "id" => ""];
    }
    mail_ensure_webhook();
    $unsub = RESEND_SITE . "/index.php?action=mail_unsub&t=" . rawurlencode(mail_unsub_token($to));
    $payload = [
        "from" => "PREDICTOR <support@mail.crashpredictor.fr>",
        "to" => [$to],
        "reply_to" => ["PREDICTOR <support@mail.crashpredictor.fr>"],
        "subject" => $subject,
        "html" => $html,
        "headers" => [
            "List-Unsubscribe" => "<" . $unsub . ">",
            "List-Unsubscribe-Post" => "List-Unsubscribe=One-Click"
        ]
    ];
    if (!empty($extra["scheduled_at"])) {
        $payload["scheduled_at"] = $extra["scheduled_at"];
    }
    $chHeaders = [
        "Authorization: Bearer " . mail_api_key(),
        "Content-Type: application/json",
        "Accept: application/json"
    ];
    if (!empty($extra["idempotency"])) {
        $chHeaders[] = "Idempotency-Key: " . substr((string) $extra["idempotency"], 0, 256);
    }
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (!function_exists("curl_init")) {
        mail_log_result(false, "", 0, "no_curl");
        return ["ok" => false, "id" => ""];
    }
    $attempts = 0;
    $maxAttempts = 3;
    $status = 0;
    $id = "";
    $errorMessage = "";
    $body = "";
    try {
        while ($attempts < $maxAttempts) {
            $attempts++;
            mail_wait_rate_slot();
            $ch = curl_init("https://api.resend.com/emails");
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_HTTPHEADER => $chHeaders,
                CURLOPT_POSTFIELDS => $json,
                CURLOPT_CONNECTTIMEOUT => 4,
                CURLOPT_TIMEOUT => 12
            ]);
            $body = curl_exec($ch);
            $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlErr = curl_error($ch);
            curl_close($ch);
            $data = json_decode((string) $body, true);
            if (!is_array($data)) {
                $data = [];
            }
            $id = (string) ($data["id"] ?? "");
            $errorMessage = (string) ($data["message"] ?? ($data["error"]["message"] ?? ""));
            if ($errorMessage === "" && $curlErr !== "") {
                $errorMessage = $curlErr;
            }
            if ($errorMessage === "" && ($body === false || $body === "") && $status === 0) {
                $errorMessage = "empty_response";
            }
            if ($status === 429 && $attempts < $maxAttempts) {
                mail_log_result(false, $id, $status, $errorMessage !== "" ? $errorMessage : "rate_limited", ["retry" => $attempts]);
                usleep(700000);
                continue;
            }
            break;
        }
        $ok = $status >= 200 && $status < 300 && $id !== "";
        if ($ok) {
            $errorMessage = "";
        } elseif ($errorMessage === "") {
            $errorMessage = "http_" . $status;
        }
        mail_log_result($ok, $id, $status, $errorMessage, [
            "scheduled" => !empty($extra["scheduled_at"]),
            "attempts" => $attempts
        ]);
        $result = ["ok" => $ok, "id" => $id, "http" => $status, "error" => $errorMessage];
        if (!$ok && mail_send_looks_dead($result)) {
            mail_mark_dead_address($to, $errorMessage !== "" ? $errorMessage : ("http_" . $status));
        }
        return $result;
    } catch (Throwable $e) {
        mail_log_result(false, "", 0, $e->getMessage());
        return ["ok" => false, "id" => "", "error" => $e->getMessage()];
    }
}

function mail_cancel($emailId) {
    $emailId = trim((string) $emailId);
    if ($emailId === "") {
        return;
    }
    mail_http("DELETE", "/emails/" . rawurlencode($emailId));
}

function mail_send_welcome($email, $uniqueId, $name = "") {
    $email = mail_normalize_address($email);
    $record = maketou_read_local_member($email);
    if (is_array($record) && (!empty($record["welcomeSent"]) || !empty($record["emailBounced"]) || !empty($record["emailOptOut"]))) {
        return false;
    }
    $uniqueId = $uniqueId !== "" ? $uniqueId : (is_array($record) ? (string) ($record["uniqueId"] ?? "") : "");
    if ($name === "" && is_array($record)) {
        $name = (string) ($record["name"] ?? "");
    }
    $sent = mail_send(
        $email,
        "🚀 Bienvenue sur PREDICTOR — Votre compte est prêt !",
        mail_html_welcome($email, $uniqueId, $name),
        ["idempotency" => "welcome-" . md5($email)]
    );
    if ($sent["ok"] && is_array($record)) {
        $record["welcomeSent"] = true;
        maketou_write_local_member($email, $record);
    } elseif ($sent["ok"] && !is_array($record)) {
        $fresh = maketou_read_local_member($email);
        if (is_array($fresh)) {
            $fresh["welcomeSent"] = true;
            maketou_write_local_member($email, $fresh);
        }
    }
    return !empty($sent["ok"]);
}

function mail_email_abandon_recent($email) {
    $email = mail_normalize_address($email);
    foreach (maketou_read_carts() as $row) {
        if (!is_array($row) || strtolower((string) ($row["email"] ?? "")) !== $email) {
            continue;
        }
        if (!empty($row["abandonEmailId"]) && empty($row["abandonEmailed"])) {
            return true;
        }
    }
    $record = maketou_read_local_member($email);
    if (is_array($record) && (int) ($record["lastAbandonEmailAt"] ?? 0) > time() - 86400) {
        return true;
    }
    return false;
}

function mail_on_checkout($ref, $email, $uniqueId) {
    $ref = trim((string) $ref);
    $email = mail_normalize_address($email);
    if ($ref === "" || $email === "" || mail_opted_out($email)) {
        return;
    }
    $stateActive = mail_email_is_active($email);
    if ($stateActive) {
        return;
    }
    $carts = maketou_read_carts();
    $row = is_array($carts[$ref] ?? null) ? $carts[$ref] : [];
    if (!empty($row["abandonEmailed"]) || !empty($row["abandonEmailId"])) {
        return;
    }
    if (mail_email_abandon_recent($email)) {
        return;
    }
    $member = maketou_read_local_member($email);
    $name = is_array($member) ? (string) ($member["name"] ?? "") : "";
    $sent = mail_send(
        $email,
        "🔥 Débloquez vos signaux VIP — L'offre à 4 900 FCFA expire bientôt !",
        mail_html_abandon($email, $uniqueId, $name),
        [
            "scheduled_at" => gmdate("c", time() + 3600),
            "idempotency" => "abandon-" . md5($ref)
        ]
    );
    $row["abandonDueAt"] = time() + 3600;
    if (!empty($sent["ok"])) {
        $row["abandonEmailId"] = $sent["id"];
    }
    $carts[$ref] = $row;
    maketou_write_carts($carts);
}

function mail_on_paid($email, $ref) {
    $email = mail_normalize_address($email);
    $ref = trim((string) $ref);
    $carts = maketou_read_carts();
    $changed = false;
    foreach ($carts as $id => $row) {
        if (!is_array($row)) {
            continue;
        }
        $samePerson = strtolower((string) ($row["email"] ?? "")) === $email || (string) $id === $ref;
        if (!$samePerson) {
            continue;
        }
        if (!empty($row["abandonEmailId"])) {
            mail_cancel($row["abandonEmailId"]);
        }
        $row["abandonEmailed"] = true;
        $row["abandonEmailId"] = "";
        $carts[$id] = $row;
        $changed = true;
    }
    if ($changed) {
        maketou_write_carts($carts);
    }
}

function mail_process_abandoned($limit = 8, $forceDue = false) {
    $limit = max(1, min(15, (int) $limit));
    $carts = maketou_read_carts();
    $sent = 0;
    $skipped = 0;
    $now = time();
    foreach ($carts as $ref => $row) {
        if ($sent >= $limit || !is_array($row)) {
            continue;
        }
        if (!empty($row["abandonEmailed"])) {
            continue;
        }
        $due = (int) ($row["abandonDueAt"] ?? 0);
        $created = (int) ($row["createdAt"] ?? 0);
        if ($due <= 0 && $created > 0) {
            $due = $created + 3600;
        }
        if (!$forceDue && ($due <= 0 || $due > $now)) {
            continue;
        }
        if ($forceDue && $due <= 0 && $created <= 0) {
            continue;
        }
        if (!empty($row["abandonEmailId"])) {
            $row["abandonEmailed"] = true;
            $emailDone = mail_normalize_address($row["email"] ?? "");
            if ($emailDone !== "") {
                $member = maketou_read_local_member($emailDone);
                if (is_array($member)) {
                    $member["lastAbandonEmailAt"] = $now;
                    maketou_write_local_member($emailDone, $member);
                }
            }
            $carts[$ref] = $row;
            continue;
        }
        $email = mail_normalize_address($row["email"] ?? "");
        $uniqueId = (string) ($row["uniqueId"] ?? "");
        $member = maketou_read_local_member($email);
        if ($email === "" || mail_opted_out($email) || mail_email_is_active($email) || (is_array($member) && !empty($member["emailBounced"]))) {
            $row["abandonEmailed"] = true;
            $carts[$ref] = $row;
            continue;
        }
        if (!mail_record_can_campaign($member)) {
            continue;
        }
        if (mail_email_abandon_recent($email)) {
            $skipped++;
            continue;
        }
        $name = is_array($member) ? (string) ($member["name"] ?? "") : "";
        $result = mail_send(
            $email,
            "🔥 Débloquez vos signaux VIP — L'offre à 4 900 FCFA expire bientôt !",
            mail_html_abandon($email, $uniqueId, $name),
            ["idempotency" => "abandon-due-" . md5((string) $ref)]
        );
        $row["abandonEmailed"] = true;
        if (!empty($result["ok"])) {
            $sent++;
            if (is_array($member)) {
                $member["lastAbandonEmailAt"] = $now;
                maketou_write_local_member($email, $member);
            }
        }
        $carts[$ref] = $row;
    }
    maketou_write_carts($carts);
    return ["ok" => true, "sent" => $sent, "skipped" => $skipped];
}

function mail_broadcast_inactive($limit = 8, $offset = 0) {
    $limit = max(1, min(10, (int) $limit));
    $offset = max(0, (int) $offset);
    mail_ensure_webhook();
    if ($offset === 0) {
        mail_backfill_inbox(5);
    }
    $file = maketou_members_file();
    $members = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        $members = is_array($decoded) ? $decoded : [];
    }
    $targets = [];
    foreach ($members as $email => $record) {
        if (!is_array($record)) {
            continue;
        }
        $email = mail_normalize_address($record["email"] ?? $email);
        if ($email === "" || !empty($record["emailOptOut"]) || !empty($record["broadcastSent"])) {
            continue;
        }
        if (!mail_record_can_campaign($record) || mail_record_is_active($record)) {
            continue;
        }
        $targets[] = [$email, (string) ($record["uniqueId"] ?? ""), (string) ($record["name"] ?? "")];
    }
    $slice = array_slice($targets, $offset, $limit);
    $sent = 0;
    foreach ($slice as $item) {
        $email = $item[0];
        $uniqueId = $item[1];
        $name = $item[2];
        $result = mail_send(
            $email,
            "🔥 Vos prédictions sont prêtes — Reprenez vos signaux VIP sur PREDICTOR",
            mail_html_reactivate($email, $uniqueId, $name),
            ["idempotency" => "broadcast-" . md5($email)]
        );
        if (!empty($result["ok"])) {
            $sent++;
            $record = maketou_read_local_member($email);
            if (is_array($record)) {
                $record["broadcastSent"] = true;
                maketou_write_local_member($email, $record);
            }
        }
        usleep(600000);
    }
    $scannedThrough = $offset + count($slice);
    $remaining = max(0, count($targets) - $scannedThrough);
    return [
        "ok" => true,
        "sent" => $sent,
        "scanned" => count($slice),
        "total" => count($targets),
        "hasMore" => $remaining > 0,
        "nextOffset" => $scannedThrough
    ];
}

function mail_broadcast_signal($limit = 8, $offset = 0) {
    $limit = max(1, min(10, (int) $limit));
    $offset = max(0, (int) $offset);
    mail_ensure_webhook();
    if ($offset === 0) {
        mail_backfill_inbox(5);
    }
    $pick = mail_live_sport_pick();
    $key = strtolower(trim((string) ($pick["key"] ?? "")));
    $file = maketou_members_file();
    $members = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        $members = is_array($decoded) ? $decoded : [];
    }
    $targets = [];
    foreach ($members as $email => $record) {
        if (!is_array($record)) {
            continue;
        }
        $email = mail_normalize_address($record["email"] ?? $email);
        if ($email === "" || !empty($record["emailOptOut"])) {
            continue;
        }
        if (!mail_record_can_campaign($record) || mail_record_is_active($record)) {
            continue;
        }
        $already = strtolower(trim((string) ($record["signalBroadcastKey"] ?? "")));
        if ($already !== "" && $already === $key) {
            continue;
        }
        $targets[] = [$email, (string) ($record["uniqueId"] ?? ""), (string) ($record["name"] ?? "")];
    }
    $slice = array_slice($targets, $offset, $limit);
    $sent = 0;
    $subject = "🚨 ALERTE : Cote " . $pick["oddsWinner"] . " VALIDÉE (" . $pick["teamWinner"] . ") — Fin de l'offre à 4 900 FCFA";
    foreach ($slice as $item) {
        $email = $item[0];
        $uniqueId = $item[1];
        $name = $item[2];
        $result = mail_send(
            $email,
            $subject,
            mail_html_signal($email, $uniqueId, $name, $pick),
            ["idempotency" => "signal-" . md5($email . "|" . $key)]
        );
        if (!empty($result["ok"])) {
            $sent++;
            $record = maketou_read_local_member($email);
            if (is_array($record)) {
                $record["signalBroadcastKey"] = $key;
                maketou_write_local_member($email, $record);
            }
        }
        usleep(600000);
    }
    $scannedThrough = $offset + count($slice);
    $remaining = max(0, count($targets) - $scannedThrough);
    return [
        "ok" => true,
        "sent" => $sent,
        "scanned" => count($slice),
        "total" => count($targets),
        "hasMore" => $remaining > 0,
        "nextOffset" => $scannedThrough,
        "match" => [
            "teamWinner" => $pick["teamWinner"],
            "teamOpponent" => $pick["teamOpponent"],
            "oddsWinner" => $pick["oddsWinner"]
        ]
    ];
}

function mail_handle_unsub() {
    $token = trim((string) ($_GET["t"] ?? ($_POST["t"] ?? "")));
    $email = mail_unsub_email($token);
    if ($email !== "") {
        mail_mark_opt_out($email);
    }
    header("Content-Type: text/html; charset=utf-8");
    echo "<!DOCTYPE html><html lang=\"fr\"><head><meta charset=\"UTF-8\"><title>Désabonnement</title></head><body style=\"background:#07040f;color:#fff;font-family:Arial;padding:40px;text-align:center;\">";
    echo "<h1 style=\"color:#ffc837;\">PREDICTOR</h1><p>Vous ne recevrez plus nos emails de relance.</p>";
    echo "<p><a href=\"" . htmlspecialchars(RESEND_SITE, ENT_QUOTES, "UTF-8") . "\" style=\"color:#ffc837;\">Retour au site</a></p></body></html>";
    exit;
}

if (basename((string) ($_SERVER["SCRIPT_FILENAME"] ?? "")) === "mail-resend.php") {
    http_response_code(403);
    exit;
}
