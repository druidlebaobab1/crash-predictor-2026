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
define("MAKETOU_REPAIR_KEY", "ADMIN2026");
define("MAKETOU_SUPABASE_URL", "https://tnxyrvjrxxrsqnpviknz.supabase.co");
define("MAKETOU_SUPABASE_KEY", "sb_publishable_Hl6nmMnRAM1mfdDdudH2_w_kYIJAXdF");

function maketou_http($method, $url, $payload = null, $timeout = 25) {
    $headers = [
        "Authorization: Bearer " . MAKETOU_API_KEY,
        "Content-Type: application/json",
        "Accept: application/json"
    ];
    $json = $payload === null ? null : json_encode($payload);
    $timeout = max(5, (int) $timeout);

    if (function_exists("curl_init")) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => $timeout,
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
            "timeout" => $timeout,
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

function maketou_log($event, $payload = []) {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    $line = date("c") . " " . trim((string) $event) . " " . json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
    @file_put_contents($dir . DIRECTORY_SEPARATOR . "maketou-events.log", $line, FILE_APPEND | LOCK_EX);
}

function maketou_is_paid_status($status) {
    $status = strtolower(trim((string) $status));
    $status = str_replace([" ", "-"], "_", $status);
    return in_array($status, [
        "completed", "complete", "paid", "success", "successful", "approved",
        "succeeded", "settled", "captured", "processed", "confirmed",
        "payment_success", "payment_successful", "done"
    ], true);
}

function maketou_payload_looks_paid($data) {
    if (maketou_is_paid_status(maketou_extract_status($data))) {
        return true;
    }
    if (!is_array($data)) {
        return false;
    }
    $flags = [
        $data["paid"] ?? null,
        $data["isPaid"] ?? null,
        $data["is_paid"] ?? null,
        $data["completed"] ?? null,
        $data["access"] ?? null
    ];
    $nested = is_array($data["data"] ?? null) ? $data["data"] : [];
    if ($nested) {
        $flags[] = $nested["paid"] ?? null;
        $flags[] = $nested["isPaid"] ?? null;
        $flags[] = $nested["is_paid"] ?? null;
        $flags[] = $nested["completed"] ?? null;
    }
    foreach ($flags as $flag) {
        if ($flag === true || $flag === 1 || $flag === "1" || (is_string($flag) && maketou_is_paid_status($flag))) {
            return true;
        }
    }
    $event = strtolower(trim((string) ($data["event"] ?? ($data["type"] ?? ($nested["event"] ?? "")))));
    if ($event !== "" && preg_match("/paid|success|complet|approved|settled/i", $event)) {
        return true;
    }
    return false;
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

function maketou_verify_ref_with_api($ref, $timeout = 25) {
    if (!maketou_looks_like_ref($ref)) {
        return [false, "", [], 400];
    }
    $raw = maketou_http("GET", MAKETOU_API_BASE . "/api/v1/stores/cart/" . rawurlencode($ref), null, $timeout);
    if (!is_array($raw)) {
        return [false, "", [], 502];
    }
    [$code, $responseBody] = $raw;
    $data = json_decode((string) $responseBody, true);
    if (!is_array($data)) {
        $data = [];
    }
    $status = maketou_extract_status($data);
    $paid = $code >= 200 && $code < 300 && (maketou_is_paid_status($status) || maketou_payload_looks_paid($data));
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
        $queries[] = "/rest/v1/users?select=email,unique_id,is_subscribed,payment_date,subscription_expires_at,vip_until,last_payment_ref,referred_by,paid_referral_count&email=eq." . rawurlencode($email);
    }
    if ($uniqueId !== "") {
        $queries[] = "/rest/v1/users?select=email,unique_id,is_subscribed,payment_date,subscription_expires_at,vip_until,last_payment_ref,referred_by,paid_referral_count&unique_id=eq." . rawurlencode($uniqueId);
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

function maketou_apply_local_subscription($email, $ref, $expiresAt, $paymentDate, $uniqueId = "") {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return;
    }
    $record = maketou_read_local_member($email);
    if (!is_array($record)) {
        $record = [
            "email" => $email,
            "uniqueId" => trim((string) $uniqueId),
            "name" => "Client",
            "phone" => "",
            "passwordHash" => "",
            "isSubscribed" => true,
            "registeredAt" => date("Y-m-d")
        ];
    }
    if (trim((string) $uniqueId) !== "" && trim((string) ($record["uniqueId"] ?? "")) === "") {
        $record["uniqueId"] = trim((string) $uniqueId);
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
    $prev = is_array($carts[$ref] ?? null) ? $carts[$ref] : [];
    $carts[$ref] = array_merge($prev, [
        "email" => $email,
        "uniqueId" => trim((string) $uniqueId),
        "createdAt" => (int) ($prev["createdAt"] ?? time())
    ]);
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

function maketou_carts_for_email($email) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return [];
    }
    $ranked = [];
    foreach (maketou_read_carts() as $ref => $row) {
        if (!is_array($row)) {
            continue;
        }
        if (strtolower(trim((string) ($row["email"] ?? ""))) !== $email) {
            continue;
        }
        $ranked[] = [trim((string) $ref), (int) ($row["createdAt"] ?? 0)];
    }
    usort($ranked, function ($left, $right) {
        return $right[1] - $left[1];
    });
    $refs = [];
    foreach ($ranked as $row) {
        if ($row[0] !== "") {
            $refs[] = $row[0];
        }
    }
    return $refs;
}

function maketou_try_unlock_by_email($email) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return null;
    }
    $state = maketou_read_subscription_state($email);
    if (is_array($state) && !empty($state["active"])) {
        return [
            "email" => $email,
            "ref" => (string) ($state["lastPaymentRef"] ?? "subscription"),
            "expiresAt" => (string) ($state["expiresAt"] ?? ""),
            "paymentDate" => (string) ($state["paymentDate"] ?? "")
        ];
    }
    foreach (maketou_carts_for_email($email) as $ref) {
        [$paid, $status, $data, $code] = maketou_verify_ref_with_api($ref);
        maketou_log("unlock_by_email_cart", [
            "email" => $email,
            "ref" => $ref,
            "paid" => $paid,
            "status" => $status,
            "code" => $code
        ]);
        if ($paid) {
            $activated = maketou_activate_paid_account($ref, $email, $data);
            return [
                "email" => (string) ($activated["email"] ?? $email),
                "ref" => $ref,
                "expiresAt" => (string) ($activated["expiresAt"] ?? ""),
                "paymentDate" => (string) ($activated["paymentDate"] ?? "")
            ];
        }
    }
    return null;
}

