<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

$method = (string) ($_SERVER["REQUEST_METHOD"] ?? "GET");
$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = is_array($_POST) ? $_POST : [];
}

$successUrl = "https://crashpredictor.fr/?payment=success&status=approved";

function maketou_http($method, $url, $payload = null) {
    $headers = [
        "Authorization: Bearer " . MAKETOU_API_KEY,
        "Content-Type: application/json",
        "Accept: application/json"
    ];
    $json = $payload === null ? null : json_encode($payload);

    if (function_exists("curl_init")) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 25,
            CURLOPT_FOLLOWLOCATION => true
        ];
        if ($json !== null) {
            $options[CURLOPT_POSTFIELDS] = $json;
        }
        curl_setopt_array($ch, $options);
        $responseBody = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($responseBody === false) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            $responseBody = curl_exec($ch);
            $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        }
        curl_close($ch);
        return $responseBody === false ? null : [$status, $responseBody];
    }

    $context = stream_context_create([
        "http" => [
            "method" => $method,
            "header" => implode("\r\n", $headers),
            "content" => $json === null ? "" : $json,
            "timeout" => 25,
            "ignore_errors" => true
        ]
    ]);
    $responseBody = @file_get_contents($url, false, $context);
    if ($responseBody === false) {
        return null;
    }
    $status = 0;
    if (isset($http_response_header[0]) && preg_match("/\s(\d{3})\s/", $http_response_header[0], $match)) {
        $status = (int) $match[1];
    }
    return [$status, $responseBody];
}

function maketou_paid_response($cartId = "") {
    echo json_encode([
        "status" => "paid",
        "access" => true,
        "completed" => true,
        "cartId" => $cartId
    ]);
    exit;
}

function maketou_cart_is_paid($status) {
    $status = strtolower((string) $status);
    return in_array($status, ["completed", "paid", "success", "successful", "approved"], true);
}

$cartId = trim((string) (
    $_GET["cartId"]
    ?? $_GET["token"]
    ?? ($body["cartId"] ?? "")
    ?? ($body["cart"]["id"] ?? "")
    ?? ($body["id"] ?? "")
    ?? ""
));
$incomingStatus = strtolower((string) (
    $body["status"]
    ?? ($body["data"]["status"] ?? "")
    ?? ($body["event"] ?? "")
    ?? ""
));

if ($cartId !== "" && preg_match("/^[A-Za-z0-9-]{8,80}$/", $cartId)) {
    $raw = maketou_http("GET", MAKETOU_API_BASE . "/api/v1/stores/cart/" . rawurlencode($cartId));
    if (is_array($raw)) {
        [$code, $responseBody] = $raw;
        $data = json_decode($responseBody, true);
        $cartStatus = is_array($data) ? (string) ($data["status"] ?? "") : "";
        if ($code >= 200 && $code < 300 && maketou_cart_is_paid($cartStatus)) {
            maketou_paid_response($cartId);
        }
        if ($code >= 200 && $code < 300) {
            echo json_encode([
                "status" => $cartStatus ?: "waiting_payment",
                "access" => false,
                "completed" => false,
                "cartId" => $cartId
            ]);
            exit;
        }
    }
}

if ($method === "POST" && maketou_cart_is_paid($incomingStatus)) {
    maketou_paid_response($cartId);
}

if ($method !== "POST") {
    http_response_code(400);
    echo json_encode(["error" => "missing_cart", "access" => false]);
    exit;
}

$email = trim((string) ($body["email"] ?? ""));
$firstName = trim((string) ($body["firstName"] ?? ""));
$lastName = trim((string) ($body["lastName"] ?? ""));
$phone = trim((string) ($body["phone"] ?? ""));
$uniqueId = trim((string) ($body["uniqueId"] ?? ""));

if ($email === "" || $firstName === "" || $lastName === "") {
    http_response_code(400);
    echo json_encode(["error" => "missing_fields", "access" => false]);
    exit;
}

$payload = [
    "productDocumentId" => MAKETOU_PRODUCT_ID,
    "email" => $email,
    "firstName" => $firstName,
    "lastName" => $lastName,
    "redirectURL" => $successUrl,
    "meta" => [
        "userId" => $uniqueId,
        "source" => "website"
    ]
];
$phoneDigits = preg_replace("/\D+/", "", $phone);
if ($phone !== "" && preg_match("/^\+?[0-9]{8,15}$/", $phone) && strlen($phoneDigits) >= 8) {
    $payload["phone"] = $phone;
}

$raw = maketou_http("POST", MAKETOU_API_BASE . "/api/v1/stores/cart/checkout", $payload);
if ($raw === null) {
    http_response_code(502);
    echo json_encode(["error" => "network_error", "access" => false]);
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
$newCartId = (string) ($cart["id"] ?? $data["id"] ?? $nested["id"] ?? "");

if ($status >= 200 && $status < 300 && $redirectUrl !== "") {
    echo json_encode([
        "redirectUrl" => $redirectUrl,
        "cartId" => $newCartId,
        "status" => "waiting_payment",
        "access" => false
    ]);
    exit;
}

http_response_code($status >= 400 ? $status : 502);
echo json_encode(["error" => "checkout_failed", "access" => false]);
