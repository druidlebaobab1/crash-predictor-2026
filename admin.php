<?php
error_reporting(0);
ini_set("display_errors", "0");
header("X-Robots-Tag: noindex, nofollow");

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name("CRASH_ADMIN_SESS");
    session_set_cookie_params([
        "lifetime" => 0,
        "path" => "/",
        "secure" => (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off"),
        "httponly" => true,
        "samesite" => "Lax"
    ]);
    session_start();
}

require_once __DIR__ . "/maketou-config.php";

define("ADMIN_EMAIL", "admin@crashpredictor.fr");
define("ADMIN_PASS_HASH", "dd9a7689108da4a070ff915e29a18311f6b6bc99315de9a7a65bec40653d70c9");
define("ADMIN_PASS_PEPPER", "crashpredictor-admin-2026|");

function admin_wants_json() {
    $accept = strtolower((string) ($_SERVER["HTTP_ACCEPT"] ?? ""));
    $x = strtolower((string) ($_SERVER["HTTP_X_REQUESTED_WITH"] ?? ""));
    $action = strtolower(trim((string) ($_POST["action"] ?? "")));
    $raw = json_decode((string) file_get_contents("php://input"), true);
    if (is_array($raw) && !empty($raw["action"])) {
        $action = strtolower(trim((string) $raw["action"]));
    }
    return strpos($accept, "application/json") !== false
        || $x === "xmlhttprequest"
        || in_array($action, [
            "login", "logout", "stats", "members", "toggle", "broadcast", "signal_broadcast", "resend_key",
            "sport_get", "sport_save", "abandon", "traffic_hit", "traffic_stats"
        ], true);
}

function admin_body() {
    $raw = json_decode((string) file_get_contents("php://input"), true);
    if (is_array($raw)) {
        return $raw;
    }
    return is_array($_POST) ? $_POST : [];
}

function admin_json($payload, $code = 200) {
    http_response_code($code);
    header("Content-Type: application/json; charset=utf-8");
    header("Cache-Control: no-store");
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function admin_password_ok($plain) {
    $calc = hash("sha256", ADMIN_PASS_PEPPER . (string) $plain);
    return hash_equals(ADMIN_PASS_HASH, $calc);
}

function admin_lock_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "admin-lock.json";
}

function admin_login_allowed() {
    $file = admin_lock_file();
    $ip = (string) ($_SERVER["REMOTE_ADDR"] ?? "0");
    $now = time();
    $data = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    $row = is_array($data[$ip] ?? null) ? $data[$ip] : ["n" => 0, "t" => 0];
    if ($now - (int) $row["t"] > 900) {
        $row = ["n" => 0, "t" => $now];
    }
    if ((int) $row["n"] >= 8) {
        return false;
    }
    return true;
}

function admin_login_fail() {
    $file = admin_lock_file();
    $ip = (string) ($_SERVER["REMOTE_ADDR"] ?? "0");
    $now = time();
    $data = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    $row = is_array($data[$ip] ?? null) ? $data[$ip] : ["n" => 0, "t" => $now];
    if ($now - (int) $row["t"] > 900) {
        $row = ["n" => 0, "t" => $now];
    }
    $row["n"] = (int) $row["n"] + 1;
    $row["t"] = $now;
    $data[$ip] = $row;
    @file_put_contents($file, json_encode($data), LOCK_EX);
}

function admin_logged_in() {
    return !empty($_SESSION["crash_admin_ok"]);
}

function admin_redact($text) {
    $text = (string) $text;
    $text = preg_replace("/[A-Z0-9._%+\\-]+@[A-Z0-9.\\-]+\\.[A-Z]{2,}/i", "[email]", $text);
    $text = preg_replace("/msk_[A-Za-z0-9]+/", "[key]", $text);
    $text = preg_replace("/sb_[A-Za-z0-9_\\-]+/", "[key]", $text);
    return $text;
}

