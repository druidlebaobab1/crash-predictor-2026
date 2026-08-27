<?php
require_once __DIR__ . "/maketou-config.php";

if (!defined("RESEND_FROM")) {
    define("RESEND_FROM", "PREDICTOR <support@mail.crashpredictor.fr>");
    define("RESEND_REPLY_TO", "support@mail.crashpredictor.fr");
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
        CURLOPT_TIMEOUT => 20
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
    $record = maketou_read_local_member($email);
    return is_array($record) && !empty($record["emailOptOut"]);
}

function mail_mark_opt_out($email) {
    $email = strtolower(trim((string) $email));
    $record = maketou_read_local_member($email);
    if (!is_array($record)) {
        return false;
    }
    $record["emailOptOut"] = true;
    return maketou_write_local_member($email, $record);
}

function mail_cta($label, $url) {
    $label = htmlspecialchars((string) $label, ENT_QUOTES, "UTF-8");
    $url = htmlspecialchars((string) $url, ENT_QUOTES, "UTF-8");
    return '<a href="' . $url . '" style="display:inline-block;padding:14px 22px;border-radius:999px;background:linear-gradient(135deg,#ffe08a,#ffc837 45%,#f59e0b);color:#140a08;font-weight:900;text-decoration:none;letter-spacing:.04em;">' . $label . "</a>";
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
        . '<tr><td style="padding:8px 24px 28px;font-size:15px;line-height:1.55;color:#e5e7eb;">' . $innerHtml . "</td></tr>"
        . '<tr><td style="padding:0 24px 22px;font-size:12px;color:#9ca3af;text-align:center;">'
        . "PREDICTOR · crashpredictor.fr<br>"
        . '<a href="' . htmlspecialchars($unsub, ENT_QUOTES, "UTF-8") . '" style="color:#ffc837;">Se désabonner</a>'
        . "</td></tr></table></td></tr></table></body></html>";
}

function mail_html_welcome($email, $uniqueId) {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $safeEmail = htmlspecialchars((string) $email, ENT_QUOTES, "UTF-8");
    $inner = "<p>Bienvenue. Votre compte PREDICTOR est prêt.</p>"
        . "<p>Email confirmé : <strong style=\"color:#fff;\">" . $safeEmail . "</strong></p>"
        . "<p>Votre identifiant unique : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>"
        . "<p>Conservez cet ID. Il relie votre licence VIP à votre compte.</p>"
        . '<p style="text-align:center;margin:28px 0;">' . mail_cta("ACCÉDER À MON ESPACE", RESEND_SITE) . "</p>";
    return mail_wrap("Votre compte PREDICTOR est prêt.", $inner, $email);
}

