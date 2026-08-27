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
    if ($email !== "") {
        $unlocked = maketou_try_unlock_by_email($email);
        if (is_array($unlocked)) {
            maketou_json_paid(
                $unlocked["ref"],
                $unlocked["email"],
                $unlocked["expiresAt"],
                $unlocked["paymentDate"]
            );
        }
        maketou_json_denied("unpaid");
    }
    maketou_json_denied("missing_ref", 400);
}

[$paid, $cartStatus, $data, $code] = maketou_verify_ref_with_api($ref);
maketou_log("status_check", [
    "ref" => $ref,
    "email" => $email,
    "paid" => $paid,
    "status" => $cartStatus,
    "code" => $code
]);
if ($code === 502) {
    maketou_json_denied("network_error", 502);
}
if ($paid) {
    $activated = maketou_activate_paid_account($ref, $email, $data);
    maketou_json_paid(
        $ref,
        (string) ($activated["email"] ?? ""),
        (string) ($activated["expiresAt"] ?? ""),
        (string) ($activated["paymentDate"] ?? "")
    );
}

echo json_encode([
    "status" => $cartStatus !== "" ? $cartStatus : "unpaid",
    "access" => false,
    "completed" => false,
    "cartId" => $ref
]);
