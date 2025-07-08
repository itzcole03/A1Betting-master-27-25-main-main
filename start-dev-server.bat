@echo off
echo Starting A1Betting Development Server...
echo Disabling Console Ninja...

set DISABLE_CONSOLE_NINJA=true
set CONSOLE_NINJA_DISABLE=true

cd frontend
echo Starting Vite dev server on port 3000...
npx vite --host 0.0.0.0 --port 3000

pause
