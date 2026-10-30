@echo off
echo ========================================================
echo        Pushing code to GitHub (patches-website)...
echo ========================================================
echo.

git branch -M main
git push -u origin main

echo.
echo ========================================================
echo If successful, refresh your GitHub page to see all files!
echo Next: Go to Vercel and Import this repository.
echo ========================================================
pause
