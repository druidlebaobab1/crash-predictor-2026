<?php
// CRASH PREDICTOR 2026 - CHARGEMENT DIRECT DU SITE
header("Cache-Control: no-cache, must-revalidate");
include_once(__DIR__ . '/index.html');
exit();
?>
