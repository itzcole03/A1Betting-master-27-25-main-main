@echo off
echo 🐍 Starting A1Betting Backend Server...

cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo ❌ Failed to create virtual environment
        pause
        exit /b 1
    )
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing Python packages...
pip install --upgrade pip
pip install -r requirements.txt

REM Start the server with uvicorn
echo 🚀 Starting FastAPI server with uvicorn...
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

pause
