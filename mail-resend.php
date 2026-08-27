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

function mail_save_api_key($key) {
    $key = trim((string) $key);
    if (!preg_match("/^re_[A-Za-z0-9_]+$/", $key)) {
        return false;
    }
    $file = mail_secrets_file();
    $php = "<?php\nreturn [" . "\n    \"api_key\" => " . var_export($key, true) . "\n];\n";
    $tmp = $file . ".tmp";
    if (@file_put_contents($tmp, $php, LOCK_EX) === false) {
        return false;
    }
    return @rename($tmp, $file);
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

function mail_http($method, $path, $payload = null) {
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
        CURLOPT_TIMEOUT => 8
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
        . '<a href="' . $url . '" style="display:block;width:100%;max-width:100%;box-sizing:border-box;padding:18px 14px;border-radius:14px;background:#ffc837;background:linear-gradient(135deg,#ffe08a,#ffc837 45%,#f59e0b);color:#140a08;font-weight:900;font-size:16px;line-height:1.35;text-decoration:none;letter-spacing:.03em;text-align:center;">' . $label . "</a>"
        . "</td></tr></table>";
}

function mail_platform_links() {
    $url = htmlspecialchars(RESEND_SITE, ENT_QUOTES, "UTF-8");
    return mail_cta("ACCÉDER À MON ESPACE / SE CONNECTER", RESEND_SITE)
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 6px;"><tr><td align="center" style="font-size:12px;line-height:1.4;color:#e5e7eb;white-space:nowrap;word-break:normal;">'
        . '<span style="white-space:nowrap;word-break:normal;font-size:12px;">👉 Lien direct vers la plateforme : <a href="' . $url . '" style="color:#ffc837;font-weight:700;font-size:12px;text-decoration:underline;white-space:nowrap;word-break:normal;">' . $url . "</a></span>"
        . "</td></tr></table>";
}

function mail_wrap($preheader, $innerHtml, $email) {
    $unsub = RESEND_SITE . "/index.php?action=mail_unsub&t=" . rawurlencode(mail_unsub_token($email));
    $preheader = htmlspecialchars((string) $preheader, ENT_QUOTES, "UTF-8");
    return '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PREDICTOR</title></head>'
        . '<body style="margin:0;padding:0;background:#07040f;color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">'
        . '<div style="display:none;max-height:0;overflow:hidden;">' . $preheader . "</div>"
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07040f;padding:24px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0c0716;border:1px solid rgba(255,200,55,.35);border-radius:18px;overflow:hidden;">'
        . '<tr><td style="padding:22px 22px 8px;text-align:center;background:linear-gradient(180deg,#1a1028,#0c0716);">'
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
        . "<p style=\"margin:12px 0 8px;font-size:14px;line-height:1.4;white-space:nowrap;word-break:normal;\">Connectez-vous pour débloquer vos signaux.</p>"
        . mail_platform_links();
    return mail_wrap($hello, $inner, $email);
}

function mail_html_abandon($email, $uniqueId, $name = "") {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $display = mail_display_name($name);
    $hello = $display !== ""
        ? "Bonjour " . htmlspecialchars($display, ENT_QUOTES, "UTF-8") . ","
        : "Bonjour,";
    $inner = "<p>" . $hello . " vous avez commencé à débloquer PREDICTOR, mais le paiement n’est pas allé au bout.</p>"
        . "<p>Pour <strong style=\"color:#ffc837;\">17 $ par mois</strong>, vous ouvrez Crash, Aviator, Lucky Jet, Mines, Penalty, Apple of Fortune, et le module sport <strong>LE BOSS</strong>.</p>"
        . "<p>Les 6 algorithmes live et le module sport <strong>LE BOSS</strong> tournent déjà avec des signaux validés en continu.</p>"
        . ($uniqueId !== "" ? "<p>ID : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . mail_platform_links();
    return mail_wrap("Votre accès VIP à 17 $ n’est pas encore débloqué.", $inner, $email);
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
        . "<p>Débloquez vos signaux VIP pour <strong>17 $ PAR MOIS</strong>.</p>"
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
    $unsub = RESEND_SITE . "/index.php?action=mail_unsub&t=" . rawurlencode(mail_unsub_token($to));
    $payload = [
        "from" => RESEND_FROM,
        "to" => [$to],
        "reply_to" => [RESEND_REPLY_TO],
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
        return ["ok" => $ok, "id" => $id, "http" => $status, "error" => $errorMessage];
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
    if (is_array($record) && !empty($record["welcomeSent"])) {
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
    if (is_array($record) && (int) ($record["lastAbandonEmailAt"] ?? 0) > time() - 172800) {
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
        "🔥 Débloquez vos signaux VIP — L'offre à 17 $ expire bientôt !",
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

function mail_process_abandoned($limit = 8) {
    $limit = max(1, min(15, (int) $limit));
    $carts = maketou_read_carts();
    $sent = 0;
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
        if ($due <= 0 || $due > $now) {
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
        if ($email === "" || mail_opted_out($email) || mail_email_is_active($email)) {
            $row["abandonEmailed"] = true;
            $carts[$ref] = $row;
            continue;
        }
        $member = maketou_read_local_member($email);
        $name = is_array($member) ? (string) ($member["name"] ?? "") : "";
        $result = mail_send(
            $email,
            "🔥 Débloquez vos signaux VIP — L'offre à 17 $ expire bientôt !",
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
    return ["ok" => true, "sent" => $sent];
}

function mail_broadcast_inactive($limit = 8, $offset = 0) {
    $limit = max(1, min(10, (int) $limit));
    $offset = max(0, (int) $offset);
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
        if (mail_record_is_active($record)) {
            continue;
        }
        $targets[] = [$email, (string) ($record["uniqueId"] ?? ""), (string) ($record["name"] ?? "")];
    }
    $slice = array_slice($targets, 0, $limit);
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
    $remaining = max(0, count($targets) - count($slice));
    return [
        "ok" => true,
        "sent" => $sent,
        "scanned" => count($slice),
        "total" => count($targets),
        "hasMore" => $remaining > 0,
        "nextOffset" => 0
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