function maketou_request_unique_id($source) {
    if (!is_array($source)) {
        return "";
    }
    $candidates = [
        $source["uid"] ?? "",
        $source["uniqueId"] ?? "",
        $source["unique_id"] ?? "",
        $source["userId"] ?? "",
        $source["user_id"] ?? ""
    ];
    foreach ($candidates as $candidate) {
        $id = maketou_normalize_member_id($candidate);
        if ($id !== "") {
            return $id;
        }
    }
    return maketou_normalize_member_id(maketou_extract_unique_id($source));
}

function maketou_success_url_with_uid($uniqueId) {
    $url = MAKETOU_SUCCESS_URL;
    $uid = maketou_normalize_member_id($uniqueId);
    if ($uid === "") {
        return $url;
    }
    $join = strpos($url, "?") !== false ? "&" : "?";
    return $url . $join . "uid=" . rawurlencode($uid);
}

function maketou_carts_for_unique_id($uniqueId) {
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($uniqueId === "") {
        return [];
    }
    $ranked = [];
    foreach (maketou_read_carts() as $ref => $row) {
        if (!is_array($row)) {
            continue;
        }
        if (maketou_normalize_member_id($row["uniqueId"] ?? "") !== $uniqueId) {
            continue;
        }
        $ranked[] = [trim((string) $ref), (int) ($row["createdAt"] ?? 0)];
    }
    usort($ranked, function ($left, $right) {
        return $right[1] - $left[1];
    });
    $refs = [];
    foreach ($ranked as $row) {
        if ($row[0] !== "") {
            $refs[] = $row[0];
        }
    }
    return $refs;
}

function maketou_pack_unlock($ref, $email, $expiresAt, $paymentDate) {
    return [
        "email" => strtolower(trim((string) $email)),
        "ref" => (string) $ref,
        "expiresAt" => (string) $expiresAt,
        "paymentDate" => (string) $paymentDate
    ];
}

