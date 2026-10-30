@echo off
echo ========================================================
echo        Deploying ApexPatches to Vercel...
echo ========================================================
echo.
echo Running Vercel CLI...
echo If this is your first time, Vercel will ask you to login (Email/GitHub).
echo Press Enter to accept defaults when prompted.
echo.

npx vercel --prod
pause
