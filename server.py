import base64
import hashlib
import hmac
import json
import os
import time
import urllib.error
import urllib.request
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote

PORT = int(os.environ.get("PORT", "8080"))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
FLUTTERWAVE_VERIFY_URL = "https://api.flutterwave.com/v3/transactions/{transaction_id}/verify"
MAKETOU_API_BASE = "https://api.maketou.net"
MAKETOU_PRODUCT_ID = os.environ.get("MAKETOU_PRODUCT_ID", "9f5842bc-8ece-4012-8f24-81761d32a4b8")
ALLOWED_AMOUNTS = {
    ("XOF", 10200),
    ("USD", 17),
}


def load_env_file():
    env_path = os.path.join(DIRECTORY, ".env")
    if not os.path.isfile(env_path):
        return
    with open(env_path, "r", encoding="utf-8") as handle:
        for raw_line in handle:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def json_response(handler, status, payload):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def read_json_body(handler):
    length = int(handler.headers.get("Content-Length", "0") or 0)
    if length <= 0:
        return {}
    raw = handler.rfile.read(length)
    try:
        return json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError:
        return None


def verify_flutterwave_transaction(transaction_id, tx_ref):
    secret = os.environ.get("FLUTTERWAVE_SECRET_KEY", "").strip()
    if not secret:
        return None

    request = urllib.request.Request(
        FLUTTERWAVE_VERIFY_URL.format(transaction_id=transaction_id),
        headers={
            "Authorization": f"Bearer {secret}",
            "Content-Type": "application/json",
        },
        method="GET",
    )

    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="ignore")
        return {"verified": False, "reason": "http_error", "detail": detail[:300]}
    except urllib.error.URLError as error:
        return {"verified": False, "reason": "network_error", "detail": str(error.reason)}

    data = payload.get("data") or {}
    currency = str(data.get("currency") or "").upper()
    amount = data.get("amount")
    try:
        amount_value = int(float(amount))
    except (TypeError, ValueError):
        amount_value = None

    verified = (
        payload.get("status") == "success"
        and str(data.get("status") or "").lower() == "successful"
        and str(data.get("tx_ref") or "") == str(tx_ref)
        and (currency, amount_value) in ALLOWED_AMOUNTS
    )
    return {
        "verified": verified,
        "status": data.get("status"),
        "amount": amount,
        "currency": currency,
        "tx_ref": data.get("tx_ref"),
        "flw_ref": data.get("flw_ref"),
    }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print("[%s] %s" % (self.log_date_time_string(), format % args))

    def do_GET(self):
        path, _, query = self.path.partition("?")
        if path == "/api/health":
            json_response(self, 200, {"ok": True, "service": "crash-predictor-2026"})
            return
        if path in ("/api/maketou-status", "/api/maketou-checkout"):
            params = parse_qs(query)
            action = unquote((params.get("action") or [""])[0]).lower()
            if action == "session" or (params.get("token") and action != "verify"):
                token = unquote((params.get("token") or params.get("access_token") or [""])[0])
                session = read_maketou_token(token)
                if not session:
                    json_response(self, 401, {"status": "invalid_token", "access": False, "completed": False})
                    return
                json_response(self, 200, {
                    "status": "paid",
                    "access": True,
                    "completed": True,
                    "cartId": str(session.get("r") or ""),
                })
                return
            cart_id = unquote((params.get("ref") or params.get("cartId") or [""])[0])
            email = unquote((params.get("email") or [""])[0])
            status, payload = read_maketou_status(cart_id, email)
            json_response(self, status, payload)
            return
        super().do_GET()

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/maketou-checkout":
            body = read_json_body(self)
            if body is None:
                json_response(self, 400, {"error": "invalid_json"})
                return
            host = self.headers.get("Host", "localhost")
            proto = "https" if self.headers.get("X-Forwarded-Proto") == "https" else "http"
            status, payload = create_maketou_checkout(body, f"{proto}://{host}/")
            json_response(self, status, payload)
            return
        if path != "/api/verify-payment":
            json_response(self, 404, {"error": "not_found"})
            return

        body = read_json_body(self)
        if body is None:
            json_response(self, 400, {"verified": False, "reason": "invalid_json"})
            return

        transaction_id = str(body.get("transaction_id") or "").strip()
        tx_ref = str(body.get("tx_ref") or "").strip()
        if not transaction_id or not tx_ref:
            json_response(self, 400, {"verified": False, "reason": "missing_fields"})
            return

        result = verify_flutterwave_transaction(transaction_id, tx_ref)
        if result is None:
            json_response(self, 503, {"verified": False, "reason": "secret_key_missing"})
            return

        json_response(self, 200 if result.get("verified") else 200, result)


def maketou_api_key():
    return os.environ.get(
        "MAKETOU_API_KEY",
        "msk_34a43139cb75fcfd894088d0e618f14fda606ab398769436fb31c342842a8f37",
    ).strip()


def maketou_request(method, url, payload=None):
    secret = maketou_api_key()
    if not secret:
        return None, {"error": "secret_key_missing"}

    body = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {secret}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            raw = response.read().decode("utf-8")
            status = response.getcode()
    except urllib.error.HTTPError as error:
        raw = error.read().decode("utf-8", errors="ignore")
        status = error.code
    except urllib.error.URLError:
        return 502, {"error": "network_error"}

    try:
        data = json.loads(raw) if raw else {}
    except json.JSONDecodeError:
        data = {"error": "invalid_upstream"}
    return status, data