function maketou_try_unlock_by_unique_id($uniqueId) {
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($uniqueId === "") {
        return null;
    }
    $email = maketou_find_member_email_by_unique_id($uniqueId);
    if ($email !== "") {
        $unlocked = maketou_try_unlock_by_email($email);
        if (is_array($unlocked)) {
            return $unlocked;
        }
    }
    foreach (maketou_carts_for_unique_id($uniqueId) as $ref) {
        [$paid, $status, $data, $code] = maketou_verify_ref_with_api($ref);
        maketou_log("unlock_by_uid_cart", [
            "uniqueId" => $uniqueId,
            "ref" => $ref,
            "paid" => $paid,
            "status" => $status,
            "code" => $code
        ]);
        if ($paid) {
            $activated = maketou_activate_paid_account($ref, $email, $data);
            return maketou_pack_unlock(
                $ref,
                (string) ($activated["email"] ?? $email),
                (string) ($activated["expiresAt"] ?? ""),
                (string) ($activated["paymentDate"] ?? "")
            );
        }
    }
    $cloud = maketou_supabase_fetch_user($email, $uniqueId);
    if (is_array($cloud) && !empty($cloud["is_subscribed"])) {
        $cloudEmail = strtolower(trim((string) ($cloud["email"] ?? $email)));
        $state = $cloudEmail !== "" ? maketou_read_subscription_state($cloudEmail, $uniqueId) : null;
        if (is_array($state) && !empty($state["active"])) {
            return maketou_pack_unlock(
                (string) ($state["lastPaymentRef"] ?? "subscription"),
                $cloudEmail,
                (string) ($state["expiresAt"] ?? ""),
                (string) ($state["paymentDate"] ?? "")
            );
        }
    }
    return null;
}

function maketou_try_unlock_any($ref, $email, $uniqueId, $data = []) {
    $ref = trim((string) $ref);
    $email = strtolower(trim((string) $email));
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($ref !== "") {
        [$paid, $status, $payload, $code] = maketou_verify_ref_with_api($ref);
        maketou_log("unlock_any_ref", [
            "ref" => $ref,
            "email" => $email,
            "uniqueId" => $uniqueId,
            "paid" => $paid,
            "status" => $status,
            "code" => $code
        ]);
        if ($paid) {
            $merged = is_array($payload) ? array_merge(is_array($data) ? $data : [], $payload) : $data;
            $activated = maketou_activate_paid_account($ref, $email, $merged);
            return maketou_pack_unlock(
                $ref,
                (string) ($activated["email"] ?? $email),
                (string) ($activated["expiresAt"] ?? ""),
                (string) ($activated["paymentDate"] ?? "")
            );
        }
    }
    if ($email !== "" && strpos($email, "@") !== false) {
        $unlocked = maketou_try_unlock_by_email($email);
        if (is_array($unlocked)) {
            return $unlocked;
        }
    }
    if ($uniqueId !== "") {
        $unlocked = maketou_try_unlock_by_unique_id($uniqueId);
        if (is_array($unlocked)) {
            return $unlocked;
        }
    }
    return null;
}

function maketou_recover_paid_return($source) {
    if (!is_array($source)) {
        return null;
    }
    $ref = maketou_extract_ref($source);
    $email = strtolower(trim((string) ($source["email"] ?? "")));
    if ($email === "") {
        $email = maketou_extract_email($source);
    }
    $uniqueId = maketou_request_unique_id($source);
    $unlocked = maketou_try_unlock_any($ref, $email, $uniqueId, $source);
    maketou_log("recover_return", [
        "ref" => $ref,
        "email" => $email,
        "uniqueId" => $uniqueId,
        "ok" => is_array($unlocked)
    ]);
    return $unlocked;
}

