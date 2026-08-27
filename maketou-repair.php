<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

if (strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? "")) !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "method_not_allowed"]);
    exit;
}

$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = is_array($_POST) ? $_POST : [];
}
$key = trim((string) ($body["key"] ?? ($_SERVER["HTTP_X_REPAIR_KEY"] ?? "")));
if ($key === "" || !hash_equals(MAKETOU_REPAIR_KEY, $key)) {
    http_response_code(401);
    echo json_encode(["ok" => false, "error" => "unauthorized"]);
    exit;
}

$report = maketou_repair_paid_unactivated();
maketou_log("repair_run", [
    "scannedCarts" => $report["scannedCarts"],
    "paidUnactivated" => $report["paidUnactivated"],
    "activated" => $report["activated"],
    "alreadyActive" => $report["alreadyActive"]
]);
echo json_encode([
    "ok" => true,
    "scannedCarts" => $report["scannedCarts"],
    "alreadyActive" => $report["alreadyActive"],
    "paidUnactivated" => $report["paidUnactivated"],
    "activated" => $report["activated"],
    "memberIds" => $report["memberIds"]
], JSON_UNESCAPED_SLASHES);
