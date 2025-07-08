@echo off
echo ===== A1Betting Dev Server Diagnostics =====
echo.

echo Checking Node.js version...
node --version
echo.

echo Checking npm version...
npm --version
echo.

echo Changing to frontend directory...
cd frontend
echo Current directory: %cd%
echo.

echo Checking if node_modules exists...
if exist node_modules (
    echo ✅ node_modules found
) else (
    echo ❌ node_modules not found - running npm install...
    npm install
)
echo.

echo Checking package.json scripts...
npm run
echo.

echo Attempting to start Vite server...
echo Starting on port 3001...
npm run dev-simple

pause
