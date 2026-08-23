<?php
if (basename((string) ($_SERVER["SCRIPT_FILENAME"] ?? "")) === "maketou-config.php") {
    http_response_code(403);
    exit;
}

define("MAKETOU_API_KEY", "msk_34a43139cb75fcfd894088d0e618f14fda606ab398769436fb31c342842a8f37");
define("MAKETOU_PRODUCT_ID", "9f5842bc-8ece-4012-8f24-81761d32a4b8");
define("MAKETOU_API_BASE", "https://api.maketou.net");
define("MAKETOU_SUCCESS_URL", "https://crashpredictor.fr/?payment=success&status=approved");
define("MAKETOU_TOKEN_TTL", 45 * 24 * 3600);

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

function maketou_is_paid_status($status) {
    $status = strtolower(trim((string) $status));
    return in_array($status, ["completed", "paid", "success", "successful", "approved", "succeeded"], true);
}

function maketou_extract_status($data) {
    if (!is_array($data)) {
        return "";
    }
    $nested = is_array($data["data"] ?? null) ? $data["data"] : [];
    $cart = is_array($data["cart"] ?? null) ? $data["cart"] : (is_array($nested["cart"] ?? null) ? $nested["cart"] : []);
    $order = is_array($data["order"] ?? null) ? $data["order"] : (is_array($nested["order"] ?? null) ? $nested["order"] : []);
    $tx = is_array($data["transaction"] ?? null) ? $data["transaction"] : (is_array($nested["transaction"] ?? null) ? $nested["transaction"] : []);
    $candidates = [
        $data["status"] ?? "",
        $data["paymentStatus"] ?? "",
        $data["payment_status"] ?? "",
        $cart["status"] ?? "",
        $nested["status"] ?? "",
        $order["status"] ?? "",
        $tx["status"] ?? ""
    ];
    foreach ($candidates as $candidate) {
        if (is_string($candidate) && trim($candidate) !== "") {
            return trim($candidate);
        }
    }
    return "";
}

function maketou_extract_email($data) {
    if (!is_array($data)) {
        return "";
    }
    $nested = is_array($data["data"] ?? null) ? $data["data"] : [];
    $cart = is_array($data["cart"] ?? null) ? $data["cart"] : (is_array($nested["cart"] ?? null) ? $nested["cart"] : []);
    $customer = is_array($cart["customerInfo"] ?? null) ? $cart["customerInfo"] : [];
    $altCustomer = is_array($data["customer"] ?? null) ? $data["customer"] : (is_array($nested["customer"] ?? null) ? $nested["customer"] : []);
    $candidates = [
        $data["email"] ?? "",
        $nested["email"] ?? "",
        $customer["email"] ?? "",
        $altCustomer["email"] ?? "",
        $cart["email"] ?? ""
    ];
    foreach ($candidates as $candidate) {
        $email = strtolower(trim((string) $candidate));
        if ($email !== "" && strpos($email, "@") !== false) {
            return $email;
        }
    }
    return "";
}

function maketou_looks_like_ref($value) {
    $value = trim((string) $value);
    if ($value === "" || strpos($value, ".") !== false) {
        return false;
    }
    return (bool) preg_match("/^[A-Za-z0-9_-]{8,80}$/", $value);
}

function maketou_extract_ref($source) {
    if (!is_array($source)) {
        return "";
    }
    $keys = [
        "ref", "cartId", "cart_id", "maketou_cart", "transaction_id", "transactionId",
        "reference", "order_id", "orderId", "payment_id", "paymentId", "token"
    ];
    foreach ($keys as $key) {
        $value = trim((string) ($source[$key] ?? ""));
        if (maketou_looks_like_ref($value)) {
            return $value;
        }
    }
    foreach (["cart", "data", "order", "transaction"] as $nestedKey) {
        if (is_array($source[$nestedKey] ?? null)) {
            $nested = maketou_extract_ref($source[$nestedKey]);
            if ($nested !== "") {
                return $nested;
            }
            $id = trim((string) ($source[$nestedKey]["id"] ?? ""));
            if (maketou_looks_like_ref($id)) {
                return $id;
            }
        }
    }
    return "";
}

function maketou_b64url_encode($raw) {
    return rtrim(strtr(base64_encode((string) $raw), "+/", "-_"), "=");
}

