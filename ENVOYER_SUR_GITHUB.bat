@echo off
title Synchronisation GitHub - Crash Predictor 2026
echo ========================================================
echo   SYNCHRONISATION GITHUB - CRASH PREDICTOR 2026
echo ========================================================
echo.

set PATH=C:\Users\PC\git_portable\cmd;%PATH%

echo Verification des fichiers...
git init
git config user.name "druidlebaobab1"
git config user.email "druidlebaobab1@users.noreply.github.com"
git add .
git commit -m "Mise a jour officielle Crash Predictor 2026"
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/druidlebaobab1/crash-predictor-2026.git

echo.
echo Envoi en cours vers GitHub (https://github.com/druidlebaobab1/crash-predictor-2026.git)...
echo.
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCES : Le projet a ete envoye sur GitHub avec succes !
    echo ========================================================
) else (
    echo ========================================================
    echo   Note : Si GitHub vous demande une connexion, connectez-vous
    echo   ou utilisez votre token GitHub pour autoriser l'envoi.
    echo ========================================================
)
echo.
pause
