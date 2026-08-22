<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "GET") {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed"]);
    exit;
}

$cartId = trim((string) ($_GET["cartId"] ?? ""));
if ($cartId === "" || !preg_match("/^[A-Za-z0-9-]{8,80}$/", $cartId)) {
    http_response_code(400);
    echo json_encode(["error" => "missing_cart"]);
    exit;
}

$url = MAKETOU_API_BASE . "/api/v1/stores/cart/" . rawurlencode($cartId);
$headers = [
    "Authorization: Bearer " . MAKETOU_API_KEY,
    "Accept: application/json"
];

$body = false;
$status = 0;

if (function_exists("curl_init")) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 20
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        "http" => [
            "method" => "GET",
            "header" => implode("\r\n", $headers),
            "timeout" => 20,
            "ignore_errors" => true
        ]
    ]);
    $body = @file_get_contents($url, false, $context);
    if (isset($http_response_header[0]) && preg_match("/\s(\d{3})\s/", $http_response_header[0], $match)) {
        $status = (int) $match[1];
    }
}

if ($body === false) {
    http_response_code(502);
    echo json_encode(["error" => "network_error"]);
    exit;
}

$data = json_decode($body, true);
$cartStatus = is_array($data) ? (string) ($data["status"] ?? "") : "";

if ($status >= 200 && $status < 300) {
    echo json_encode([
        "status" => $cartStatus,
        "completed" => $cartStatus === "completed",
        "cartId" => $cartId
    ]);
    exit;
}

http_response_code($status >= 400 ? $status : 502);
echo json_encode(["error" => "status_failed"]);
