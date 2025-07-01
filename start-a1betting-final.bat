@echo off
echo.
echo ========================================
echo 🎯 A1Betting Platform Startup
echo ========================================
echo.

REM Kill any existing processes
echo 🧹 Cleaning up existing processes...
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM python.exe /T 2>nul
timeout /t 3 /nobreak >nul

REM Build React app
echo 🔨 Building React application...
node build-react-app.js
if %ERRORLEVEL% NEQ 0 (
    echo ❌ React build failed
    pause
    exit /b 1
)

echo.
echo 🚀 Starting backend service...
cd backend
start "A1Betting Backend" cmd /k ".\\venv\\Scripts\\activate && python main.py"
cd ..

echo ⏳ Waiting for backend to initialize...
timeout /t 15 /nobreak >nul

echo.
echo 🌐 Starting frontend service...
cd frontend
start "A1Betting Frontend" cmd /k "python -m http.server 3000"
cd ..

echo.
echo ========================================
echo ✅ A1Betting Platform Started!
echo ========================================
echo.
echo 🌐 Frontend (React App): http://localhost:3000/index.html
echo 🌐 Frontend (Test Page): http://localhost:3000/test.html  
echo 🔧 Backend API:          http://localhost:8000
echo 📚 API Documentation:    http://localhost:8000/docs
echo.
echo ⚠️  Note: Wait 30 seconds for all services to fully initialize
echo.
echo Press any key to open the application in your browser...
pause >nul

REM Open the application in default browser
start http://localhost:3000/index.html

echo.
echo 🎉 A1Betting Platform is now running!
echo Press CTRL+C in the service windows to stop the services.
echo. 