function admin_members() {
    $file = maketou_members_file();
    if (!is_file($file)) {
        return [];
    }
    $data = json_decode((string) @file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

function admin_is_active($record) {
    if (!is_array($record)) {
        return false;
    }
    $expires = maketou_parse_ts($record["subscriptionExpiresAt"] ?? ($record["vipUntil"] ?? ""));
    if ($expires > 0) {
        return $expires > time();
    }
    return !empty($record["isSubscribed"]);
}

function admin_registered_today($record) {
    $raw = trim((string) ($record["registeredAt"] ?? ""));
    if ($raw === "") {
        return false;
    }
    $today = date("Y-m-d");
    $todayFr = date("d/m/Y");
    return strpos($raw, $today) !== false || strpos($raw, $todayFr) !== false;
}

function admin_collect_stats() {
    $members = admin_members();
    $carts = maketou_read_carts();
    $online = 0;
    $total = 0;
    $today = 0;
    $paid = 0;
    $cutoff = time() - 300;
    $subscribedEmails = [];
    foreach ($members as $email => $record) {
        if (!is_array($record)) {
            continue;
        }
        $total++;
        if (admin_is_active($record)) {
            $paid++;
            $subscribedEmails[strtolower((string) $email)] = true;
        }
        if (admin_registered_today($record)) {
            $today++;
        }
        if ((int) ($record["lastSeen"] ?? 0) >= $cutoff) {
            $online++;
        }
    }
    $inboxOk = 0;
    $inboxDead = 0;
    foreach ($members as $record) {
        if (!is_array($record)) {
            continue;
        }
        if (!empty($record["emailInboxOk"])) {
            $inboxOk++;
        }
        if (!empty($record["emailBounced"])) {
            $inboxDead++;
        }
    }
    $abandoned = 0;
    foreach ($carts as $row) {
        if (!is_array($row)) {
            continue;
        }
        $email = strtolower(trim((string) ($row["email"] ?? "")));
        if ($email === "" || empty($subscribedEmails[$email])) {
            $abandoned++;
        }
    }
    return [
        "online" => $online,
        "totalMembers" => $total,
        "newToday" => $today,
        "paidLicenses" => $paid,
        "abandonedCarts" => $abandoned,
        "inboxOk" => $inboxOk,
        "inboxDead" => $inboxDead
    ];
}

function admin_member_rows($query) {
    $query = strtolower(trim((string) $query));
    $rows = [];
    foreach (admin_members() as $email => $record) {
        if (!is_array($record)) {
            continue;
        }
        $id = maketou_normalize_member_id($record["uniqueId"] ?? "");
        $mail = strtolower(trim((string) ($record["email"] ?? $email)));
        $name = (string) ($record["name"] ?? "Client");
        if ($query !== "") {
            $hay = $id . " " . $mail . " " . strtolower($name);
            if (strpos($hay, $query) === false) {
                continue;
            }
        }
        $rows[] = [
            "email" => $mail,
            "uniqueId" => $id,
            "name" => $name,
            "active" => admin_is_active($record),
            "registeredAt" => (string) ($record["registeredAt"] ?? "")
        ];
    }
    usort($rows, function ($a, $b) {
        return strcmp($a["uniqueId"], $b["uniqueId"]);
    });
    return $rows;
}

function admin_logs() {
    $file = __DIR__ . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "maketou-events.log";
    if (!is_file($file)) {
        return [];
    }
    $lines = @file($file, FILE_IGNORE_NEW_LINES);
    if (!is_array($lines)) {
        return [];
    }
    $slice = array_slice($lines, -60);
    $out = [];
    foreach ($slice as $line) {
        $line = trim((string) $line);
        if ($line === "") {
            continue;
        }
        if (!preg_match("/error|fail|denied|webhook|activate|checkout|repair/i", $line)) {
            continue;
        }
        $out[] = admin_redact($line);
    }
    if ($out === []) {
        foreach (array_slice($lines, -25) as $line) {
            $line = trim((string) $line);
            if ($line !== "") {
                $out[] = admin_redact($line);
            }
        }
    }
    return array_reverse($out);
}

function admin_toggle($email, $uniqueId, $active) {
    $email = strtolower(trim((string) $email));
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($email === "" && $uniqueId !== "") {
        $email = maketou_find_member_email_by_unique_id($uniqueId);
    }
    if ($email === "" || strpos($email, "@") === false) {
        return false;
    }
    $expiresAt = $active
        ? maketou_iso_from_ts(time() + (MAKETOU_SUBSCRIPTION_DAYS * 86400))
        : maketou_iso_from_ts(time() - 60);
    $paymentDate = $active ? maketou_now_iso() : "";
    $ref = $active ? ("admin-" . time()) : "";
    maketou_apply_local_subscription($email, $ref, $expiresAt, $paymentDate, $uniqueId);
    if (!$active) {
        $record = maketou_read_local_member($email);
        if (is_array($record)) {
            $record["isSubscribed"] = false;
            $record["subscriptionExpiresAt"] = $expiresAt;
            $record["vipUntil"] = $expiresAt;
            maketou_write_local_member($email, $record);
        }
    }
    maketou_apply_supabase_subscription($email, $uniqueId, $ref, $expiresAt, $paymentDate !== "" ? $paymentDate : maketou_now_iso());
    if (!$active) {
        $targets = ["/rest/v1/users?email=eq." . rawurlencode($email)];
        if ($uniqueId !== "") {
            $targets[] = "/rest/v1/users?unique_id=eq." . rawurlencode($uniqueId);
        }
        foreach ($targets as $path) {
            maketou_supabase_http("PATCH", $path, [
                "is_subscribed" => false,
                "subscription_expires_at" => $expiresAt,
                "vip_until" => $expiresAt
            ]);
        }
    }
    maketou_log("admin_toggle", ["uniqueId" => $uniqueId, "active" => $active]);
    return true;
}

function admin_sport_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "sport-match.json";
}

function admin_sport_default() {
    return [
        "team1" => "DINAMO MINSK",
        "odd1" => "1.34",
        "team2" => "BARANOVICI",
        "odd2" => "8.57",
        "winner" => 2
    ];
}

function admin_sport_normalize($raw) {
    $base = admin_sport_default();
    if (!is_array($raw)) {
        return $base;
    }
    $team1 = strtoupper(trim((string) ($raw["team1"] ?? $base["team1"])));
    $team2 = strtoupper(trim((string) ($raw["team2"] ?? $base["team2"])));
    $team1 = preg_replace("/\s+/", " ", $team1);
    $team2 = preg_replace("/\s+/", " ", $team2);
    if ($team1 === "" || strlen($team1) > 42) {
        $team1 = $base["team1"];
    }
    if ($team2 === "" || strlen($team2) > 42) {
        $team2 = $base["team2"];
    }
    $odd1 = number_format((float) str_replace(",", ".", (string) ($raw["odd1"] ?? $base["odd1"])), 2, ".", "");
    $odd2 = number_format((float) str_replace(",", ".", (string) ($raw["odd2"] ?? $base["odd2"])), 2, ".", "");
    if ((float) $odd1 < 1.01 || (float) $odd1 > 99.99) {
        $odd1 = $base["odd1"];
    }
    if ((float) $odd2 < 1.01 || (float) $odd2 > 99.99) {
        $odd2 = $base["odd2"];
    }
    $winner = (int) ($raw["winner"] ?? $base["winner"]);
    if ($winner !== 1 && $winner !== 2) {
        $winner = 2;
    }
    return [
        "team1" => $team1,
        "odd1" => $odd1,
        "team2" => $team2,
        "odd2" => $odd2,
        "winner" => $winner
    ];
}

function admin_sport_read() {
    $file = admin_sport_file();
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        return admin_sport_normalize($decoded);
    }
    return admin_sport_default();
}

