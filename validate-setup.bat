@echo off
cls
echo.
echo  ╔══════════════════════════════════════════════════════════════════╗
echo  ║                A1BETTING SETUP VALIDATION                        ║
echo  ║                   System Check                                   ║
echo  ╚══════════════════════════════════════════════════════════════════╝
echo.

echo 🔍 Checking system prerequisites...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js from https://nodejs.org/
    echo.
) else (
    echo ✅ Node.js found
    node --version
)

REM Check if Python is installed
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python from https://python.org/
    echo.
) else (
    echo ✅ Python found
    python --version
)

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install Node.js from https://nodejs.org/
    echo.
) else (
    echo ✅ npm found
    npm --version
)

REM Check if pip is installed
where pip >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip not found. Please install Python from https://python.org/
    echo.
) else (
    echo ✅ pip found
    pip --version
)

echo.
echo 📁 Checking project structure...

if exist "frontend" (
    echo ✅ Frontend directory found
) else (
    echo ❌ Frontend directory not found
)

if exist "backend" (
    echo ✅ Backend directory found
) else (
    echo ❌ Backend directory not found
)

if exist "frontend\package.json" (
    echo ✅ Frontend package.json found
) else (
    echo ❌ Frontend package.json not found
)

if exist "backend\requirements.txt" (
    echo ✅ Backend requirements.txt found
) else (
    echo ❌ Backend requirements.txt not found
)

if exist "backend\main.py" (
    echo ✅ Backend main.py found
) else (
    echo ❌ Backend main.py not found
)

echo.
echo 🎯 Checking automation files...

if exist "auto-launch.bat" (
    echo ✅ Auto-launch script found
) else (
    echo ❌ Auto-launch script not found
)

if exist "INSTANT-LAUNCH.bat" (
    echo ✅ Instant launch script found
) else (
    echo ❌ Instant launch script not found
)

if exist "live-control-center.html" (
    echo ✅ Live control center found
) else (
    echo ❌ Live control center not found
)

if exist ".vscode\tasks.json" (
    echo ✅ VS Code tasks configured
) else (
    echo ❌ VS Code tasks not configured
)

if exist ".vscode\settings.json" (
    echo ✅ VS Code settings configured
) else (
    echo ❌ VS Code settings not configured
)

echo.
echo 🚀 Setup validation complete!
echo.
echo 📋 To start development:
echo    Option 1: Double-click INSTANT-LAUNCH.bat
echo    Option 2: Run "Auto Launch Development Environment" task in VS Code
echo    Option 3: Run auto-launch.bat directly
echo.
pause
