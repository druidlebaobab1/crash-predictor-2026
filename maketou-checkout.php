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

function maketou_clean_person_name($value) {
    $value = trim((string) $value);
    $value = preg_replace("/\s+(membre|member)\s*$/iu", "", $value);
    if (preg_match("/^(membre|member)$/iu", $value)) {
        return "";
    }
    return trim((string) $value);
}

function maketou_person_names($firstName, $lastName, $fullName = "") {
    $firstName = maketou_clean_person_name($firstName);
    $lastName = maketou_clean_person_name($lastName);
    if ($firstName === "") {
        $cleaned = maketou_clean_person_name($fullName);
        $parts = preg_split("/\s+/", $cleaned, -1, PREG_SPLIT_NO_EMPTY);
        if (!is_array($parts)) {
            $parts = [];
        }
        $firstName = $parts[0] ?? "";
        if ($lastName === "" && count($parts) > 1) {
            $lastName = implode(" ", array_slice($parts, 1));
        }
    }
    if ($firstName === "") {
        $firstName = "Client";
    }
    if ($lastName === "") {
        $lastName = $firstName;
    }
    return [$firstName, $lastName];
}

function maketou_checkout_phone($phone) {
    $compact = preg_replace("/\s+/", "", trim((string) $phone));
    $digits = preg_replace("/\D+/", "", (string) $compact);
    if (strlen((string) $digits) < 8 || strlen((string) $digits) > 15) {
        return "";
    }
    if (strpos((string) $compact, "00") === 0) {
        $compact = "+" . substr((string) $compact, 2);
    }
    if (preg_match("/^\+[0-9]{8,15}$/", (string) $compact)) {
        return $compact;
    }
    if (preg_match("/^[0-9]{8,15}$/", (string) $compact)) {
        return $compact;
    }
    return $digits;
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
    $uniqueId = maketou_request_unique_id($_GET);
    $unlocked = maketou_try_unlock_any($ref, $requestEmail, $uniqueId);
    maketou_log("verify_request", [
        "ref" => $ref,
        "email" => $requestEmail,
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
    echo json_encode([
        "status" => "unpaid",
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

if ($action === "verify" || ($ref !== "" && $action !== "") || ($action === "verify" && $requestEmail !== "")) {
    maketou_confirm_paid_ref($ref, $requestEmail);
}

if ($ref !== "" && $method === "GET") {
    maketou_confirm_paid_ref($ref, $requestEmail);
}

if ($method === "GET" && $requestEmail !== "" && $ref === "") {
    maketou_confirm_paid_ref("", $requestEmail);
}

$looksLikeCreate = $method === "POST"
    && trim((string) ($body["email"] ?? "")) !== ""
    && trim((string) ($body["firstName"] ?? "")) !== ""
    && $action !== "verify";

if ($looksLikeCreate) {
    $email = strtolower(trim((string) ($body["email"] ?? "")));
    [$firstName, $lastName] = maketou_person_names(
        $body["firstName"] ?? "",
        $body["lastName"] ?? "",
        $body["name"] ?? ""
    );
    $phone = maketou_checkout_phone($body["phone"] ?? "");
    $rawUniqueId = trim((string) ($body["uniqueId"] ?? ""));
    $uniqueId = maketou_normalize_member_id($rawUniqueId);
    $metaId = $uniqueId !== "" ? $uniqueId : $rawUniqueId;
    $redirectUrl = maketou_success_url_with_uid($metaId);

    $payload = [
        "productDocumentId" => MAKETOU_PRODUCT_ID,
        "email" => $email,
        "firstName" => $firstName,
        "lastName" => $lastName,
        "redirectURL" => $redirectUrl,
        "meta" => [
            "userId" => $metaId,
            "uniqueId" => $metaId,
            "customer_id" => $metaId,
            "source" => "website"
        ]
    ];
    if ($phone !== "") {
        $payload["phone"] = $phone;
    }

    $raw = maketou_http("POST", MAKETOU_API_BASE . "/api/v1/stores/cart/checkout", $payload);
    $status = 0;
    $responseBody = "";
    $data = [];
    $payUrl = "";
    $newCartId = "";
    if (is_array($raw)) {
        [$status, $responseBody] = $raw;
        $data = json_decode($responseBody, true);
        if (!is_array($data)) {
            $data = [];
        }
        $nested = is_array($data["data"] ?? null) ? $data["data"] : [];
        $cart = is_array($data["cart"] ?? null) ? $data["cart"] : (is_array($nested["cart"] ?? null) ? $nested["cart"] : []);
        $payUrl = (string) (
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

    if (!($status >= 200 && $status < 300 && $payUrl !== "")) {
        $raw = maketou_http("POST", MAKETOU_API_BASE . "/api/v1/stores/cart/checkout", $payload);
    }
    if (!is_array($raw) || (int) ($raw[0] ?? 0) < 200 || (int) ($raw[0] ?? 0) >= 300) {
        $fallback = $payload;
        $fallback["email"] = maketou_anonymized_gmail($email);
        $raw = maketou_http("POST", MAKETOU_API_BASE . "/api/v1/stores/cart/checkout", $fallback);
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
        maketou_save_cart_map($newCartId, $email, $uniqueId !== "" ? $uniqueId : $metaId);
        require_once __DIR__ . DIRECTORY_SEPARATOR . "mail-resend.php";
        if (function_exists("mail_on_checkout")) {
            mail_on_checkout($newCartId, $email, $uniqueId !== "" ? $uniqueId : $metaId);
        }
        maketou_log("checkout_create", [
            "email" => $email,
            "uniqueId" => $uniqueId !== "" ? $uniqueId : $metaId,
            "cartId" => $newCartId,
            "http" => $status,
            "directPay" => (strpos($redirectUrl, "moneroo") !== false || strpos($redirectUrl, "checkout.") !== false)
        ]);
        echo json_encode([
            "redirectUrl" => $redirectUrl,
            "cartId" => $newCartId,
            "status" => "waiting_payment",
            "access" => false
        ]);
        exit;
    }

    http_response_code($status >= 400 ? $status : 502);
    maketou_log("checkout_failed", [
        "email" => $email,
        "http" => $status
    ]);
    echo json_encode(["error" => "checkout_failed", "access" => false]);
    exit;
}

if ($ref !== "") {
    maketou_confirm_paid_ref($ref, $requestEmail);
}

maketou_json_denied("missing_ref", 400);
