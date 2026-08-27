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
$uniqueId = maketou_request_unique_id($_GET);
$unlocked = maketou_try_unlock_any($ref, $email, $uniqueId);
maketou_log("status_check", [
    "ref" => $ref,
    "email" => $email,
    "uniqueId" => $uniqueId,
    "unlocked" => is_array($unlocked)
]);
if (is_array($unlocked)) {
    maketou_json_paid(
        $unlocked["ref"],
        $unlocked["email"],
        $unlocked["expiresAt"],
        $unlocked["paymentDate"]
    );
}
if ($ref === "" && $email === "" && $uniqueId === "") {
    maketou_json_denied("missing_ref", 400);
}
echo json_encode([
    "status" => "unpaid",
    "access" => false,
    "completed" => false,
    "cartId" => $ref
]);
