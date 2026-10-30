@echo off
echo ========================================================
echo        Starting ApexPatches Local Web Server...
echo ========================================================
echo.
echo Opening website in your default browser at http://localhost:8000
echo Press Ctrl+C in this window anytime to stop the server.
echo.

start http://localhost:8000
python -m http.server 8000
pause
