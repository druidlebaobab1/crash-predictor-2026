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

function members_public_record($record) {
    if (!is_array($record)) {
        return null;
    }
    return [
        "email" => members_normalize_email($record["email"] ?? ""),
        "uniqueId" => (string) ($record["uniqueId"] ?? ""),
        "name" => (string) ($record["name"] ?? "Client"),
        "phone" => (string) ($record["phone"] ?? ""),
        "passwordHash" => (string) ($record["passwordHash"] ?? ""),
        "isSubscribed" => !empty($record["isSubscribed"]),
        "registeredAt" => (string) ($record["registeredAt"] ?? "")
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
    $incoming = [
        "email" => $email,
        "uniqueId" => (string) ($body["uniqueId"] ?? ($existing["uniqueId"] ?? "")),
        "name" => (string) ($body["name"] ?? ($existing["name"] ?? "Client")),
        "phone" => (string) ($body["phone"] ?? ($existing["phone"] ?? "")),
        "passwordHash" => (string) ($body["passwordHash"] ?? ($existing["passwordHash"] ?? "")),
        "isSubscribed" => !empty($body["isSubscribed"]) || !empty($existing["isSubscribed"]),
        "registeredAt" => (string) ($body["registeredAt"] ?? ($existing["registeredAt"] ?? date("Y-m-d")))
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
