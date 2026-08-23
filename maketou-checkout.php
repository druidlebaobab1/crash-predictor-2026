<?php
error_reporting(0);
ini_set("display_errors", "0");
require_once __DIR__ . "/maketou-config.php";

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

$method = strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? "GET"));
$body = json_decode((string) file_get_contents("php://input"), true);
if (!is_array($body)) {
    $body = is_array($_POST) ? $_POST : [];
}

$action = strtolower(trim((string) ($_GET["action"] ?? ($body["action"] ?? ""))));
if ($action === "maketou_verify") {
    $action = "verify";
}
if ($action === "maketou_session") {
    $action = "session";
}
if ($action === "maketou_checkout") {
    $action = "";
}

function maketou_request_email($body) {
    $email = strtolower(trim((string) (
        $_GET["email"]
        ?? ($body["email"] ?? "")
        ?? ""
    )));
    return $email;
}

function maketou_confirm_paid_ref($ref, $requestEmail) {
    [$paid, $cartStatus, $data, $code] = maketou_verify_ref_with_api($ref);
    if ($code === 502) {
        maketou_json_denied("network_error", 502);
    }
    if ($code === 400) {
        maketou_json_denied("invalid_ref", 400);
    }
    if ($paid) {
        $activated = maketou_activate_paid_account($ref, $requestEmail, $data);
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
    exit;
}

if ($action === "session") {
    $token = trim((string) ($_GET["token"] ?? $_GET["access_token"] ?? ($body["token"] ?? "")));
    $session = maketou_read_token($token);
    if (!is_array($session)) {
        maketou_json_denied("invalid_token", 401);
    }
    $email = strtolower(trim((string) ($session["e"] ?? "")));
    $state = $email !== "" ? maketou_read_subscription_state($email) : null;
    if (is_array($state) && empty($state["active"])) {
        maketou_json_denied("expired");
    }
    echo json_encode([
        "status" => "paid",
        "access" => true,
        "completed" => true,
        "cartId" => (string) ($session["r"] ?? ""),
        "expiresAt" => is_array($state) ? (string) ($state["expiresAt"] ?? "") : "",
        "paymentDate" => is_array($state) ? (string) ($state["paymentDate"] ?? "") : ""
    ]);
    exit;
}

$ref = maketou_extract_ref($_GET);
if ($ref === "") {
    $ref = maketou_extract_ref($body);
}
$requestEmail = maketou_request_email($body);

if ($action === "verify" || ($ref !== "" && $action !== "")) {
    maketou_confirm_paid_ref($ref, $requestEmail);
}

if ($ref !== "" && $method === "GET") {
    maketou_confirm_paid_ref($ref, $requestEmail);
}

$looksLikeCreate = $method === "POST"
    && trim((string) ($body["email"] ?? "")) !== ""
    && trim((string) ($body["firstName"] ?? "")) !== ""
    && trim((string) ($body["lastName"] ?? "")) !== ""
    && $action !== "verify";

if ($looksLikeCreate) {
    $email = trim((string) ($body["email"] ?? ""));
    $firstName = trim((string) ($body["firstName"] ?? ""));
    $lastName = trim((string) ($body["lastName"] ?? ""));
    $phone = trim((string) ($body["phone"] ?? ""));
    $uniqueId = trim((string) ($body["uniqueId"] ?? ""));

    $payload = [
        "productDocumentId" => MAKETOU_PRODUCT_ID,
        "firstName" => $firstName,
        "lastName" => $lastName,
        "redirectURL" => MAKETOU_SUCCESS_URL,
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
    $status = 0;
    $responseBody = "";
    $data = [];
    $redirectUrl = "";
    $newCartId = "";
    if (is_array($raw)) {
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
    }

    if (!($status >= 200 && $status < 300 && $redirectUrl !== "")) {
        $payload["email"] = maketou_anonymized_gmail($email);
        $raw = maketou_http("POST", MAKETOU_API_BASE . "/api/v1/stores/cart/checkout", $payload);
    }
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
        maketou_save_cart_map($newCartId, $email, $uniqueId);
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
    exit;
}

if ($ref !== "") {
    maketou_confirm_paid_ref($ref, $requestEmail);
}

maketou_json_denied("missing_ref", 400);
