<?php
error_reporting(0);
ini_set("display_errors", "0");

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

$dataDir = __DIR__ . DIRECTORY_SEPARATOR . "data";
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
$storeFile = $dataDir . DIRECTORY_SEPARATOR . "members.json";

function members_normalize_email($email) {
    return strtolower(trim((string) $email));
}

function members_read_store($file) {
    if (!is_file($file)) {
        return [];
    }
    $raw = @file_get_contents($file);
    $data = json_decode((string) $raw, true);
    return is_array($data) ? $data : [];
}

function members_write_store($file, $members) {
    if (!is_array($members)) {
        return false;
    }
    $tmp = $file . ".tmp";
    $json = json_encode($members, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $ok = @file_put_contents($tmp, $json, LOCK_EX);
    if ($ok === false) {
        return false;
    }
    return @rename($tmp, $file);
}

function members_parse_ts($value) {
    $value = trim((string) $value);
    if ($value === "") {
        return 0;
    }
    $ts = strtotime($value);
    return $ts ? (int) $ts : 0;
}

function members_later_iso($left, $right) {
    $leftTs = members_parse_ts($left);
    $rightTs = members_parse_ts($right);
    if ($rightTs > $leftTs) {
        return trim((string) $right);
    }
    return trim((string) $left);
}

function members_is_active($record) {
    if (!is_array($record)) {
        return false;
    }
    $expiresTs = members_parse_ts($record["subscriptionExpiresAt"] ?? ($record["vipUntil"] ?? ""));
    if ($expiresTs > 0) {
        return $expiresTs > time();
    }
    return !empty($record["isSubscribed"]);
}

function members_public_record($record) {
    if (!is_array($record)) {
        return null;
    }
    $expiresAt = (string) ($record["subscriptionExpiresAt"] ?? ($record["vipUntil"] ?? ""));
    $active = members_is_active($record);
    return [
        "email" => members_normalize_email($record["email"] ?? ""),
        "uniqueId" => (string) ($record["uniqueId"] ?? ""),
        "name" => (string) ($record["name"] ?? "Client"),
        "phone" => (string) ($record["phone"] ?? ""),
        "passwordHash" => (string) ($record["passwordHash"] ?? ""),
        "isSubscribed" => $active,
        "registeredAt" => (string) ($record["registeredAt"] ?? ""),
        "paymentDate" => (string) ($record["paymentDate"] ?? ""),
        "subscriptionExpiresAt" => $expiresAt,
        "vipUntil" => $expiresAt,
        "lastPaymentRef" => (string) ($record["lastPaymentRef"] ?? ""),
        "referredBy" => (string) ($record["referredBy"] ?? ""),
        "paidReferralCount" => (int) ($record["paidReferralCount"] ?? 0)
    ];
}

$method = strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? "GET"));
$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = is_array($_POST) ? $_POST : [];
}

$action = strtolower(trim((string) ($body["action"] ?? "")));
$email = members_normalize_email($_GET["email"] ?? ($body["email"] ?? ""));
$members = members_read_store($storeFile);

if ($method === "POST" && ($action === "save" || $action === "" || $action === "member_account")) {
    if ($email === "" || strpos($email, "@") === false) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "invalid_email"]);
        exit;
    }
    $existing = is_array($members[$email] ?? null) ? $members[$email] : [];
    $existingExpires = (string) ($existing["subscriptionExpiresAt"] ?? ($existing["vipUntil"] ?? ""));
    $incomingExpires = (string) ($body["subscriptionExpiresAt"] ?? ($body["vipUntil"] ?? ""));
    $existingRef = trim((string) ($existing["lastPaymentRef"] ?? ""));
    $incomingRef = trim((string) ($body["lastPaymentRef"] ?? ""));
    $expiresAt = $existingExpires;
    $paymentDate = (string) ($existing["paymentDate"] ?? "");
    $lastPaymentRef = $existingRef;

    if ($existingExpires === "" && $incomingExpires !== "") {
        $expiresAt = $incomingExpires;
        $paymentDate = (string) ($body["paymentDate"] ?? $paymentDate);
        if ($incomingRef !== "") {
            $lastPaymentRef = $incomingRef;
        }
    } elseif ($incomingRef !== "" && $incomingRef !== $existingRef) {
        $expiresAt = members_later_iso($existingExpires, $incomingExpires);
        if ($expiresAt === $incomingExpires && $incomingExpires !== "") {
            $paymentDate = (string) ($body["paymentDate"] ?? date("c"));
            $lastPaymentRef = $incomingRef;
        }
    }

    $expiresTs = members_parse_ts($expiresAt);
    if ($expiresTs > 0) {
        $isSubscribed = $expiresTs > time();
    } else {
        $isSubscribed = !empty($body["isSubscribed"]) || !empty($existing["isSubscribed"]);
    }

    $incoming = [
        "email" => $email,
        "uniqueId" => (string) ($body["uniqueId"] ?? ($existing["uniqueId"] ?? "")),
        "name" => (string) ($body["name"] ?? ($existing["name"] ?? "Client")),
        "phone" => (string) ($body["phone"] ?? ($existing["phone"] ?? "")),
        "passwordHash" => (string) ($body["passwordHash"] ?? ($existing["passwordHash"] ?? "")),
        "isSubscribed" => $isSubscribed,
        "registeredAt" => (string) ($body["registeredAt"] ?? ($existing["registeredAt"] ?? date("Y-m-d"))),
        "paymentDate" => $paymentDate,
        "subscriptionExpiresAt" => $expiresAt,
        "vipUntil" => $expiresAt,
        "lastPaymentRef" => $lastPaymentRef,
        "referredBy" => (string) (($existing["referredBy"] ?? "") !== "" ? $existing["referredBy"] : ($body["referredBy"] ?? "")),
        "paidReferralCount" => (int) ($existing["paidReferralCount"] ?? 0),
        "creditedFilleuls" => is_array($existing["creditedFilleuls"] ?? null) ? $existing["creditedFilleuls"] : []
    ];
    if (!empty($existing["uniqueId"]) && $incoming["uniqueId"] === "") {
        $incoming["uniqueId"] = $existing["uniqueId"];
    }
    if (!empty($existing["passwordHash"]) && $incoming["passwordHash"] === "") {
        $incoming["passwordHash"] = $existing["passwordHash"];
    }
    $members[$email] = $incoming;
    members_write_store($storeFile, $members);
    echo json_encode(["ok" => true, "account" => members_public_record($incoming)]);
    exit;
}

if ($email === "" || strpos($email, "@") === false) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "invalid_email"]);
    exit;
}

$found = is_array($members[$email] ?? null) ? $members[$email] : null;
if (!$found) {
    echo json_encode(["ok" => true, "account" => null]);
    exit;
}

echo json_encode(["ok" => true, "account" => members_public_record($found)]);
