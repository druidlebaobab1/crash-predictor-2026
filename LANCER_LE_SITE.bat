@echo off
title Crash Predictor 2026
cd /d "%~dp0"
echo ==================================================
echo   LANCEMENT DU SITE CRASH PREDICTOR 2026
echo ==================================================
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    python server.py
    goto :eof
)
where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    py server.py
    goto :eof
)
echo Python introuvable : ouverture directe de index.html
start "" "%~dp0index.html"
pause