def create_maketou_checkout(body, host_url):
    email = str(body.get("email") or "").strip()
    first_name = str(body.get("firstName") or "").strip()
    last_name = str(body.get("lastName") or "").strip()
    phone = str(body.get("phone") or "").strip()
    unique_id = str(body.get("uniqueId") or "").strip()
    if not email or not first_name or not last_name:
        return 400, {"error": "missing_fields"}

    payload = {
        "productDocumentId": MAKETOU_PRODUCT_ID,
        "firstName": first_name,
        "lastName": last_name,
        "redirectURL": "https://crashpredictor.fr/?payment=success&status=approved",
        "meta": {
            "userId": unique_id,
            "source": "website",
        },
    }
    if phone:
        payload["phone"] = phone

    status, data = maketou_request(
        "POST",
        f"{MAKETOU_API_BASE}/api/v1/stores/cart/checkout",
        payload,
    )
    redirect_url = ""
    if isinstance(data, dict):
        redirect_url = str(data.get("redirectUrl") or data.get("redirect_url") or "")
    if not (status is not None and 200 <= int(status or 0) < 300 and redirect_url):
        local = "member"
        if "@" in email:
            local = email.split("@", 1)[0]
        local = "".join(ch for ch in local.lower() if ch.isalnum() or ch in "._+-") or "member"
        insert_at = os.urandom(1)[0] % (len(local) + 1)
        letter = chr(97 + (os.urandom(1)[0] % 26))
        payload["email"] = local[:insert_at] + letter + local[insert_at:] + "@gmail.com"
        status, data = maketou_request(
            "POST",
            f"{MAKETOU_API_BASE}/api/v1/stores/cart/checkout",
            payload,
        )
    if status is None:
        return 503, data

    redirect_url = ""
    cart_id = ""
    if isinstance(data, dict):
        redirect_url = str(data.get("redirectUrl") or data.get("redirect_url") or "")
        cart = data.get("cart") or {}
        if isinstance(cart, dict):
            cart_id = str(cart.get("id") or "")

    if 200 <= int(status or 0) < 300 and redirect_url:
        return 200, {"redirectUrl": redirect_url, "cartId": cart_id}
    return int(status or 502), {"error": "checkout_failed"}


def b64url_encode(raw):
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def b64url_decode(value):
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)


def issue_maketou_token(ref, email=""):
    payload = json.dumps(
        {
            "r": ref,
            "e": str(email or "").lower(),
            "iat": int(time.time()),
            "exp": int(time.time()) + 45 * 24 * 3600,
            "v": 1,
        },
        separators=(",", ":"),
    )
    body = b64url_encode(payload.encode("utf-8"))
    signature = hmac.new(
        maketou_api_key().encode("utf-8"),
        body.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return f"{body}.{signature}"


def read_maketou_token(token):
    token = str(token or "").strip()
    parts = token.split(".")
    if len(parts) != 2 or not parts[0] or not parts[1]:
        return None
    expected = hmac.new(
        maketou_api_key().encode("utf-8"),
        parts[0].encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    if not hmac.compare_digest(expected, parts[1]):
        return None
    try:
        data = json.loads(b64url_decode(parts[0]).decode("utf-8"))
    except (ValueError, json.JSONDecodeError, UnicodeDecodeError):
        return None
    if not isinstance(data, dict) or int(data.get("exp") or 0) < int(time.time()):
        return None
    return data


def extract_maketou_status(data):
    if not isinstance(data, dict):
        return ""
    cart = data.get("cart") if isinstance(data.get("cart"), dict) else {}
    nested = data.get("data") if isinstance(data.get("data"), dict) else {}
    for value in (
        data.get("status"),
        cart.get("status"),
        nested.get("status"),
        data.get("paymentStatus"),
        data.get("payment_status"),
    ):
        if value:
            return str(value)
    return ""


def extract_maketou_email(data):
    if not isinstance(data, dict):
        return ""
    cart = data.get("cart") if isinstance(data.get("cart"), dict) else {}
    customer = cart.get("customerInfo") if isinstance(cart.get("customerInfo"), dict) else {}
    for value in (data.get("email"), customer.get("email"), cart.get("email")):
        email = str(value or "").strip().lower()
        if "@" in email:
            return email
    return ""


def read_maketou_status(cart_id, email=""):
    if not cart_id:
        return 400, {"status": "missing_ref", "access": False, "completed": False}
    status, data = maketou_request(
        "GET",
        f"{MAKETOU_API_BASE}/api/v1/stores/cart/{cart_id}",
    )
    if status is None:
        return 502, {"status": "network_error", "access": False, "completed": False}
    cart_status = extract_maketou_status(data) if isinstance(data, dict) else ""
    paid = 200 <= int(status or 0) < 300 and cart_status.lower() in {
        "completed", "paid", "success", "successful", "approved", "succeeded"
    }
    request_email = str(email or "").strip().lower()
    if paid:
        use_email = request_email
        return 200, {
            "status": "paid",
            "access": True,
            "completed": True,
            "cartId": cart_id,
            "token": issue_maketou_token(cart_id, use_email),
        }
    if 200 <= int(status or 0) < 300:
        return 200, {
            "status": cart_status or "unpaid",
            "access": False,
            "completed": False,
            "cartId": cart_id,
        }
    return int(status or 502), {"status": "status_failed", "access": False, "completed": False}


if __name__ == "__main__":
    load_env_file()
    ThreadingHTTPServer.allow_reuse_address = True
    with ThreadingHTTPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("==================================================")
        print("CRASH PREDICTOR 2026")
        print(f"Interface : {url}")
        print("API santé : /api/health")
        print("Vérif. paiement : POST /api/verify-payment")
        print("==================================================")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nArrêt du serveur.")