function maketou_queue_put(&$queue, $ref, $email = "", $uniqueId = "", $createdAt = 0) {
    $ref = trim((string) $ref);
    if ($ref === "" || $ref === MAKETOU_PRODUCT_ID || !maketou_looks_like_ref($ref)) {
        return;
    }
    if (!isset($queue[$ref]) || !is_array($queue[$ref])) {
        $queue[$ref] = ["email" => "", "uniqueId" => "", "createdAt" => 0];
    }
    $email = strtolower(trim((string) $email));
    if ($email !== "" && strpos($email, "@") !== false) {
        $queue[$ref]["email"] = $email;
    }
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($uniqueId !== "") {
        $queue[$ref]["uniqueId"] = $uniqueId;
    }
    $createdAt = (int) $createdAt;
    if ($createdAt > (int) ($queue[$ref]["createdAt"] ?? 0)) {
        $queue[$ref]["createdAt"] = $createdAt;
    }
}

function maketou_collect_log_cart_ids() {
    $file = __DIR__ . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "maketou-events.log";
    if (!is_file($file)) {
        return [];
    }
    $text = (string) @file_get_contents($file);
    if ($text === "") {
        return [];
    }
    $ids = [];
    $lines = preg_split("/\r\n|\n|\r/", $text);
    foreach ($lines as $line) {
        if (strpos($line, "checkout_create") === false && strpos($line, "webhook_in") === false) {
            continue;
        }
        if (preg_match_all('/"(?:cartId|cart_id)"\s*:\s*"([^"]+)"/', $line, $matches)) {
            foreach ($matches[1] as $ref) {
                $ref = trim((string) $ref);
                if ($ref !== "" && $ref !== MAKETOU_PRODUCT_ID && maketou_looks_like_ref($ref)) {
                    $ids[$ref] = true;
                }
            }
        }
    }
    return array_keys($ids);
}

function maketou_supabase_repair_rows() {
    [$status, $body] = maketou_supabase_http(
        "GET",
        "/rest/v1/users?select=email,unique_id,is_subscribed,last_payment_ref,subscription_expires_at,vip_until&limit=400"
    );
    if ($status < 200 || $status >= 300) {
        return [];
    }
    $rows = json_decode((string) $body, true);
    return is_array($rows) ? $rows : [];
}

function maketou_supabase_licensed_count() {
    [$status, $body] = maketou_supabase_http(
        "GET",
        "/rest/v1/users?is_subscribed=eq.true&select=unique_id&limit=400"
    );
    if ($status < 200 || $status >= 300) {
        return -1;
    }
    $rows = json_decode((string) $body, true);
    return is_array($rows) ? count($rows) : -1;
}

function maketou_repair_queue_file() {
    $dir = __DIR__ . DIRECTORY_SEPARATOR . "data";
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    return $dir . DIRECTORY_SEPARATOR . "maketou-repair-queue.json";
}

function maketou_account_queue_put(&$accounts, $email, $uniqueId = "", $ref = "", $createdAt = 0) {
    $email = strtolower(trim((string) $email));
    if ($email === "" || strpos($email, "@") === false) {
        return;
    }
    if (!isset($accounts[$email]) || !is_array($accounts[$email])) {
        $accounts[$email] = ["uniqueId" => "", "refs" => []];
    }
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($uniqueId !== "") {
        $accounts[$email]["uniqueId"] = $uniqueId;
    }
    $ref = trim((string) $ref);
    if ($ref !== "" && $ref !== MAKETOU_PRODUCT_ID && maketou_looks_like_ref($ref)) {
        $prev = (int) ($accounts[$email]["refs"][$ref] ?? 0);
        $createdAt = (int) $createdAt;
        $accounts[$email]["refs"][$ref] = $createdAt > $prev ? $createdAt : $prev;
    }
}