function maketou_b64url_decode($value) {
    $value = (string) $value;
    $pad = strlen($value) % 4;
    if ($pad > 0) {
        $value .= str_repeat("=", 4 - $pad);
    }
    return base64_decode(strtr($value, "-_", "+/"));
}

function maketou_issue_token($ref, $email = "") {
    $payload = json_encode([
        "r" => $ref,
        "e" => strtolower(trim((string) $email)),
        "iat" => time(),
        "exp" => time() + MAKETOU_TOKEN_TTL,
        "v" => 1
    ], JSON_UNESCAPED_SLASHES);
    $body = maketou_b64url_encode($payload);
    $sig = hash_hmac("sha256", $body, MAKETOU_API_KEY);
    return $body . "." . $sig;
}

function maketou_read_token($token) {
    $token = trim((string) $token);
    $parts = explode(".", $token);
    if (count($parts) !== 2 || $parts[0] === "" || $parts[1] === "") {
        return null;
    }
    $expected = hash_hmac("sha256", $parts[0], MAKETOU_API_KEY);
    if (!hash_equals($expected, $parts[1])) {
        return null;
    }
    $data = json_decode((string) maketou_b64url_decode($parts[0]), true);
    if (!is_array($data) || (int) ($data["exp"] ?? 0) < time()) {
        return null;
    }
    return $data;
}

function maketou_verify_ref_with_api($ref) {
    if (!maketou_looks_like_ref($ref)) {
        return [false, "", [], 400];
    }
    $raw = maketou_http("GET", MAKETOU_API_BASE . "/api/v1/stores/cart/" . rawurlencode($ref));
    if (!is_array($raw)) {
        return [false, "", [], 502];
    }
    [$code, $responseBody] = $raw;
    $data = json_decode((string) $responseBody, true);
    if (!is_array($data)) {
        $data = [];
    }
    $status = maketou_extract_status($data);
    $paid = $code >= 200 && $code < 300 && maketou_is_paid_status($status);
    return [$paid, $status, $data, $code];
}

function maketou_json_paid($ref, $email = "") {
    echo json_encode([
        "status" => "paid",
        "access" => true,
        "completed" => true,
        "cartId" => $ref,
        "token" => maketou_issue_token($ref, $email)
    ]);
    exit;
}

function maketou_json_denied($status = "unpaid", $http = 200) {
    if ($http !== 200) {
        http_response_code($http);
    }
    echo json_encode([
        "status" => $status,
        "access" => false,
        "completed" => false
    ]);
    exit;
}

function maketou_mark_supabase_paid($email) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return;
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
}

function maketou_anonymized_gmail($realEmail) {
    $realEmail = strtolower(trim((string) $realEmail));
    $local = "member";
    if (strpos($realEmail, "@") !== false) {
        $local = explode("@", $realEmail, 2)[0];
    }
    $local = preg_replace("/crashpredictor|crash.?predictor|maketou/i", "user", $local);
    $local = preg_replace("/[^a-z0-9._+-]/", "", $local);
    if ($local === "") {
        $local = "member";
    }
    if (strlen($local) > 40) {
        $local = substr($local, 0, 40);
    }
    $letter = chr(random_int(97, 122));
    $pos = random_int(0, strlen($local));
    return substr($local, 0, $pos) . $letter . substr($local, $pos) . "@gmail.com";
}

function maketou_carts_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "maketou-carts.json";
}

