<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

if (strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? "")) !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed", "access" => false]);
    exit;
}

$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = is_array($_POST) ? $_POST : [];
}

$ref = maketou_extract_ref($body);
$email = maketou_extract_email($body);
if ($ref === "") {
    http_response_code(400);
    echo json_encode(["error" => "missing_ref", "access" => false]);
    exit;
}

[$paid, $cartStatus, $data] = maketou_verify_ref_with_api($ref);
$cartEmail = maketou_extract_email($data);
$useEmail = $cartEmail !== "" ? $cartEmail : $email;

if (!$paid) {
    echo json_encode([
        "ok" => false,
        "status" => $cartStatus !== "" ? $cartStatus : "unpaid",
        "access" => false
    ]);
    exit;
}

maketou_mark_supabase_paid($useEmail);
echo json_encode([
    "ok" => true,
    "status" => "paid",
    "access" => true,
    "cartId" => $ref
]);
