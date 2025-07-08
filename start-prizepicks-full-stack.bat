@echo off
echo ================================================================
echo 🚀 A1BETTING PRIZEPICKS FULL STACK STARTUP
echo ================================================================
echo Starting Backend (FastAPI) + Frontend (React) concurrently...
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:8173
echo ================================================================

REM Set window title
title A1Betting PrizePicks Full Stack

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Python is not installed or not in PATH
    echo Please install Python 3.11+ and try again
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ and try again
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm is not installed or not in PATH
    echo Please install npm and try again
    pause
    exit /b 1
)

echo ✅ Dependencies check passed!
echo.

REM Create logs directory if it doesn't exist
if not exist logs mkdir logs

REM Function to install backend dependencies
echo 📦 Checking backend dependencies...
cd backend
if not exist ".venv" (
    echo 🔧 Creating Python virtual environment...
    python -m venv .venv
)

echo 🔧 Activating virtual environment...
call .venv\Scripts\activate.bat

echo 📦 Installing/updating Python dependencies...
pip install --upgrade pip
pip install -r requirements.txt

echo ✅ Backend dependencies ready!
cd ..

REM Function to install frontend dependencies  
echo 📦 Checking frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo 🔧 Installing Node.js dependencies...
    npm install
) else (
    echo ✅ Frontend dependencies already installed
)
cd ..

echo.
echo 🎯 Starting services...
echo ================================================================

REM Start backend in new window
echo 🚀 Starting Backend (FastAPI)...
start "A1Betting Backend" cmd /k "cd backend && call .venv\Scripts\activate.bat && echo ⚡ Backend Server Starting... && echo Backend URL: http://localhost:8000 && echo API Docs: http://localhost:8000/docs && echo Health Check: http://localhost:8000/api/health/all && echo PrizePicks API: http://localhost:8000/api/prizepicks/comprehensive-projections && echo. && python main.py"

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend in new window
echo 🚀 Starting Frontend (React)...
start "A1Betting Frontend" cmd /k "cd frontend && echo ⚡ Frontend Server Starting... && echo Frontend URL: http://localhost:8173 && echo PrizePicks Page: http://localhost:8173#prizepicks && echo. && npm run dev"

REM Wait a moment for frontend to start
timeout /t 3 /nobreak >nul

echo.
echo ================================================================
echo ✅ BOTH SERVICES STARTED SUCCESSFULLY!
echo ================================================================
echo.
echo 🌐 Frontend (React):     http://localhost:8173
echo 🎯 PrizePicks Page:      http://localhost:8173#prizepicks
echo.
echo ⚡ Backend (FastAPI):    http://localhost:8000  
echo 📚 API Documentation:   http://localhost:8000/docs
echo 💚 Health Check:        http://localhost:8000/api/health/all
echo 🎲 PrizePicks API:      http://localhost:8000/api/prizepicks/comprehensive-projections
echo.
echo ================================================================
echo 🔧 DEVELOPMENT TOOLS:
echo ================================================================
echo 📊 Real-time Logs:      Check the backend/frontend console windows
echo 🐛 Debug Mode:          Backend runs with auto-reload
echo 🔄 Hot Reload:          Frontend has live reload enabled
echo 📱 Network Access:      Both services accessible on local network
echo.
echo ================================================================
echo 🧪 TESTING PRIZEPICKS INTEGRATION:
echo ================================================================
echo 1. Wait for both services to fully start (usually 10-30 seconds)
echo 2. Open http://localhost:8173#prizepicks
echo 3. Check if real PrizePicks data loads
echo 4. If you see "Loading..." or errors, check backend logs
echo 5. Backend logs will show API calls and data fetching status
echo.
echo ✨ Expected behavior:
echo   - Real PrizePicks projections from 30+ sports
echo   - Dynamic filters populated from live data  
echo   - ML predictions with confidence scores
echo   - SHAP explanations for AI transparency
echo   - Kelly optimization for bet sizing
echo.
echo ================================================================
echo 🚀 READY FOR TESTING!
echo ================================================================
echo.
echo Press any key to open the PrizePicks page in your browser...
pause >nul

REM Open the PrizePicks page in default browser
start http://localhost:8173#prizepicks

echo.
echo 🎉 Browser opened! Check the PrizePicks page for real data.
echo.
echo To stop both services:
echo 1. Close the backend console window (or Ctrl+C)
echo 2. Close the frontend console window (or Ctrl+C)
echo.
echo 📝 Note: Keep this window open to see the startup summary.
echo ================================================================

pause
