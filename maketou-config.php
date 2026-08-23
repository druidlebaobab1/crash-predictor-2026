<?php
if (basename((string) ($_SERVER["SCRIPT_FILENAME"] ?? "")) === "maketou-config.php") {
    http_response_code(403);
    exit;
}

define("MAKETOU_API_KEY", "msk_34a43139cb75fcfd894088d0e618f14fda606ab398769436fb31c342842a8f37");
define("MAKETOU_PRODUCT_ID", "9f5842bc-8ece-4012-8f24-81761d32a4b8");
define("MAKETOU_API_BASE", "https://api.maketou.net");
define("MAKETOU_SUCCESS_URL", "https://crashpredictor.fr/?payment=success&status=approved");
define("MAKETOU_SUBSCRIPTION_DAYS", 30);
define("MAKETOU_TOKEN_TTL", 30 * 24 * 3600);
define("MAKETOU_SUPABASE_URL", "https://tnxyrvjrxxrsqnpviknz.supabase.co");
define("MAKETOU_SUPABASE_KEY", "sb_publishable_Hl6nmMnRAM1mfdDdudH2_w_kYIJAXdF");

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

function maketou_issue_token($ref, $email = "", $expiresAt = "") {
    $exp = time() + MAKETOU_TOKEN_TTL;
    $expiresTs = maketou_parse_ts($expiresAt);
    if ($expiresTs > time()) {
        $exp = $expiresTs;
    }
    $payload = json_encode([
        "r" => $ref,
        "e" => strtolower(trim((string) $email)),
        "iat" => time(),
        "exp" => $exp,
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

function maketou_json_paid($ref, $email = "", $expiresAt = "", $paymentDate = "") {
    echo json_encode([
        "status" => "paid",
        "access" => true,
        "completed" => true,
        "cartId" => $ref,
        "token" => maketou_issue_token($ref, $email, $expiresAt),
        "expiresAt" => $expiresAt,
        "paymentDate" => $paymentDate
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

function maketou_parse_ts($value) {
    $value = trim((string) $value);
    if ($value === "") {
        return 0;
    }
    $ts = strtotime($value);
    return $ts ? (int) $ts : 0;
}

function maketou_iso_from_ts($ts) {
    return gmdate("c", (int) $ts);
}

function maketou_now_iso() {
    return gmdate("c");
}

function maketou_later_iso($candidates) {
    $bestTs = 0;
    foreach ((array) $candidates as $candidate) {
        $ts = maketou_parse_ts($candidate);
        if ($ts > $bestTs) {
            $bestTs = $ts;
        }
    }
    return $bestTs > 0 ? maketou_iso_from_ts($bestTs) : "";
}

function maketou_next_expiry_iso($currentExpires, $lastRef, $newRef) {
    $newRef = trim((string) $newRef);
    $lastRef = trim((string) $lastRef);
    $currentTs = maketou_parse_ts($currentExpires);
    if ($newRef !== "" && strcasecmp($lastRef, $newRef) === 0 && $currentTs > time()) {
        return [false, maketou_iso_from_ts($currentTs)];
    }
    $now = time();
    $base = $currentTs > $now ? $currentTs : $now;
    return [true, maketou_iso_from_ts($base + (MAKETOU_SUBSCRIPTION_DAYS * 86400))];
}

function maketou_members_file() {
    return __DIR__ . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "members.json";
}

function maketou_read_local_member($email) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return null;
    }
    $file = maketou_members_file();
    if (!is_file($file)) {
        return null;
    }
    $members = json_decode((string) @file_get_contents($file), true);
    if (!is_array($members) || !isset($members[$email]) || !is_array($members[$email])) {
        return null;
    }
    return $members[$email];
}

function maketou_write_local_member($email, $record) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || !is_array($record)) {
        return false;
    }
    $file = maketou_members_file();
    $dir = dirname($file);
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    $members = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $members = $decoded;
        }
    }
    $members[$email] = $record;
    $tmp = $file . ".tmp";
    if (@file_put_contents($tmp, json_encode($members, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX) === false) {
        return false;
    }
    return @rename($tmp, $file);
}

function maketou_supabase_http($method, $path, $payload = null) {
    $url = MAKETOU_SUPABASE_URL . $path;
    $headers = [
        "apikey: " . MAKETOU_SUPABASE_KEY,
        "Authorization: Bearer " . MAKETOU_SUPABASE_KEY,
        "Content-Type: application/json",
        "Prefer: return=representation"
    ];
    $json = $payload === null ? null : json_encode($payload);
    if (function_exists("curl_init")) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 20
        ];
        if ($json !== null) {
            $options[CURLOPT_POSTFIELDS] = $json;
        }
        curl_setopt_array($ch, $options);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [$status, $body === false ? "" : (string) $body];
    }
    return [0, ""];
}

