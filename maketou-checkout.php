<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed"]);
    exit;
}

$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = [];
}

$email = trim((string) ($body["email"] ?? ""));
$firstName = trim((string) ($body["firstName"] ?? ""));
$lastName = trim((string) ($body["lastName"] ?? ""));
$phone = trim((string) ($body["phone"] ?? ""));
$uniqueId = trim((string) ($body["uniqueId"] ?? ""));

if ($email === "" || $firstName === "" || $lastName === "") {
    http_response_code(400);
    echo json_encode(["error" => "missing_fields"]);
    exit;
}

$https = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off")
    || ((string) ($_SERVER["HTTP_X_FORWARDED_PROTO"] ?? "")) === "https";
$host = (string) ($_SERVER["HTTP_HOST"] ?? "");
$redirectURL = trim((string) ($body["redirectURL"] ?? ""));
if ($redirectURL === "" || !preg_match("/^https?:\\/\\//i", $redirectURL)) {
    $redirectURL = ($https ? "https" : "http") . "://" . $host . "/?maketou=success";
}

$payload = [
    "productDocumentId" => MAKETOU_PRODUCT_ID,
    "email" => $email,
    "firstName" => $firstName,
    "lastName" => $lastName,
    "redirectURL" => $redirectURL,
    "meta" => [
        "userId" => $uniqueId,
        "source" => "website"
    ]
];
$phoneDigits = preg_replace("/\D+/", "", $phone);
if ($phone !== "" && preg_match("/^\+?[0-9]{8,15}$/", $phone) && strlen($phoneDigits) >= 8) {
    $payload["phone"] = $phone;
}

$raw = maketou_http_post(MAKETOU_API_BASE . "/api/v1/stores/cart/checkout", $payload);
if ($raw === null) {
    http_response_code(502);
    echo json_encode(["error" => "network_error"]);
    exit;
}

[$status, $responseBody] = $raw;
$data = json_decode($responseBody, true);
if (!is_array($data)) {
    $data = [];
}

$nested = is_array($data["data"] ?? null) ? $data["data"] : [];
$cart = is_array($data["cart"] ?? null) ? $data["cart"] : (is_array($nested["cart"] ?? null) ? $nested["cart"] : []);
$redirectUrl = (string) (
    $data["redirectUrl"]
    ?? $data["redirect_url"]
    ?? $data["checkoutUrl"]
    ?? $data["checkout_url"]
    ?? $nested["redirectUrl"]
    ?? $nested["redirect_url"]
    ?? ""
);
$cartId = (string) ($cart["id"] ?? $data["id"] ?? $nested["id"] ?? "");

if ($status >= 200 && $status < 300 && $redirectUrl !== "") {
    echo json_encode([
        "redirectUrl" => $redirectUrl,
        "cartId" => $cartId
    ]);
    exit;
}

http_response_code($status >= 400 ? $status : 502);
echo json_encode(["error" => "checkout_failed"]);
exit;

function maketou_http_post($url, $payload) {
    $json = json_encode($payload);
    $headers = [
        "Authorization: Bearer " . MAKETOU_API_KEY,
        "Content-Type: application/json",
        "Accept: application/json"
    ];

    if (function_exists("curl_init")) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $json,
            CURLOPT_TIMEOUT => 25,
            CURLOPT_FOLLOWLOCATION => true
        ];
        curl_setopt_array($ch, $options);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($body === false) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            $body = curl_exec($ch);
            $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        }
        $ok = $body !== false;
        curl_close($ch);
        return $ok ? [$status, $body] : null;
    }

    $context = stream_context_create([
        "http" => [
            "method" => "POST",
            "header" => implode("\r\n", $headers),
            "content" => $json,
            "timeout" => 25,
            "ignore_errors" => true
        ]
    ]);
    $body = @file_get_contents($url, false, $context);
    if ($body === false) {
        return null;
    }
    $status = 0;
    if (isset($http_response_header[0]) && preg_match("/\s(\d{3})\s/", $http_response_header[0], $match)) {
        $status = (int) $match[1];
    }
    return [$status, $body];
}