function admin_sport_write($match) {
    $match = admin_sport_normalize($match);
    $ok = @file_put_contents(admin_sport_file(), json_encode($match, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    return $ok !== false;
}

function admin_traffic_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "traffic.json";
}

function admin_traffic_read() {
    $file = admin_traffic_file();
    if (!is_file($file)) {
        return ["days" => [], "seen" => []];
    }
    $decoded = json_decode((string) @file_get_contents($file), true);
    if (!is_array($decoded)) {
        return ["days" => [], "seen" => []];
    }
    if (!isset($decoded["days"]) || !is_array($decoded["days"])) {
        $decoded["days"] = [];
    }
    if (!isset($decoded["seen"]) || !is_array($decoded["seen"])) {
        $decoded["seen"] = [];
    }
    return $decoded;
}

function admin_traffic_source($utmSource, $utmMedium, $referrer) {
    $blob = strtolower(trim((string) $utmSource . " " . $utmMedium . " " . $referrer));
    if (preg_match("/facebook|fbclid|instagram|ig_|meta|l\.facebook/", $blob)) {
        return "Facebook Ads";
    }
    if (preg_match("/google|gclid|youtube|googlesyndication/", $blob)) {
        return "Google";
    }
    if (preg_match("/tiktok|ttclid/", $blob)) {
        return "TikTok";
    }
    if (preg_match("/twitter|t\.co|x\.com/", $blob)) {
        return "X / Twitter";
    }
    $refHost = "";
    if ($referrer !== "") {
        $refHost = strtolower((string) (parse_url($referrer, PHP_URL_HOST) ?? ""));
    }
    if ($refHost === "" || preg_match("/crashpredictor\.fr$/", $refHost)) {
        return "Direct";
    }
    return "Autre";
}

function admin_traffic_hit($utmSource, $utmMedium, $referrer) {
    $ip = (string) ($_SERVER["REMOTE_ADDR"] ?? "0");
    $day = date("Y-m-d");
    $data = admin_traffic_read();
    $seenKey = $day . "|" . md5($ip);
    if (!empty($data["seen"][$seenKey])) {
        return ["ok" => true, "counted" => false];
    }
    $source = admin_traffic_source($utmSource, $utmMedium, $referrer);
    if (!isset($data["days"][$day]) || !is_array($data["days"][$day])) {
        $data["days"][$day] = ["visits" => 0, "sources" => []];
    }
    $data["days"][$day]["visits"] = (int) ($data["days"][$day]["visits"] ?? 0) + 1;
    if (!isset($data["days"][$day]["sources"]) || !is_array($data["days"][$day]["sources"])) {
        $data["days"][$day]["sources"] = [];
    }
    $data["days"][$day]["sources"][$source] = (int) ($data["days"][$day]["sources"][$source] ?? 0) + 1;
    $data["seen"][$seenKey] = time();
    foreach ($data["seen"] as $key => $ts) {
        if ((int) $ts < time() - 8 * 86400) {
            unset($data["seen"][$key]);
        }
    }
    if (count($data["days"]) > 60) {
        ksort($data["days"]);
        $data["days"] = array_slice($data["days"], -45, null, true);
    }
    @file_put_contents(admin_traffic_file(), json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    return ["ok" => true, "counted" => true];
}

function admin_paid_by_day() {
    $out = [];
    foreach (admin_members() as $record) {
        if (!is_array($record) || !admin_is_active($record)) {
            continue;
        }
        $raw = trim((string) ($record["paymentDate"] ?? ($record["subscriptionExpiresAt"] ?? "")));
        $ts = maketou_parse_ts($raw);
        if ($ts <= 0) {
            continue;
        }
        $day = date("Y-m-d", $ts);
        $out[$day] = (int) ($out[$day] ?? 0) + 1;
    }
    return $out;
}

function admin_traffic_stats() {
    $data = admin_traffic_read();
    $paid = admin_paid_by_day();
    $days = [];
    $end = time();
    for ($i = 13; $i >= 0; $i--) {
        $day = date("Y-m-d", $end - ($i * 86400));
        $row = is_array($data["days"][$day] ?? null) ? $data["days"][$day] : ["visits" => 0, "sources" => []];
        $visits = (int) ($row["visits"] ?? 0);
        $conv = (int) ($paid[$day] ?? 0);
        $days[] = [
            "day" => $day,
            "label" => date("d/m", $end - ($i * 86400)),
            "visits" => $visits,
            "paid" => $conv,
            "rate" => $visits > 0 ? round(($conv / $visits) * 100, 1) : 0
        ];
    }
    $sources = [];
    foreach ($data["days"] as $row) {
        if (!is_array($row) || !is_array($row["sources"] ?? null)) {
            continue;
        }
        foreach ($row["sources"] as $name => $n) {
            $sources[$name] = (int) ($sources[$name] ?? 0) + (int) $n;
        }
    }
    arsort($sources);
    $today = date("Y-m-d");
    $todayVisits = (int) (($data["days"][$today]["visits"] ?? 0));
    $todayPaid = (int) ($paid[$today] ?? 0);
    return [
        "days" => $days,
        "sources" => $sources,
        "todayVisits" => $todayVisits,
        "todayPaid" => $todayPaid,
        "todayRate" => $todayVisits > 0 ? round(($todayPaid / $todayVisits) * 100, 1) : 0
    ];
}

function admin_abandon_totals() {
    $sent = 0;
    foreach (maketou_read_carts() as $row) {
        if (is_array($row) && (!empty($row["abandonEmailed"]) || !empty($row["abandonEmailId"]))) {
            $sent++;
        }
    }
    return $sent;
}

$body = admin_body();
$action = strtolower(trim((string) ($body["action"] ?? ($_GET["action"] ?? ""))));

if ($action === "login") {
    if (!admin_login_allowed()) {
        admin_json(["ok" => false, "error" => "locked"], 429);
    }
    $email = strtolower(trim((string) ($body["email"] ?? "")));
    $pass = (string) ($body["password"] ?? "");
    if ($email === ADMIN_EMAIL && admin_password_ok($pass)) {
        $_SESSION["crash_admin_ok"] = 1;
        session_regenerate_id(true);
        admin_json([
            "ok" => true,
            "desk" => true,
            "profile" => [
                "name" => "Alex_K",
                "uniqueId" => "CRASH-7482193",
                "displayEmail" => "alex.k@icloud.com"
            ]
        ]);
    }
    admin_login_fail();
    admin_json(["ok" => false, "error" => "invalid"], 401);
}

if ($action === "logout") {
    $_SESSION = [];
    session_destroy();
    admin_json(["ok" => true]);
}

if ($action === "sport_get") {
    admin_json(["ok" => true, "match" => admin_sport_read()]);
}

if ($action === "traffic_hit") {
    admin_json(admin_traffic_hit(
        (string) ($body["utm_source"] ?? ($_GET["utm_source"] ?? "")),
        (string) ($body["utm_medium"] ?? ($_GET["utm_medium"] ?? "")),
        (string) ($body["referrer"] ?? ($_SERVER["HTTP_REFERER"] ?? ""))
    ));
}

if (in_array($action, ["stats", "members", "toggle", "broadcast", "signal_broadcast", "resend_key", "sport_save", "abandon", "traffic_stats"], true) && !admin_logged_in()) {
    admin_json(["ok" => false, "error" => "unauthorized"], 401);
}

if ($action === "stats") {
    require_once __DIR__ . "/mail-resend.php";
    $stats = admin_collect_stats();
    $stats["resendConfigured"] = mail_is_configured();
    admin_json(["ok" => true, "stats" => $stats, "logs" => admin_logs()]);
}

if ($action === "members") {
    admin_json(["ok" => true, "members" => admin_member_rows($body["q"] ?? "")]);
}

if ($action === "toggle") {
    $ok = admin_toggle($body["email"] ?? "", $body["uniqueId"] ?? "", !empty($body["active"]));
    admin_json(["ok" => $ok]);
}

if ($action === "broadcast") {
    require_once __DIR__ . "/mail-resend.php";
    if (!mail_is_configured()) {
        admin_json(["ok" => false, "error" => "resend_missing"]);
    }
    $offset = (int) ($body["offset"] ?? 0);
    admin_json(mail_broadcast_inactive(3, $offset));
}

if ($action === "signal_broadcast") {
    require_once __DIR__ . "/mail-resend.php";
    if (!mail_is_configured()) {
        admin_json(["ok" => false, "error" => "resend_missing"]);
    }
    $offset = (int) ($body["offset"] ?? 0);
    admin_json(mail_broadcast_signal(3, $offset));
}

if ($action === "resend_key") {
    require_once __DIR__ . "/mail-resend.php";
    $ok = mail_save_api_key($body["apiKey"] ?? "");
    if ($ok) {
        mail_ensure_webhook();
    }
    admin_json(["ok" => $ok, "configured" => mail_is_configured()], $ok ? 200 : 400);
}

if ($action === "sport_save") {
    $ok = admin_sport_write($body);
    admin_json(["ok" => $ok, "match" => admin_sport_read()], $ok ? 200 : 400);
}

if ($action === "abandon") {
    require_once __DIR__ . "/mail-resend.php";
    if (!mail_is_configured()) {
        admin_json(["ok" => false, "error" => "resend_missing"]);
    }
    $result = mail_process_abandoned(12, true);
    $result["totalSent"] = admin_abandon_totals();
    admin_json($result);
}

if ($action === "traffic_stats") {
    admin_json(["ok" => true, "traffic" => admin_traffic_stats()]);
}

$logged = admin_logged_in();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title>Admin · Crash Predictor</title>
    <link rel="stylesheet" href="/style.css?v=u79">
    <style>
        .admin-page { min-height: 100vh; padding: 28px 16px 48px; background: #07040f; }
        .admin-shell { max-width: 1100px; margin: 0 auto; }
        .admin-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 22px; }
        .admin-top h1 { margin: 0; color: #ffc837; font-size: 1.35rem; letter-spacing: .08em; }
        .admin-card { background: rgba(12,7,22,.92); border: 1px solid rgba(255,200,55,.28); border-radius: 16px; padding: 18px; margin-bottom: 16px; box-shadow: 0 0 18px rgba(255,200,55,.08); }
        .admin-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
        .admin-stat { background: #0c0716; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 14px; }
        .admin-stat span { display: block; color: #9ca3af; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; }
        .admin-stat strong { display: block; margin-top: 6px; color: #fff; font-size: 1.45rem; }
        .admin-search { width: 100%; margin-bottom: 12px; }
        .admin-table-wrap { overflow: auto; max-height: 420px; }
        .admin-logs { max-height: 240px; overflow: auto; font-size: .72rem; color: #cbd5e1; white-space: pre-wrap; background: #090512; border-radius: 10px; padding: 12px; }
        .admin-login { max-width: 420px; margin: 8vh auto 0; }
        .badge-on { color: #22c55e; font-weight: 800; }
        .badge-off { color: #f87171; font-weight: 800; }
        .btn-mini { font-size: .72rem; padding: 6px 10px; border-radius: 8px; border: 0; cursor: pointer; font-weight: 800; }
        .btn-on { background: linear-gradient(135deg,#22c55e,#facc15); color: #052e16; }
        .btn-off { background: #3f1d2e; color: #fecaca; }
    </style>
</head>
<body class="admin-page">
    <div class="admin-shell">
        <?php if (!$logged): ?>
        <div class="admin-card admin-login">
            <h1>ACCÈS ADMINISTRATEUR</h1>
            <p style="color:#9ca3af;">Interface privée Crash Predictor</p>
            <form id="adminLoginForm" class="modal-form">
                <div class="form-group">
                    <label for="adminEmail">Email</label>
                    <input type="email" id="adminEmail" class="form-control-dark" required autocomplete="username">
                </div>
                <div class="form-group">
                    <label for="adminPassword">Mot de passe</label>
                    <input type="password" id="adminPassword" class="form-control-dark" required autocomplete="current-password">
                </div>
                <button type="submit" class="btn-primary btn-block">Connexion</button>
                <p id="adminLoginError" style="color:#f87171;display:none;margin-top:10px;">Identifiants incorrects.</p>
            </form>
        </div>
        <?php else: ?>
        <div class="admin-top">
            <h1>DASHBOARD ADMIN</h1>
            <button type="button" class="btn-primary" id="adminLogout">Déconnexion</button>
        </div>
        <div class="admin-stats" id="adminStats"></div>
        <div class="admin-card">
            <h2 style="color:#ffc837;font-size:1rem;">Emails Resend</h2>
            <p id="adminResendState" style="color:#9ca3af;margin:8px 0 12px;">Vérification de la clé d’envoi…</p>
            <div class="form-group" style="max-width:520px;">
                <label for="adminResendKey">Clé API Resend</label>
                <input type="password" id="adminResendKey" class="form-control-dark" autocomplete="off" placeholder="re_…">
            </div>
            <button type="button" class="btn-primary" id="adminResendSave" style="margin-top:10px;">Enregistrer la clé</button>
            <hr style="border:0;border-top:1px solid rgba(255,200,55,.2);margin:18px 0;">
            <h2 style="color:#ffc837;font-size:1rem;">Campagne de réactivation</h2>
            <p style="color:#9ca3af;margin:8px 0 14px;">Envoie un email unique aux membres <strong style="color:#fecaca;">NON ACTIVÉ</strong> dont Resend a déjà confirmé la boîte. Les fausses adresses sont ignorées.</p>
            <button type="button" class="btn-primary" id="adminBroadcastBtn">Envoyer la campagne de réactivation</button>
            <p id="adminBroadcastStatus" style="color:#cbd5e1;margin-top:10px;"></p>
            <hr style="border:0;border-top:1px solid rgba(255,200,55,.2);margin:18px 0;">
            <h2 style="color:#ffc837;font-size:1rem;">Signal du jour</h2>
            <p style="color:#9ca3af;margin:8px 0 10px;">Email dynamique depuis le match validé. Destinataires : <strong style="color:#fecaca;">NON ACTIVÉ</strong> + boîte réellement confirmée par Resend.</p>
            <p id="adminSignalMatchPreview" style="color:#cbd5e1;margin:0 0 12px;">Match actuel : —</p>
            <button type="button" class="btn-primary" id="adminSignalBroadcastBtn">🚀 DIFFUSER LE SIGNAL DU JOUR AUX NON ACTIVÉS</button>
            <p id="adminSignalBroadcastStatus" style="color:#cbd5e1;margin-top:10px;"></p>
        </div>
        <div class="admin-card">
            <h2 style="color:#ffc837;font-size:1rem;">Licences / Membres</h2>
            <input type="search" id="adminSearch" class="form-control-dark admin-search" placeholder="Rechercher par ID (CRASH-XXXXXXX) ou email">
            <div class="admin-table-wrap">
                <table class="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Nom</th><th>Email</th><th>Statut</th><th>Action</th></tr>
                    </thead>
                    <tbody id="adminMembersBody"></tbody>
                </table>
            </div>
        </div>
        <div class="admin-card">
            <h2 style="color:#ffc837;font-size:1rem;">Journal / Webhooks</h2>
            <div class="admin-logs" id="adminLogs">Chargement…</div>
        </div>
        <?php endif; ?>
    </div>
    <script>
    const api = async (payload) => {
        const res = await fetch(window.location.pathname + window.location.search, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json", "X-Requested-With": "XMLHttpRequest" },
            body: JSON.stringify(payload)
        });
        try {
            return await res.json();
        } catch (e) {
            return null;
        }
    };
    const broadcastFailText = (data) => {
        if (!data) return "Le serveur a coupé. Attends 10 secondes et réessaie. Ne change pas la clé API.";
        if (data.error === "resend_missing") return "Clé Resend manquante. Colle-la une seule fois, puis réessaie.";
        if (data.error === "unauthorized") return "Session expirée. Reconnecte-toi.";
        return "Envoi interrompu. Réessaie dans 10 secondes. Ne change pas la clé API.";
    };
    const loginForm = document.getElementById("adminLoginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const err = document.getElementById("adminLoginError");
            const data = await api({
                action: "login",
                email: document.getElementById("adminEmail").value.trim(),
                password: document.getElementById("adminPassword").value
            });
            if (data && data.ok) location.reload();
            else if (err) err.style.display = "block";
        });
    }
    const logoutBtn = document.getElementById("adminLogout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await api({ action: "logout" });
            location.reload();
        });
    }
    const escapeHtml = (v) => String(v || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const renderMembers = (rows) => {
        const tbody = document.getElementById("adminMembersBody");
        if (!tbody) return;
        if (!rows.length) {
            tbody.innerHTML = '<tr><td colspan="5" style="color:#9ca3af;text-align:center;padding:14px;">Aucun membre.</td></tr>';
            return;
        }
        tbody.innerHTML = rows.map((u) => `
            <tr>
                <td><strong class="gold-code">${escapeHtml(u.uniqueId || "-")}</strong></td>
                <td>${escapeHtml(u.name)}</td>
                <td>${escapeHtml(u.email)}</td>
                <td>${u.active ? '<span class="badge-on">ACTIF</span>' : '<span class="badge-off">NON ACTIVÉ</span>'}</td>
                <td>
                    ${u.active
                        ? `<button type="button" class="btn-mini btn-off" data-email="${escapeHtml(u.email)}" data-id="${escapeHtml(u.uniqueId)}" data-active="0">Désactiver</button>`
                        : `<button type="button" class="btn-mini btn-on" data-email="${escapeHtml(u.email)}" data-id="${escapeHtml(u.uniqueId)}" data-active="1">Activer</button>`}
                </td>
            </tr>
        `).join("");
        tbody.querySelectorAll("button[data-email]").forEach((btn) => {
            btn.addEventListener("click", async () => {
                await api({
                    action: "toggle",
                    email: btn.getAttribute("data-email"),
                    uniqueId: btn.getAttribute("data-id"),
                    active: btn.getAttribute("data-active") === "1"
                });
                loadAll(document.getElementById("adminSearch").value);
            });
        });
    };
    const loadAll = async (q = "") => {
        const statsBox = document.getElementById("adminStats");
        if (!statsBox) return;
        const pack = await api({ action: "stats" });
        if (!pack || !pack.ok || !pack.stats) {
            if (!statsBox.dataset.ready) {
                statsBox.innerHTML = '<div class="admin-stat"><span>Dashboard</span><strong>Recharge la page (Ctrl+F5)</strong></div>';
            }
            return;
        }
        const s = pack.stats;
        statsBox.dataset.ready = "1";
        statsBox.innerHTML = `
            <div class="admin-stat"><span>Connectés live</span><strong>${s.online || 0}</strong></div>
            <div class="admin-stat"><span>Inscrits</span><strong>${s.totalMembers || 0}</strong></div>
            <div class="admin-stat"><span>Inscriptions du jour</span><strong>${s.newToday || 0}</strong></div>
            <div class="admin-stat"><span>Paiements / licences</span><strong>${s.paidLicenses || 0}</strong></div>
            <div class="admin-stat"><span>Paniers non finalisés</span><strong>${s.abandonedCarts || 0}</strong></div>
        `;
        const resendState = document.getElementById("adminResendState");
        if (resendState) {
            resendState.textContent = s.resendConfigured
                ? "Clé Resend enregistrée. Boîtes confirmées : " + (s.inboxOk || 0) + " · Adresses mortes : " + (s.inboxDead || 0) + ". Les campagnes partent uniquement vers les confirmées."
                : "Collez une seule fois la clé API Resend pour activer les emails (elle n’est pas stockée dans GitHub).";
            resendState.style.color = s.resendConfigured ? "#86efac" : "#fca5a5";
        }
        document.getElementById("adminLogs").textContent = ((pack && pack.logs) || []).join("\n") || "Aucun log récent.";
        const members = await api({ action: "members", q });
        renderMembers((members && members.members) || []);
        try {
            const sport = await api({ action: "sport_get" });
            const preview = document.getElementById("adminSignalMatchPreview");
            const match = sport && sport.match;
            if (preview && match) {
                const winner = Number(match.winner) === 1 ? 1 : 2;
                const teamWinner = winner === 1 ? match.team1 : match.team2;
                const teamOpponent = winner === 1 ? match.team2 : match.team1;
                const oddsWinner = winner === 1 ? match.odd1 : match.odd2;
                preview.textContent = "Match actuel : " + teamWinner + " bat " + teamOpponent + " — cote " + oddsWinner;
                window.__sportMatchCache = match;
            }
        } catch (e) {}
    };
    const search = document.getElementById("adminSearch");
    if (search) {
        let t = null;
        search.addEventListener("input", () => {
            clearTimeout(t);
            t = setTimeout(() => loadAll(search.value), 250);
        });
        loadAll();
        setInterval(() => loadAll(search.value), 20000);
    }
    const resendSave = document.getElementById("adminResendSave");
    if (resendSave) {
        resendSave.addEventListener("click", async () => {
            const input = document.getElementById("adminResendKey");
            const status = document.getElementById("adminResendState");
            const data = await api({ action: "resend_key", apiKey: (input && input.value) || "" });
            if (data && data.ok) {
                if (input) input.value = "";
                if (status) {
                    status.textContent = "Clé Resend enregistrée sur le serveur. Les emails transactionnels sont actifs.";
                    status.style.color = "#86efac";
                }
            } else if (status) {
                status.textContent = "Clé invalide. Elle doit commencer par re_";
                status.style.color = "#fca5a5";
            }
        });
    }
    const broadcastBtn = document.getElementById("adminBroadcastBtn");
    if (broadcastBtn) {
        broadcastBtn.addEventListener("click", async () => {
            if (!window.confirm("Envoyer l'email de réactivation à tous les membres NON ACTIVÉ ?")) return;
            const status = document.getElementById("adminBroadcastStatus");
            broadcastBtn.disabled = true;
            let offset = 0;
            let totalSent = 0;
            let total = 0;
            try {
                while (true) {
                    const data = await api({ action: "broadcast", offset });
                    if (!data || !data.ok) {
                        if (status) status.textContent = broadcastFailText(data);
                        break;
                    }
                    totalSent += Number(data.sent || 0);
                    if (!total) total = Number(data.total || 0);
                    if (status) status.textContent = "Envoyés : " + totalSent + " / " + total;
                    if (!data.hasMore) break;
                    offset = Number(data.nextOffset || 0);
                    await new Promise((resolve) => setTimeout(resolve, 400));
                }
            } finally {
                broadcastBtn.disabled = false;
            }
        });
    }
    const signalBtn = document.getElementById("adminSignalBroadcastBtn");
    if (signalBtn) {
        signalBtn.addEventListener("click", async () => {
            const match = window.__sportMatchCache || {};
            const winner = Number(match.winner) === 1 ? 1 : 2;
            const teamWinner = winner === 1 ? (match.team1 || "BARANOVICI") : (match.team2 || "BARANOVICI");
            const oddsWinner = winner === 1 ? (match.odd1 || "8.57") : (match.odd2 || "8.57");
            if (!window.confirm("Diffuser le signal " + teamWinner + " (cote " + oddsWinner + ") à tous les membres NON ACTIVÉ ?")) return;
            const status = document.getElementById("adminSignalBroadcastStatus");
            signalBtn.disabled = true;
            let offset = 0;
            let totalSent = 0;
            let total = 0;
            let label = teamWinner + " " + oddsWinner;
            try {
                for (let i = 0; i < 300; i++) {
                    const data = await api({ action: "signal_broadcast", offset });
                    if (!data || !data.ok) {
                        if (status) status.textContent = broadcastFailText(data);
                        break;
                    }
                    if (data.match) {
                        const preview = document.getElementById("adminSignalMatchPreview");
                        if (preview) {
                            preview.textContent = "Match actuel : " + data.match.teamWinner + " bat " + data.match.teamOpponent + " — cote " + data.match.oddsWinner;
                        }
                        label = (data.match.teamWinner || teamWinner) + " " + (data.match.oddsWinner || oddsWinner);
                    }
                    totalSent += Number(data.sent || 0);
                    total = Number(data.total || total);
                    const processed = Number(data.nextOffset || 0);
                    if (status) {
                        if (data.hasMore) {
                            status.textContent = "Envoi en cours : " + processed + " / " + total + "...";
                        } else if (total === 0) {
                            status.textContent = "Aucun destinataire : tous les non activés ont déjà reçu ce signal, ou personne n’est inactif.";
                        } else {
                            status.textContent = "Terminé : " + totalSent + " envoyé(s) sur " + total + " destinataires (" + label + ").";
                        }
                    }
                    if (!data.hasMore) break;
                    offset = Number(data.nextOffset || 0);
                    await new Promise((resolve) => setTimeout(resolve, 400));
                }
            } finally {
                signalBtn.disabled = false;
            }
        });
    }
    </script>
</body>
</html>
