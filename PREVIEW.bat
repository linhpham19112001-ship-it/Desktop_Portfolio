@echo off
rem ===========================================================
rem  Double-click this to preview the site.
rem  Uses Node for a real local server when it is installed,
rem  and falls back to opening the file directly when it is not.
rem ===========================================================

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel%==0 goto server

echo.
echo   Node was not found, opening the page directly instead.
echo   ^(Everything works this way too — the server is just closer
echo    to how it will behave once deployed.^)
echo.
start "" "%~dp0index.html"
timeout /t 3 >nul
exit /b

:server
echo.
echo   Starting local preview on http://localhost:5173
echo   Leave this window open. Close it to stop the server.
echo.
start "" "http://localhost:5173"
node "%~dp0tools\serve.js" 5173
pause
