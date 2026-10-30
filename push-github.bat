@echo off
echo ========================================================
echo        Pushing latest code to GitHub...
echo ========================================================
echo.

git add .
set /p commit_msg="Enter commit message (or press Enter for 'Auto update'): "
if "%commit_msg%"=="" set commit_msg=Auto update website

git commit -m "%commit_msg%"
git push origin master
if %errorlevel% neq 0 (
    git push origin main
)

echo.
echo ========================================================
echo Done! GitHub will now automatically trigger Vercel deploy.
echo ========================================================
pause