function maketou_build_repair_queue($extraRefs = []) {
    $accounts = [];
    foreach (maketou_read_carts() as $ref => $row) {
        if (!is_array($row)) {
            continue;
        }
        maketou_account_queue_put(
            $accounts,
            $row["email"] ?? "",
            $row["uniqueId"] ?? "",
            $ref,
            $row["createdAt"] ?? 0
        );
    }
    $membersFile = maketou_members_file();
    if (is_file($membersFile)) {
        $members = json_decode((string) @file_get_contents($membersFile), true);
        if (is_array($members)) {
            foreach ($members as $email => $record) {
                if (!is_array($record)) {
                    continue;
                }
                $subscribed = !empty($record["isSubscribed"]);
                if ($subscribed) {
                    continue;
                }
                maketou_account_queue_put(
                    $accounts,
                    $record["email"] ?? $email,
                    $record["uniqueId"] ?? "",
                    $record["lastPaymentRef"] ?? "",
                    trim((string) ($record["lastPaymentRef"] ?? "")) !== "" ? 2000000000 : 0
                );
            }
        }
    }
    foreach (maketou_collect_log_cart_ids() as $ref) {
        $mapped = maketou_lookup_cart_map($ref);
        if (!is_array($mapped)) {
            continue;
        }
        maketou_account_queue_put(
            $accounts,
            $mapped["email"] ?? "",
            $mapped["uniqueId"] ?? "",
            $ref,
            $mapped["createdAt"] ?? 0
        );
    }
    foreach (maketou_supabase_repair_rows() as $row) {
        if (!is_array($row)) {
            continue;
        }
        if (!empty($row["is_subscribed"])) {
            continue;
        }
        maketou_account_queue_put(
            $accounts,
            $row["email"] ?? "",
            $row["unique_id"] ?? "",
            $row["last_payment_ref"] ?? "",
            trim((string) ($row["last_payment_ref"] ?? "")) !== "" ? 2000000000 : 0
        );
    }
    if (is_array($extraRefs)) {
        foreach ($extraRefs as $ref) {
            $mapped = maketou_lookup_cart_map($ref);
            if (!is_array($mapped)) {
                continue;
            }
            maketou_account_queue_put(
                $accounts,
                $mapped["email"] ?? "",
                $mapped["uniqueId"] ?? "",
                $ref,
                $mapped["createdAt"] ?? 0
            );
        }
    }
    $file = maketou_repair_queue_file();
    @file_put_contents($file, json_encode($accounts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    maketou_log("repair_queue", ["totalAccounts" => count($accounts)]);
    return $accounts;
}

function maketou_load_repair_queue($rebuild, $extraRefs = []) {
    $file = maketou_repair_queue_file();
    if (!$rebuild && is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded) && $decoded) {
            $first = reset($decoded);
            if (is_array($first) && isset($first["refs"])) {
                return $decoded;
            }
        }
    }
    return maketou_build_repair_queue($extraRefs);
}