function maketou_supabase_fetch_user($email = "", $uniqueId = "") {
    $email = strtolower(trim((string) $email));
    $uniqueId = trim((string) $uniqueId);
    $queries = [];
    if ($email !== "" && strpos($email, "@") !== false) {
        $queries[] = "/rest/v1/users?select=email,unique_id,is_subscribed,payment_date,subscription_expires_at,vip_until,last_payment_ref&email=eq." . rawurlencode($email);
    }
    if ($uniqueId !== "") {
        $queries[] = "/rest/v1/users?select=email,unique_id,is_subscribed,payment_date,subscription_expires_at,vip_until,last_payment_ref&unique_id=eq." . rawurlencode($uniqueId);
    }
    foreach ($queries as $path) {
        [$status, $body] = maketou_supabase_http("GET", $path);
        if ($status < 200 || $status >= 300) {
            continue;
        }
        $rows = json_decode((string) $body, true);
        if (is_array($rows) && isset($rows[0]) && is_array($rows[0])) {
            return $rows[0];
        }
    }
    return null;
}

function maketou_collect_subscription_state($email, $uniqueId = "") {
    $local = maketou_read_local_member($email);
    $cloud = maketou_supabase_fetch_user($email, $uniqueId);
    $expiresAt = maketou_later_iso([
        is_array($local) ? ($local["subscriptionExpiresAt"] ?? ($local["vipUntil"] ?? "")) : "",
        is_array($cloud) ? ($cloud["subscription_expires_at"] ?? ($cloud["vip_until"] ?? "")) : ""
    ]);
    $lastRef = "";
    if (is_array($local) && trim((string) ($local["lastPaymentRef"] ?? "")) !== "") {
        $lastRef = trim((string) $local["lastPaymentRef"]);
    } elseif (is_array($cloud) && trim((string) ($cloud["last_payment_ref"] ?? "")) !== "") {
        $lastRef = trim((string) $cloud["last_payment_ref"]);
    }
    $paymentDate = maketou_later_iso([
        is_array($local) ? ($local["paymentDate"] ?? "") : "",
        is_array($cloud) ? ($cloud["payment_date"] ?? "") : ""
    ]);
    return [
        "local" => $local,
        "cloud" => $cloud,
        "expiresAt" => $expiresAt,
        "lastPaymentRef" => $lastRef,
        "paymentDate" => $paymentDate
    ];
}

function maketou_apply_local_subscription($email, $ref, $expiresAt, $paymentDate) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return;
    }
    $record = maketou_read_local_member($email);
    if (!is_array($record)) {
        return;
    }
    $record["isSubscribed"] = true;
    $record["paymentDate"] = $paymentDate;
    $record["subscriptionExpiresAt"] = $expiresAt;
    $record["vipUntil"] = $expiresAt;
    if (trim((string) $ref) !== "") {
        $record["lastPaymentRef"] = trim((string) $ref);
    }
    maketou_write_local_member($email, $record);
}

function maketou_apply_supabase_subscription($email, $uniqueId, $ref, $expiresAt, $paymentDate) {
    $payloadFull = [
        "is_subscribed" => true,
        "payment_date" => $paymentDate,
        "subscription_expires_at" => $expiresAt,
        "vip_until" => $expiresAt
    ];
    if (trim((string) $ref) !== "") {
        $payloadFull["last_payment_ref"] = trim((string) $ref);
    }
    $payloadLite = ["is_subscribed" => true];
    $targets = [];
    $email = strtolower(trim((string) $email));
    $uniqueId = trim((string) $uniqueId);
    if ($email !== "" && strpos($email, "@") !== false) {
        $targets[] = "/rest/v1/users?email=eq." . rawurlencode($email);
    }
    if ($uniqueId !== "") {
        $targets[] = "/rest/v1/users?unique_id=eq." . rawurlencode($uniqueId);
    }
    foreach ($targets as $path) {
        [$status] = maketou_supabase_http("PATCH", $path, $payloadFull);
        if ($status < 200 || $status >= 300) {
            maketou_supabase_http("PATCH", $path, $payloadLite);
        }
    }
}

