<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

$method = strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? ""));
if (!in_array($method, ["POST", "GET"], true)) {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed", "access" => false]);
    exit;
}

$rawInput = (string) file_get_contents("php://input");
$body = json_decode($rawInput, true);
if (!is_array($body)) {
    $body = is_array($_POST) ? $_POST : [];
}
$payload = array_merge(is_array($_GET) ? $_GET : [], $body);

$ref = maketou_extract_ref($payload);
$email = strtolower(trim((string) (
    $payload["email"]
    ?? maketou_extract_email($payload)
    ?? ""
)));

maketou_log("webhook_in", [
    "method" => $method,
    "ref" => $ref,
    "email" => $email,
    "status" => maketou_extract_status($payload),
    "event" => $payload["event"] ?? ($payload["type"] ?? "")
]);

if ($ref === "" && $email !== "") {
    $unlocked = maketou_try_unlock_by_email($email);
    if (is_array($unlocked)) {
        echo json_encode([
            "ok" => true,
            "status" => "paid",
            "access" => true,
            "cartId" => $unlocked["ref"],
            "email" => $unlocked["email"]
        ]);
        exit;
    }
}

if ($ref === "") {
    http_response_code(400);
    echo json_encode(["error" => "missing_ref", "access" => false]);
    exit;
}

[$apiPaid, $cartStatus, $data, $code] = maketou_verify_ref_with_api($ref);
$bodyPaid = maketou_payload_looks_paid($payload);
$mapped = maketou_lookup_cart_map($ref);
$paid = $apiPaid || ($bodyPaid && is_array($mapped));

maketou_log("webhook_verify", [
    "ref" => $ref,
    "apiPaid" => $apiPaid,
    "bodyPaid" => $bodyPaid,
    "mapped" => is_array($mapped),
    "status" => $cartStatus,
    "code" => $code
]);

if (!$paid) {
    echo json_encode([
        "ok" => false,
        "status" => $cartStatus !== "" ? $cartStatus : "unpaid",
        "access" => false
    ]);
    exit;
}

$merged = is_array($data) ? array_merge($payload, $data) : $payload;
$activated = maketou_activate_paid_account($ref, $email, $merged);
echo json_encode([
    "ok" => true,
    "status" => "paid",
    "access" => true,
    "cartId" => $ref,
    "email" => (string) ($activated["email"] ?? $email)
]);