function mail_html_abandon($email, $uniqueId) {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $inner = "<p>Vous avez commencé à débloquer PREDICTOR, mais le paiement n’est pas allé au bout.</p>"
        . "<p>Pour <strong style=\"color:#ffc837;\">17 $ par mois</strong>, vous ouvrez :</p>"
        . "<p>Crash, Aviator, Lucky Jet, Mines, Penalty, Apple of Fortune, et le module sport <strong>LE BOSS</strong>.</p>"
        . "<p>Dernier signal validé : <strong style=\"color:#facc15;\">KAUNO ZALGIRIS @ 9.58</strong>.</p>"
        . ($uniqueId !== "" ? "<p>Compte : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . '<p style="text-align:center;margin:28px 0;">' . mail_cta("FINALISER MON DÉBLOCAGE (17 $ PAR MOIS)", RESEND_SITE . "/?checkout=1") . "</p>"
        . "<p style=\"font-size:12px;color:#9ca3af;\">Un seul rappel pour cette session. Si vous avez déjà payé, ignorez ce message.</p>";
    return mail_wrap("Votre accès VIP à 17 $ n’est pas encore débloqué.", $inner, $email);
}

function mail_html_reactivate($email, $uniqueId) {
    $id = htmlspecialchars((string) $uniqueId, ENT_QUOTES, "UTF-8");
    $inner = "<p>Votre compte PREDICTOR est toujours là, mais la licence n’est pas activée.</p>"
        . ($uniqueId !== "" ? "<p>ID membre : <strong style=\"color:#ffc837;\">" . $id . "</strong></p>" : "")
        . "<p>Les 6 algorithmes live et le module sport <strong>LE BOSS</strong> tournent déjà. Dernier signal validé : <strong style=\"color:#facc15;\">KAUNO ZALGIRIS @ 9.58</strong>.</p>"
        . "<p>Débloquez vos signaux VIP pour <strong>17 $ PAR MOIS</strong>.</p>"
        . '<p style="text-align:center;margin:28px 0;">' . mail_cta("RÉACTIVER MA LICENCE VIP", RESEND_SITE) . "</p>";
    return mail_wrap("Reprenez vos signaux VIP sur PREDICTOR.", $inner, $email);
}

function mail_send($to, $subject, $html, $extra = []) {
    $to = strtolower(trim((string) $to));
    if ($to === "" || strpos($to, "@") === false || mail_opted_out($to) || !mail_is_configured()) {
        return ["ok" => false, "id" => ""];
    }
    $unsub = RESEND_SITE . "/index.php?action=mail_unsub&t=" . rawurlencode(mail_unsub_token($to));
    $payload = [
        "from" => RESEND_FROM,
        "to" => [$to],
        "reply_to" => RESEND_REPLY_TO,
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
    if (!empty($extra["idempotency"])) {
        // sent via header below
    }
    $urlPath = "/emails";
    $chHeaders = [
        "Authorization: Bearer " . mail_api_key(),
        "Content-Type: application/json",
        "Accept: application/json"
    ];
    if (!empty($extra["idempotency"])) {
        $chHeaders[] = "Idempotency-Key: " . substr((string) $extra["idempotency"], 0, 256);
    }
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $ch = curl_init("https://api.resend.com" . $urlPath);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $chHeaders,
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_TIMEOUT => 20
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $data = json_decode((string) $body, true);
    $id = is_array($data) ? (string) ($data["id"] ?? "") : "";
    $ok = $status >= 200 && $status < 300 && $id !== "";
    maketou_log("mail_send", [
        "ok" => $ok,
        "http" => $status,
        "hasId" => $id !== "",
        "scheduled" => !empty($extra["scheduled_at"])
    ]);
    return ["ok" => $ok, "id" => $id, "http" => $status];
}

function mail_cancel($emailId) {
    $emailId = trim((string) $emailId);
    if ($emailId === "") {
        return;
    }
    mail_http("DELETE", "/emails/" . rawurlencode($emailId));
}

function mail_send_welcome($email, $uniqueId) {
    $email = strtolower(trim((string) $email));
    $record = maketou_read_local_member($email);
    if (is_array($record) && !empty($record["welcomeSent"])) {
        return false;
    }
    $uniqueId = $uniqueId !== "" ? $uniqueId : (is_array($record) ? (string) ($record["uniqueId"] ?? "") : "");
    $sent = mail_send(
        $email,
        "🚀 Bienvenue sur PREDICTOR — Votre compte est prêt !",
        mail_html_welcome($email, $uniqueId),
        ["idempotency" => "welcome-" . md5($email)]
    );
    if ($sent["ok"] && is_array($record)) {
        $record["welcomeSent"] = true;
        maketou_write_local_member($email, $record);
    }
    return !empty($sent["ok"]);
}

function mail_email_abandon_recent($email) {
    $email = strtolower(trim((string) $email));
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
    $email = strtolower(trim((string) $email));
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
    $sent = mail_send(
        $email,
        "🔥 Débloquez vos signaux VIP — L'offre à 17 $ expire bientôt !",
        mail_html_abandon($email, $uniqueId),
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
    $email = strtolower(trim((string) $email));
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
            $emailDone = strtolower(trim((string) ($row["email"] ?? "")));
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
        $email = strtolower(trim((string) ($row["email"] ?? "")));
        $uniqueId = (string) ($row["uniqueId"] ?? "");
        if ($email === "" || mail_opted_out($email) || mail_email_is_active($email)) {
            $row["abandonEmailed"] = true;
            $carts[$ref] = $row;
            continue;
        }
        $result = mail_send(
            $email,
            "🔥 Débloquez vos signaux VIP — L'offre à 17 $ expire bientôt !",
            mail_html_abandon($email, $uniqueId),
            ["idempotency" => "abandon-due-" . md5((string) $ref)]
        );
        $row["abandonEmailed"] = true;
        if (!empty($result["ok"])) {
            $sent++;
            $member = maketou_read_local_member($email);
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
        $email = strtolower(trim((string) ($record["email"] ?? $email)));
        if ($email === "" || !empty($record["emailOptOut"]) || !empty($record["broadcastSent"])) {
            continue;
        }
        if (mail_record_is_active($record)) {
            continue;
        }
        $targets[] = [$email, (string) ($record["uniqueId"] ?? "")];
    }
    $slice = array_slice($targets, 0, $limit);
    $sent = 0;
    foreach ($slice as $item) {
        $email = $item[0];
        $uniqueId = $item[1];
        $result = mail_send(
            $email,
            "🔥 Vos prédictions sont prêtes — Reprenez vos signaux VIP sur PREDICTOR",
            mail_html_reactivate($email, $uniqueId),
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
        usleep(180000);
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
