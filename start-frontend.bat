@echo off
echo 🎨 Starting A1Betting Frontend Development Server...

cd frontend

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing npm packages...
    npm install
)

REM Start Vite development server
echo 🚀 Starting Vite dev server...
npm run dev

pause