function maketou_mark_supabase_paid($email) {
    maketou_apply_supabase_subscription($email, "", "", maketou_iso_from_ts(time() + (MAKETOU_SUBSCRIPTION_DAYS * 86400)), maketou_now_iso());
}

function maketou_subscription_is_active($expiresAt) {
    $ts = maketou_parse_ts($expiresAt);
    if ($ts > 0) {
        return $ts > time();
    }
    return false;
}

function maketou_read_subscription_state($email, $uniqueId = "") {
    $email = strtolower(trim((string) $email));
    $state = maketou_collect_subscription_state($email, $uniqueId);
    $expiresAt = $state["expiresAt"];
    $local = $state["local"];
    $cloud = $state["cloud"];
    $legacyPaid = (is_array($local) && !empty($local["isSubscribed"]))
        || (is_array($cloud) && !empty($cloud["is_subscribed"]));

    if ($expiresAt === "" && $legacyPaid) {
        $expiresAt = maketou_iso_from_ts(time() + (MAKETOU_SUBSCRIPTION_DAYS * 86400));
        $paymentDate = $state["paymentDate"] !== "" ? $state["paymentDate"] : maketou_now_iso();
        maketou_apply_local_subscription($email, $state["lastPaymentRef"], $expiresAt, $paymentDate);
        maketou_apply_supabase_subscription($email, $uniqueId, $state["lastPaymentRef"], $expiresAt, $paymentDate);
        return [
            "active" => true,
            "legacy" => true,
            "expiresAt" => $expiresAt,
            "paymentDate" => $paymentDate
        ];
    }

    if ($expiresAt !== "") {
        return [
            "active" => maketou_subscription_is_active($expiresAt),
            "legacy" => false,
            "expiresAt" => $expiresAt,
            "paymentDate" => $state["paymentDate"]
        ];
    }

    return null;
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

function maketou_mark_local_member_paid($email, $ref = "") {
    $state = maketou_collect_subscription_state($email, "");
    [$changed, $expiresAt] = maketou_next_expiry_iso($state["expiresAt"], $state["lastPaymentRef"], $ref);
    $paymentDate = $changed ? maketou_now_iso() : ($state["paymentDate"] !== "" ? $state["paymentDate"] : maketou_now_iso());
    maketou_apply_local_subscription($email, $ref, $expiresAt, $paymentDate);
    return ["expiresAt" => $expiresAt, "paymentDate" => $paymentDate];
}

function maketou_mark_supabase_paid_by_unique_id($uniqueId) {
    $expiresAt = maketou_iso_from_ts(time() + (MAKETOU_SUBSCRIPTION_DAYS * 86400));
    maketou_apply_supabase_subscription("", $uniqueId, "", $expiresAt, maketou_now_iso());
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
    $state = maketou_collect_subscription_state($email, $uniqueId);
    [$changed, $expiresAt] = maketou_next_expiry_iso($state["expiresAt"], $state["lastPaymentRef"], $ref);
    $paymentDate = $changed ? maketou_now_iso() : ($state["paymentDate"] !== "" ? $state["paymentDate"] : maketou_now_iso());
    if ($email !== "") {
        maketou_apply_local_subscription($email, $ref, $expiresAt, $paymentDate);
        maketou_apply_supabase_subscription($email, $uniqueId, $ref, $expiresAt, $paymentDate);
    } elseif ($uniqueId !== "") {
        maketou_apply_supabase_subscription("", $uniqueId, $ref, $expiresAt, $paymentDate);
    }
    return [
        "email" => $email,
        "expiresAt" => $expiresAt,
        "paymentDate" => $paymentDate
    ];
}
