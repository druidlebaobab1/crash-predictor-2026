<?php
error_reporting(0);
ini_set("display_errors", "0");

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed"]);
    exit;
}

$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = $_POST;
}
if (!is_array($body)) {
    $body = [];
}

$email = trim((string) (
    $body["email"]
    ?? ($body["customerInfo"]["email"] ?? "")
    ?? ($body["customer"]["email"] ?? "")
    ?? ($body["data"]["email"] ?? "")
    ?? ($body["data"]["customerInfo"]["email"] ?? "")
    ?? ""
));
$status = strtolower((string) (
    $body["status"]
    ?? ($body["data"]["status"] ?? "")
    ?? ($body["event"] ?? "")
    ?? ""
));
$email = strtolower($email);

$paid = in_array($status, ["completed", "success", "successful", "paid", "payment.completed", ""], true);
if ($email === "" || !$paid) {
    http_response_code(400);
    echo json_encode(["error" => "ignored"]);
    exit;
}

$supabaseUrl = "https://tnxyrvjrxxrsqnpviknz.supabase.co";
$supabaseKey = "sb_publishable_Hl6nmMnRAM1mfdDdudH2_w_kYIJAXdF";
$payload = json_encode(["is_subscribed" => true]);
$url = $supabaseUrl . "/rest/v1/users?email=eq." . rawurlencode($email);
$headers = [
    "apikey: " . $supabaseKey,
    "Authorization: Bearer " . $supabaseKey,
    "Content-Type: application/json",
    "Prefer: return=minimal"
];

if (function_exists("curl_init")) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => "PATCH",
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20
    ]);
    curl_exec($ch);
    curl_close($ch);
}

echo json_encode(["ok" => true]);