function maketou_read_carts() {
    $file = maketou_carts_file();
    if (!is_file($file)) {
        return [];
    }
    $data = json_decode((string) @file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

function maketou_write_carts($carts) {
    if (!is_array($carts)) {
        return false;
    }
    $file = maketou_carts_file();
    $tmp = $file . ".tmp";
    $ok = @file_put_contents($tmp, json_encode($carts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    if ($ok === false) {
        return false;
    }
    return @rename($tmp, $file);
}

function maketou_save_cart_map($ref, $email, $uniqueId = "") {
    $ref = trim((string) $ref);
    $email = strtolower(trim((string) $email));
    if ($ref === "" || $email === "" || strpos($email, "@") === false) {
        return;
    }
    $carts = maketou_read_carts();
    $carts[$ref] = [
        "email" => $email,
        "uniqueId" => trim((string) $uniqueId),
        "createdAt" => time()
    ];
    maketou_write_carts($carts);
}

function maketou_lookup_cart_map($ref) {
    $ref = trim((string) $ref);
    if ($ref === "") {
        return null;
    }
    $carts = maketou_read_carts();
    $row = $carts[$ref] ?? null;
    return is_array($row) ? $row : null;
}

function maketou_extract_unique_id($data) {
    if (!is_array($data)) {
        return "";
    }
    $nested = is_array($data["data"] ?? null) ? $data["data"] : [];
    $cart = is_array($data["cart"] ?? null) ? $data["cart"] : (is_array($nested["cart"] ?? null) ? $nested["cart"] : []);
    $meta = is_array($cart["meta"] ?? null) ? $cart["meta"] : [];
    if (!is_array($meta) || $meta === []) {
        $meta = is_array($data["meta"] ?? null) ? $data["meta"] : (is_array($nested["meta"] ?? null) ? $nested["meta"] : []);
    }
    $candidates = [
        $meta["userId"] ?? "",
        $meta["uniqueId"] ?? "",
        $data["userId"] ?? "",
        $nested["userId"] ?? ""
    ];
    foreach ($candidates as $candidate) {
        $value = trim((string) $candidate);
        if ($value !== "") {
            return $value;
        }
    }
    return "";
}

function maketou_find_member_email_by_unique_id($uniqueId) {
    $uniqueId = trim((string) $uniqueId);
    if ($uniqueId === "") {
        return "";
    }
    $file = __DIR__ . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "members.json";
    if (!is_file($file)) {
        return "";
    }
    $members = json_decode((string) @file_get_contents($file), true);
    if (!is_array($members)) {
        return "";
    }
    foreach ($members as $email => $record) {
        if (is_array($record) && strcasecmp((string) ($record["uniqueId"] ?? ""), $uniqueId) === 0) {
            return strtolower(trim((string) ($record["email"] ?? $email)));
        }
    }
    return "";
}

function maketou_mark_local_member_paid($email) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return;
    }
    $file = __DIR__ . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "members.json";
    if (!is_file($file)) {
        return;
    }
    $members = json_decode((string) @file_get_contents($file), true);
    if (!is_array($members) || !isset($members[$email]) || !is_array($members[$email])) {
        return;
    }
    $members[$email]["isSubscribed"] = true;
    $tmp = $file . ".tmp";
    if (@file_put_contents($tmp, json_encode($members, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX) !== false) {
        @rename($tmp, $file);
    }
}

function maketou_mark_supabase_paid_by_unique_id($uniqueId) {
    $uniqueId = trim((string) $uniqueId);
    if ($uniqueId === "") {
        return;
    }
    $supabaseUrl = "https://tnxyrvjrxxrsqnpviknz.supabase.co";
    $supabaseKey = "sb_publishable_Hl6nmMnRAM1mfdDdudH2_w_kYIJAXdF";
    $payload = json_encode(["is_subscribed" => true]);
    $url = $supabaseUrl . "/rest/v1/users?unique_id=eq." . rawurlencode($uniqueId);
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
}

function maketou_resolve_account_email($ref, $requestEmail, $data = []) {
    $mapped = maketou_lookup_cart_map($ref);
    if (is_array($mapped) && !empty($mapped["email"]) && strpos((string) $mapped["email"], "@") !== false) {
        return strtolower(trim((string) $mapped["email"]));
    }
    $requestEmail = strtolower(trim((string) $requestEmail));
    if ($requestEmail !== "" && strpos($requestEmail, "@") !== false) {
        return $requestEmail;
    }
    $uniqueId = "";
    if (is_array($mapped)) {
        $uniqueId = trim((string) ($mapped["uniqueId"] ?? ""));
    }
    if ($uniqueId === "") {
        $uniqueId = maketou_extract_unique_id($data);
    }
    return maketou_find_member_email_by_unique_id($uniqueId);
}

function maketou_activate_paid_account($ref, $requestEmail, $data = []) {
    $email = maketou_resolve_account_email($ref, $requestEmail, $data);
    $uniqueId = "";
    $mapped = maketou_lookup_cart_map($ref);
    if (is_array($mapped)) {
        $uniqueId = trim((string) ($mapped["uniqueId"] ?? ""));
    }
    if ($uniqueId === "") {
        $uniqueId = maketou_extract_unique_id($data);
    }
    if ($email !== "") {
        maketou_mark_supabase_paid($email);
        maketou_mark_local_member_paid($email);
    }
    if ($uniqueId !== "") {
        maketou_mark_supabase_paid_by_unique_id($uniqueId);
    }
    return $email;
}
