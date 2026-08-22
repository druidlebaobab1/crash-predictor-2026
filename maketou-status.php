<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

if (strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? "")) !== "GET") {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed", "access" => false]);
    exit;
}

$ref = maketou_extract_ref($_GET);
$email = strtolower(trim((string) ($_GET["email"] ?? "")));
if ($ref === "") {
    maketou_json_denied("missing_ref", 400);
}

[$paid, $cartStatus, $data, $code] = maketou_verify_ref_with_api($ref);
if ($code === 502) {
    maketou_json_denied("network_error", 502);
}
$cartEmail = maketou_extract_email($data);
if ($paid && $cartEmail !== "" && $email !== "" && !hash_equals($cartEmail, $email)) {
    maketou_json_denied("email_mismatch", 403);
}
if ($paid) {
    $useEmail = $email !== "" ? $email : $cartEmail;
    maketou_mark_supabase_paid($useEmail);
    maketou_json_paid($ref, $useEmail);
}

echo json_encode([
    "status" => $cartStatus !== "" ? $cartStatus : "unpaid",
    "access" => false,
    "completed" => false,
    "cartId" => $ref
]);
