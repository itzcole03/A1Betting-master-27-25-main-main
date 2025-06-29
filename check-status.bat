@echo off
echo ========================================
echo  A1Betting System Status Check
echo ========================================
echo.

cd /d "%~dp0\backend"

echo 🔍 Checking Backend Status...
echo.

echo Directory: %CD%
echo.

echo Files in backend directory:
dir /b *.py | findstr /E ".py"
echo.

echo Virtual Environment Status:
if exist "venv\Scripts\python.exe" (
    echo ✅ Virtual environment exists
    echo Python version in venv:
    venv\Scripts\python.exe --version
) else (
    echo ❌ Virtual environment not found
)
echo.

echo Checking Backend Dependencies:
if exist "venv\Scripts\python.exe" (
    echo FastAPI status:
    venv\Scripts\python.exe -c "import fastapi; print('✅ FastAPI installed')" 2>nul || echo "❌ FastAPI not installed"
    
    echo Uvicorn status:
    venv\Scripts\python.exe -c "import uvicorn; print('✅ Uvicorn installed')" 2>nul || echo "❌ Uvicorn not installed"
    
    echo.
    echo Other key dependencies:
    venv\Scripts\python.exe -c "import requests; print('✅ Requests installed')" 2>nul || echo "❌ Requests not installed"
    venv\Scripts\python.exe -c "import httpx; print('✅ HTTPX installed')" 2>nul || echo "❌ HTTPX not installed"
)
echo.

echo 🌐 Checking Network Ports...
echo.
echo Port 8000 (Backend):
netstat -ano | findstr :8000 | findstr LISTENING >nul && echo "✅ Backend running on port 8000" || echo "❌ Backend not running on port 8000"

echo Port 5173 (Frontend):
netstat -ano | findstr :5173 | findstr LISTENING >nul && echo "✅ Frontend running on port 5173" || echo "❌ Frontend not running on port 5173"

echo.
echo 🧪 Testing Backend Health...
echo.

if exist "venv\Scripts\python.exe" (
    echo Running simple health check...
    venv\Scripts\python.exe -c "
import sys
sys.path.append('.')
try:
    import requests
    response = requests.get('http://localhost:8000/health', timeout=5)
    if response.status_code == 200:
        print('✅ Backend health check passed')
        print(f'Response: {response.json()}')
    else:
        print(f'❌ Backend health check failed: {response.status_code}')
except requests.exceptions.ConnectionError:
    print('❌ Backend not responding (connection refused)')
except Exception as e:
    print(f'❌ Health check error: {e}')
" 2>nul
)

echo.
echo 📊 System Summary:
echo ========================================
echo Backend Directory: %CD%
echo Virtual Environment: 
if exist "venv\Scripts\python.exe" (echo "  ✅ Available") else (echo "  ❌ Missing")
echo.
echo 💡 Next Steps:
echo   1. If venv is missing: python -m venv venv
echo   2. Activate venv: venv\Scripts\activate.bat
echo   3. Install deps: pip install -r requirements.txt
echo   4. Start backend: python simple_healthy_backend.py
echo.
pause
