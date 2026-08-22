<?php
if (basename((string) ($_SERVER["SCRIPT_FILENAME"] ?? "")) === "maketou-config.php") {
    http_response_code(403);
    exit;
}

define("MAKETOU_API_KEY", "msk_11042c8d69a3df9e0ec7bffa592097e18cf6a3c9ef0d4166874d25e0d091073f");
define("MAKETOU_PRODUCT_ID", "d307c251-4302-4adf-acce-e69a8dd9951a");
define("MAKETOU_API_BASE", "https://api.maketou.net");
