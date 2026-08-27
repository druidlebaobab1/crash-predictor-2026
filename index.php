<?php
// CRASH PREDICTOR 2026 - CHARGEMENT DIRECT DU SITE
$maketouAction = (string) ($_GET["action"] ?? "");
if (in_array($maketouAction, ["maketou_checkout", "maketou_verify", "maketou_session"], true)) {
    require __DIR__ . "/maketou-checkout.php";
    exit();
}
if ($maketouAction === "maketou_status") {
    require __DIR__ . "/maketou-status.php";
    exit();
}
if ($maketouAction === "maketou_webhook") {
    require __DIR__ . "/maketou-webhook.php";
    exit();
}
if ($maketouAction === "maketou_repair") {
    require __DIR__ . "/maketou-repair.php";
    exit();
}
if ($maketouAction === "member_account") {
    require __DIR__ . "/member-account.php";
    exit();
}

$paymentHint = strtolower((string) ($_GET["payment"] ?? ""));
$statusHint = strtolower((string) ($_GET["status"] ?? ""));
$maketouHint = strtolower((string) ($_GET["maketou"] ?? ""));
if (
    $paymentHint === "success"
    || in_array($statusHint, ["approved", "success", "completed"], true)
    || $maketouHint === "success"
) {
    require_once __DIR__ . "/maketou-config.php";
    maketou_recover_paid_return($_GET);
}

header("Cache-Control: no-cache, must-revalidate");

$geoCountry = strtoupper((string) (
    $_SERVER["HTTP_CF_IPCOUNTRY"]
    ?? $_SERVER["HTTP_X_VERCEL_IP_COUNTRY"]
    ?? $_SERVER["HTTP_X_COUNTRY_CODE"]
    ?? $_SERVER["GEOIP_COUNTRY_CODE"]
    ?? $_SERVER["HTTP_X_APPENGINE_COUNTRY"]
    ?? ""
));
if ($geoCountry === "XX" || $geoCountry === "T1") {
    $geoCountry = "";
}

ob_start();
include_once(__DIR__ . "/index.html");
$html = ob_get_clean();
$geoScript = "<script>window.__GEO_COUNTRY=" . json_encode($geoCountry) . ";</script>";
if (strpos($html, "<!-- End Meta Pixel Code -->") !== false) {
    $html = str_replace("<!-- End Meta Pixel Code -->", "<!-- End Meta Pixel Code -->" . $geoScript, $html);
} else {
    $html = preg_replace("/<head>/i", "<head>" . $geoScript, $html, 1);
}
echo $html;
exit();
?>
