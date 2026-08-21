import json
import os
import urllib.error
import urllib.request
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("PORT", "8080"))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
FLUTTERWAVE_VERIFY_URL = "https://api.flutterwave.com/v3/transactions/{transaction_id}/verify"
ALLOWED_AMOUNTS = {
    ("XOF", 30000),
    ("USD", 50),
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
        if self.path.split("?", 1)[0] == "/api/health":
            json_response(self, 200, {"ok": True, "service": "crash-predictor-2026"})
            return
        super().do_GET()

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/verify-payment":
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
