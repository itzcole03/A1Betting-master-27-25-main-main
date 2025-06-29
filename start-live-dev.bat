@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting A1Betting Live Development Environment...
echo ===============================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed
    pause
    exit /b 1
)

echo ✅ All prerequisites are installed

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo ✅ Frontend dependencies installed
)

REM Create Python virtual environment if needed
if not exist "backend\venv" (
    if exist "backend\requirements.txt" (
        echo 🐍 Setting up Python virtual environment...
        cd backend
        python -m venv venv
        call venv\Scripts\activate.bat
        pip install -r requirements.txt
        cd ..
        echo ✅ Backend environment set up
    )
)

echo 🚀 Starting development servers...

REM Start backend server (FastAPI on port 8000)
echo 🔧 Starting backend server on port 8000...
cd backend
if exist "venv" (
    call venv\Scripts\activate.bat
)
start /b python main.py
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend development server
echo 🎨 Starting frontend development server...
cd frontend
start /b npm run dev
cd ..

REM Wait for servers to start
timeout /t 5 /nobreak >nul

echo.
echo 🎉 Live Development Environment is Ready!
echo =============================================
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:8000  
echo 📊 API Docs: http://localhost:8000/docs
echo 📡 Live Server: http://localhost:3001
echo.
echo 🔥 Development Features:
echo • Hot Module Replacement (HMR) enabled
echo • Real-time backend data integration
echo • Live Share ready for collaboration
echo • TypeScript type checking
echo • ESLint code quality checks
echo.
echo 🤝 Collaboration Features:
echo • Use Live Share extension for real-time collaboration
echo • Share workspace: Ctrl+Shift+P → 'Live Share: Start Collaboration Session'
echo • CodeTour available for guided code walkthroughs
echo.
echo 📝 Next Steps:
echo 1. Open VS Code in this directory
echo 2. Install recommended extensions if prompted
echo 3. Start Live Share session for collaboration
echo 4. Begin development with real-time preview
echo.
echo Press any key to open VS Code...
pause >nul

REM Open VS Code
code .

echo.
echo 🎯 Development environment is now running!
echo Keep this window open to maintain the servers.
echo Press Ctrl+C to stop all servers.
pause
