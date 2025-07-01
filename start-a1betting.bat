@echo off
echo Starting A1Betting Platform...
echo.

REM Kill any existing Node/Python processes
echo Cleaning up existing processes...
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM python.exe /T 2>nul
timeout /t 3 /nobreak >nul

REM Start Backend
echo Starting Backend on port 8000...
cd backend
start "A1Betting Backend" cmd /k ".\venv\Scripts\activate && python main.py"
cd ..
echo Waiting for backend to initialize...
timeout /t 10 /nobreak >nul

REM Start Frontend
echo Starting Frontend on port 3000...
cd frontend
start "A1Betting Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo A1Betting Platform Starting...
echo ========================================
echo Please wait 30 seconds for services to start...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo Backend Docs: http://localhost:8000/docs
echo ========================================
echo.
echo If frontend shows errors, it may need time to compile.
echo Check the opened command windows for status.
echo.
timeout /t 30 /nobreak >nul
echo.
echo Opening frontend in browser...
start http://localhost:3000
pause 