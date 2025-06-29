@echo off
cls
setlocal enabledelayedexpansion

echo.
echo  ╔══════════════════════════════════════════════════════════════════╗
echo  ║                A1BETTING AUTOMATED LIVE DEVELOPMENT              ║
echo  ║                     Zero Setup Required                          ║
echo  ╚══════════════════════════════════════════════════════════════════╝
echo.

REM Colors for output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

echo %CYAN%🚀 AUTOMATED STARTUP INITIATED...%RESET%
echo.

REM Check if we're in the right directory
if not exist "frontend" (
    echo %RED%❌ Error: frontend directory not found%RESET%
    echo %YELLOW%Please run this script from the A1Betting root directory%RESET%
    pause
    exit /b 1
)

if not exist "backend" (
    echo %RED%❌ Error: backend directory not found%RESET%
    echo %YELLOW%Please run this script from the A1Betting root directory%RESET%
    pause
    exit /b 1
)

echo %GREEN%✅ Project structure verified%RESET%

REM Kill any existing processes on our ports
echo %YELLOW%🔧 Cleaning up existing processes...%RESET%
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

REM Install frontend dependencies automatically
echo %BLUE%📦 Installing frontend dependencies...%RESET%
cd frontend
if not exist "node_modules" (
    echo %YELLOW%   Installing npm packages...%RESET%
    call npm install --silent
    if !errorlevel! neq 0 (
        echo %RED%❌ Frontend dependency installation failed%RESET%
        pause
        exit /b 1
    )
    echo %GREEN%   ✅ Frontend dependencies installed%RESET%
) else (
    echo %GREEN%   ✅ Frontend dependencies already installed%RESET%
)
cd ..

REM Setup backend environment automatically
echo %BLUE%🐍 Setting up backend environment...%RESET%
cd backend
if not exist "venv" (
    echo %YELLOW%   Creating Python virtual environment...%RESET%
    python -m venv venv
    if !errorlevel! neq 0 (
        echo %RED%❌ Failed to create virtual environment%RESET%
        pause
        exit /b 1
    )
)

echo %YELLOW%   Installing Python packages...%RESET%
call venv\Scripts\activate.bat
pip install --quiet -r requirements.txt
if !errorlevel! neq 0 (
    echo %RED%❌ Backend dependency installation failed%RESET%
    pause
    exit /b 1
)
echo %GREEN%   ✅ Backend environment ready%RESET%
cd ..

REM Start backend server
echo %BLUE%🔧 Starting backend server...%RESET%
cd backend
call venv\Scripts\activate.bat
start /min "A1Betting Backend" cmd /k "uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
cd ..

REM Wait for backend to start
echo %YELLOW%   Waiting for backend to initialize...%RESET%
timeout /t 5 /nobreak >nul

REM Start frontend server
echo %BLUE%🎨 Starting frontend server...%RESET%
cd frontend
start /min "A1Betting Frontend" cmd /c "npm run dev"
cd ..

REM Wait for frontend to start
echo %YELLOW%   Waiting for frontend to initialize...%RESET%
timeout /t 8 /nobreak >nul

REM Open VS Code workspace
echo %BLUE%📝 Opening VS Code workspace...%RESET%
start "" code "A1Betting-Live-Dev.code-workspace"

REM Wait for VS Code to load
timeout /t 3 /nobreak >nul

REM Open builder.io-style live development interface
echo %BLUE%🌐 Opening Builder.io-style Live Development Interface...%RESET%
start "" "builder-live-dev.html"

REM Open frontend in browser
echo %BLUE%🎯 Opening frontend application...%RESET%
timeout /t 2 /nobreak >nul
start "" "http://localhost:5173"

REM Display status
echo.
echo %GREEN%🎉 LIVE DEVELOPMENT ENVIRONMENT ACTIVE!%RESET%
echo.
echo  ╔══════════════════════════════════════════════════════════════════╗
echo  ║                        READY FOR COLLABORATION                   ║
echo  ╚══════════════════════════════════════════════════════════════════╝
echo.
echo %CYAN%📍 DEVELOPMENT ENDPOINTS:%RESET%
echo    🎨 Frontend:     http://localhost:5173
echo    🔧 Backend API:  http://localhost:8000
echo    📊 API Docs:     http://localhost:8000/docs
echo    📡 Live Server:  http://localhost:3001
echo.
echo %CYAN%🤝 COLLABORATION FEATURES:%RESET%
echo    • Live Share Extension: Ready for team collaboration
echo    • Real-time code editing and debugging
echo    • Shared terminals and servers
echo    • Interactive whiteboard available
echo    • CodeTour ready for guided walkthroughs
echo.
echo %YELLOW%🚀 TO START LIVE SHARE COLLABORATION:%RESET%
echo    1. In VS Code: Ctrl+Shift+P
echo    2. Type: "Live Share: Start Collaboration Session"
echo    3. Share the generated URL with your team
echo.
echo %GREEN%✨ Everything is automated - no manual setup required!%RESET%
echo.
echo %BLUE%Press any key to show live status monitoring...%RESET%
pause >nul

REM Show live status
:status_loop
cls
echo.
echo  ╔══════════════════════════════════════════════════════════════════╗
echo  ║                    LIVE DEVELOPMENT STATUS                       ║
echo  ╚══════════════════════════════════════════════════════════════════╝
echo.

REM Check frontend status
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 2 | Out-Null; Write-Host '    🟢 Frontend Server: ONLINE' -ForegroundColor Green } catch { Write-Host '    🔴 Frontend Server: OFFLINE' -ForegroundColor Red }"

REM Check backend status
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:8000/health' -UseBasicParsing -TimeoutSec 2 | Out-Null; Write-Host '    🟢 Backend Server:  ONLINE' -ForegroundColor Green } catch { Write-Host '    🔴 Backend Server:  OFFLINE' -ForegroundColor Red }"

echo.
echo %CYAN%🔄 Status updates every 10 seconds...%RESET%
echo %YELLOW%Press Ctrl+C to stop monitoring%RESET%
echo.

timeout /t 10 /nobreak >nul
goto status_loop