function maketou_repair_paid_unactivated($limit = 6, $offset = 0, $rebuild = false, $extraRefs = []) {
    $limit = max(1, min(8, (int) $limit));
    $offset = max(0, (int) $offset);
    $queue = maketou_load_repair_queue($rebuild, $extraRefs);
    $entries = [];
    foreach ($queue as $email => $row) {
        if (!is_array($row)) {
            continue;
        }
        $email = strtolower(trim((string) $email));
        if ($email === "" || strpos($email, "@") === false) {
            continue;
        }
        $refs = [];
        if (isset($row["refs"]) && is_array($row["refs"])) {
            foreach ($row["refs"] as $ref => $createdAt) {
                $refs[] = [(string) $ref, (int) $createdAt];
            }
        }
        usort($refs, function ($a, $b) {
            return $b[1] <=> $a[1];
        });
        if (count($refs) > 8) {
            $refs = array_merge(array_slice($refs, 0, 4), array_slice($refs, -4));
        }
        if ($refs === []) {
            continue;
        }
        $newest = isset($refs[0]) ? $refs[0][1] : 0;
        $entries[] = [
            "email" => $email,
            "uniqueId" => maketou_normalize_member_id($row["uniqueId"] ?? ""),
            "refs" => $refs,
            "newest" => $newest
        ];
    }
    usort($entries, function ($a, $b) {
        return $b["newest"] <=> $a["newest"];
    });
    $total = count($entries);
    $scanned = 0;
    $paidUnactivated = 0;
    $activated = 0;
    $alreadyActive = 0;
    $skipped = 0;
    $memberIds = [];
    $sampleStatuses = [];
    $index = $offset;
    $apiBudget = 8;
    while ($index < $total && ($apiBudget > 0 || $scanned < 20)) {
        $item = $entries[$index];
        $email = $item["email"];
        $uniqueId = $item["uniqueId"];
        $state = maketou_read_subscription_state($email, $uniqueId);
        if (is_array($state) && !empty($state["active"])) {
            $alreadyActive++;
            $scanned++;
            $index++;
            if ($scanned >= 20 && $apiBudget === 8) {
                break;
            }
            continue;
        }
        if ($apiBudget <= 0) {
            break;
        }
        $foundPaid = false;
        $tried = 0;
        foreach ($item["refs"] as $refRow) {
            if ($tried >= 8 || $apiBudget <= 0) {
                break;
            }
            $ref = $refRow[0];
            $tried++;
            $apiBudget--;
            [$paid, $status, $data] = maketou_verify_ref_with_api($ref, 5);
            $statusKey = strtolower(trim((string) $status));
            if ($statusKey !== "" && count($sampleStatuses) < 8 && !in_array($statusKey, $sampleStatuses, true)) {
                $sampleStatuses[] = $statusKey;
            }
            if (!$paid) {
                continue;
            }
            if ($uniqueId === "") {
                $uniqueId = maketou_normalize_member_id(maketou_extract_unique_id($data));
            }
            $paidUnactivated++;
            $result = maketou_activate_paid_account($ref, $email, $data);
            if (is_array($result) && (trim((string) ($result["email"] ?? "")) !== "" || $uniqueId !== "")) {
                $activated++;
                $foundPaid = true;
                if ($uniqueId !== "") {
                    $memberIds[] = $uniqueId;
                }
                maketou_save_cart_map($ref, $email, $uniqueId);
            }
            maketou_log("repair_activate", [
                "ref" => $ref,
                "uniqueId" => $uniqueId,
                "status" => $status,
                "hasEmail" => true
            ]);
            break;
        }
        $scanned++;
        if (!$foundPaid) {
            $skipped++;
        }
        $index++;
    }
    $memberIds = array_values(array_unique($memberIds));
    return [
        "scannedCarts" => $scanned,
        "totalCarts" => $total,
        "alreadyActive" => $alreadyActive,
        "paidUnactivated" => $paidUnactivated,
        "activated" => $activated,
        "unpaidOrUnknown" => $skipped,
        "memberIds" => $memberIds,
        "hasMore" => $index < $total,
        "nextOffset" => $index,
        "expectedPaid" => 19,
        "licensedCloud" => maketou_supabase_licensed_count(),
        "sampleStatuses" => $sampleStatuses
    ];
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
        maketou_apply_local_subscription($email, $ref, $expiresAt, $paymentDate, $uniqueId);
        maketou_apply_supabase_subscription($email, $uniqueId, $ref, $expiresAt, $paymentDate);
    } elseif ($uniqueId !== "") {
        maketou_apply_supabase_subscription("", $uniqueId, $ref, $expiresAt, $paymentDate);
    }
    maketou_log("activate", [
        "ref" => $ref,
        "email" => $email,
        "uniqueId" => $uniqueId,
        "expiresAt" => $expiresAt
    ]);
    require_once __DIR__ . DIRECTORY_SEPARATOR . "mail-resend.php";
    if (function_exists("mail_on_paid")) {
        mail_on_paid($email, $ref);
    }
    return [
        "email" => $email,
        "expiresAt" => $expiresAt,
        "paymentDate" => $paymentDate
    ];
}

function maketou_normalize_member_id($value) {
    $value = strtoupper(trim((string) $value));
    if (preg_match("/CRASH-(\d{7})/", $value, $match)) {
        $n = (int) $match[1];
        if ($n >= 5000000 && $n <= 9999999) {
            return "CRASH-" . $match[1];
        }
    }
    if (preg_match("/^(\d{7})$/", $value, $match)) {
        $n = (int) $match[1];
        if ($n >= 5000000 && $n <= 9999999) {
            return "CRASH-" . $match[1];
        }
    }
    return "";
}

function maketou_find_member_record_by_unique_id($uniqueId) {
    $uniqueId = maketou_normalize_member_id($uniqueId);
    if ($uniqueId === "") {
        return [null, null];
    }
    $file = maketou_members_file();
    if (!is_file($file)) {
        return [null, null];
    }
    $members = json_decode((string) @file_get_contents($file), true);
    if (!is_array($members)) {
        return [null, null];
    }
    foreach ($members as $email => $record) {
        if (!is_array($record)) {
            continue;
        }
        if (maketou_normalize_member_id($record["uniqueId"] ?? "") === $uniqueId) {
            return [strtolower(trim((string) ($record["email"] ?? $email))), $record];
        }
    }
    return [null, null];
}

function maketou_credit_referral_on_payment($filleulEmail, $filleulUniqueId) {
    $filleulEmail = strtolower(trim((string) $filleulEmail));
    $filleulId = maketou_normalize_member_id($filleulUniqueId);
    $filleul = $filleulEmail !== "" ? maketou_read_local_member($filleulEmail) : null;
    $sponsorId = "";
    if (is_array($filleul)) {
        $sponsorId = maketou_normalize_member_id($filleul["referredBy"] ?? "");
    }
    if ($sponsorId === "") {
        $cloud = maketou_supabase_fetch_user($filleulEmail, $filleulId);
        if (is_array($cloud)) {
            $sponsorId = maketou_normalize_member_id($cloud["referred_by"] ?? "");
        }
    }
    if ($sponsorId === "" || ($filleulId !== "" && $sponsorId === $filleulId)) {
        return;
    }

    [$sponsorEmail, $sponsor] = maketou_find_member_record_by_unique_id($sponsorId);
    $cloudSponsor = maketou_supabase_fetch_user("", $sponsorId);
    if (($sponsorEmail === null || !is_array($sponsor)) && is_array($cloudSponsor)) {
        $sponsorEmail = strtolower(trim((string) ($cloudSponsor["email"] ?? "")));
        if ($sponsorEmail !== "" && strpos($sponsorEmail, "@") !== false) {
            $sponsor = maketou_read_local_member($sponsorEmail);
            if (!is_array($sponsor)) {
                $sponsor = [
                    "email" => $sponsorEmail,
                    "uniqueId" => $sponsorId,
                    "name" => (string) ($cloudSponsor["name"] ?? "Client"),
                    "isSubscribed" => !empty($cloudSponsor["is_subscribed"]),
                    "paymentDate" => (string) ($cloudSponsor["payment_date"] ?? ""),
                    "subscriptionExpiresAt" => (string) ($cloudSponsor["subscription_expires_at"] ?? ($cloudSponsor["vip_until"] ?? "")),
                    "vipUntil" => (string) ($cloudSponsor["vip_until"] ?? ($cloudSponsor["subscription_expires_at"] ?? "")),
                    "lastPaymentRef" => (string) ($cloudSponsor["last_payment_ref"] ?? ""),
                    "paidReferralCount" => (int) ($cloudSponsor["paid_referral_count"] ?? 0),
                    "creditedFilleuls" => []
                ];
            }
        }
    }
    if ($sponsorEmail === null || $sponsorEmail === "" || !is_array($sponsor)) {
        return;
    }
    if ($filleulEmail !== "" && strcasecmp($sponsorEmail, $filleulEmail) === 0) {
        return;
    }

    $credited = $sponsor["creditedFilleuls"] ?? [];
    if (!is_array($credited)) {
        $credited = [];
    }
    foreach ([$filleulEmail, $filleulId] as $key) {
        if ($key !== "" && in_array($key, $credited, true)) {
            return;
        }
    }
    if ($filleulEmail !== "") {
        $credited[] = $filleulEmail;
    } elseif ($filleulId !== "") {
        $credited[] = $filleulId;
    }

    $cloudCount = is_array($cloudSponsor) ? (int) ($cloudSponsor["paid_referral_count"] ?? 0) : 0;
    $count = max((int) ($sponsor["paidReferralCount"] ?? 0), $cloudCount) + 1;
    $sponsor["paidReferralCount"] = $count;
    $sponsor["creditedFilleuls"] = $credited;
    maketou_write_local_member($sponsorEmail, $sponsor);

    if ($count > 0 && $count % 2 === 0) {
        $state = maketou_collect_subscription_state($sponsorEmail, $sponsorId);
        [, $expiresAt] = maketou_next_expiry_iso($state["expiresAt"], "", "referral-" . $count);
        $paymentDate = maketou_now_iso();
        maketou_apply_local_subscription($sponsorEmail, "referral-" . $count, $expiresAt, $paymentDate);
        maketou_apply_supabase_subscription($sponsorEmail, $sponsorId, "referral-" . $count, $expiresAt, $paymentDate);
    }

    maketou_supabase_http("PATCH", "/rest/v1/users?email=eq." . rawurlencode($sponsorEmail), [
        "paid_referral_count" => $count
    ]);
}
