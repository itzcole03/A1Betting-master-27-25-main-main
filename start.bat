@echo off
:: NOTE: This script must be run in Windows Command Prompt (cmd.exe), not PowerShell.
:: If running from PowerShell, use: cmd /c start.bat
setlocal enabledelayedexpansion
title A1Betting Platform Manager - Enhanced Production System
color 0A

:: Set working directory to script location
cd /d "%~dp0"

:: Enhanced Configuration
set BACKEND_DIR=backend
set FRONTEND_DIR=frontend
set BACKEND_PORT=8000
set FRONTEND_PORT=5173
set LOG_DIR=logs

:: Create logs directory if it doesn't exist
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

:: Test basic functionality first
echo [%date% %time%] Enhanced Platform Manager Started
echo [%date% %time%] Platform Manager Started > "%LOG_DIR%\manager.log"

if exist "%LOG_DIR%\manager.log" (
    echo ✓ Log creation successful
) else (
    echo ✗ ERROR: Cannot create log files
    pause
    exit /b 1
)

:: Check if backend directory exists
if not exist "%BACKEND_DIR%" (
    echo ✗ ERROR: Backend directory not found
    pause
    exit /b 1
)

:: Check if frontend directory exists
if not exist "%FRONTEND_DIR%" (
    echo ✗ ERROR: Frontend directory not found
    pause
    exit /b 1
)

:MAIN_MENU
cls
echo.
echo ================================================================
echo                   A1Betting Platform Manager                   
echo                    Production-Ready System                     
echo ================================================================
echo.

:: Check current service status
call :CHECK_SERVICES_STATUS

echo Current Status:
echo   Backend:  !BACKEND_STATUS!
echo   Frontend: !FRONTEND_STATUS!
echo.

echo  [1] Start Full Platform (Backend + Frontend)
echo  [2] Start Backend Only
echo  [3] Start Frontend Only
echo  [4] Health Check Dashboard
echo  [5] View System Logs
echo  [6] Stop All Services
echo  [7] System Status
echo  [0] Exit
echo.
echo ================================================================

set /p choice="Select option (0-7): "

if "%choice%"=="1" goto START_FULL_PLATFORM
if "%choice%"=="2" goto START_BACKEND
if "%choice%"=="3" goto START_FRONTEND
if "%choice%"=="4" goto HEALTH_DASHBOARD
if "%choice%"=="5" goto VIEW_LOGS
if "%choice%"=="6" goto STOP_SERVICES
if "%choice%"=="7" goto SYSTEM_STATUS
if "%choice%"=="0" goto EXIT

echo Invalid option. Please try again.
timeout /t 2 >nul
goto MAIN_MENU

:START_FULL_PLATFORM
cls
echo ================================================================
echo                    Starting Full Platform                      
echo ================================================================
echo.

echo [%date% %time%] Starting Full Platform >> "%LOG_DIR%\manager.log"

:: Step 1: Start Backend
echo [1/2] Starting Backend Server...
echo [%date% %time%] Starting Backend >> "%LOG_DIR%\backend_startup.log"

cd "%BACKEND_DIR%"
echo Starting backend on port %BACKEND_PORT%...
start "A1Betting Backend" cmd /k "python -m uvicorn main:app --host 0.0.0.0 --port %BACKEND_PORT% --reload"
cd ..

:: Step 2: Wait for backend to start
echo Waiting for backend to initialize...
timeout /t 15 /nobreak > nul

:: Step 3: Start Frontend
echo [2/2] Starting Frontend...
echo [%date% %time%] Starting Frontend >> "%LOG_DIR%\frontend_startup.log"

cd "%FRONTEND_DIR%"
echo Starting frontend on port %FRONTEND_PORT%...
start "A1Betting Frontend" cmd /k "npm run dev -- --port %FRONTEND_PORT%"
cd ..

echo.
echo ================================================================
echo SUCCESS: Full Platform Started!
echo ================================================================
echo.
echo ✓ Backend:    http://localhost:%BACKEND_PORT%
echo ✓ Frontend:   http://localhost:%FRONTEND_PORT%
echo ✓ API Docs:   http://localhost:%BACKEND_PORT%/docs
echo ✓ Health:     http://localhost:%BACKEND_PORT%/health
echo.
echo Both services are running in separate windows.
echo Close those windows to stop the services.
echo.
echo [%date% %time%] Platform startup completed >> "%LOG_DIR%\manager.log"
echo Press any key to return to main menu...
pause >nul
goto MAIN_MENU

:START_BACKEND
cls
echo ================================================================
echo                     Starting Backend Only                      
echo ================================================================
echo.

echo [%date% %time%] Starting Backend Only >> "%LOG_DIR%\manager.log"

call :START_BACKEND_INTERNAL
if !errorlevel! neq 0 (
    echo ERROR: Backend failed to start
    pause
    goto MAIN_MENU
)

echo Waiting for backend to be ready...
call :WAIT_FOR_BACKEND

echo.
echo ================================================================
echo SUCCESS: Backend Started!
echo ================================================================
echo.
echo   Backend API:  http://localhost:%BACKEND_PORT%
echo   API Docs:     http://localhost:%BACKEND_PORT%/docs  
echo   Health:       http://localhost:%BACKEND_PORT%/health
echo.
echo Press any key to return to main menu...
pause >nul
goto MAIN_MENU

:START_FRONTEND
cls
echo ================================================================
echo                    Starting Frontend Only                      
echo ================================================================
echo.

echo [%date% %time%] Starting Frontend Only >> "%LOG_DIR%\manager.log"

call :START_FRONTEND_INTERNAL

echo.
echo ================================================================
echo SUCCESS: Frontend Started!
echo ================================================================
echo.
echo   Frontend: http://localhost:%FRONTEND_PORT%
echo.
echo NOTE: Backend is not running
echo The frontend will show connection errors until backend is started.
echo.
echo Press any key to return to main menu...
pause >nul
goto MAIN_MENU

:START_BACKEND_INTERNAL
echo Starting backend service...
cd "%BACKEND_DIR%"

:: Check if main.py exists
if not exist "main.py" (
    echo ERROR: main.py not found in backend directory
    cd ..
    exit /b 1
)

:: Check for virtual environment
if exist "venv\Scripts\activate.bat" (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
    echo [%date% %time%] Virtual environment activated >> "..\%LOG_DIR%\backend.log"
) else (
    echo Using system Python (no virtual environment found)
    echo [%date% %time%] Using system Python >> "..\%LOG_DIR%\backend.log"
)

:: Check Python
python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ERROR: Python not found or not in PATH
    echo [%date% %time%] Python not found >> "..\%LOG_DIR%\backend.log"
    cd ..
    exit /b 1
)

:: Install requirements if they exist
if exist "requirements.txt" (
    echo Installing Python dependencies...
    pip install -r requirements.txt >> "..\%LOG_DIR%\backend.log" 2>&1
    if !errorlevel! neq 0 (
        echo WARNING: Some dependencies may have failed to install
        echo [%date% %time%] Dependency installation warnings >> "..\%LOG_DIR%\backend.log"
    )
)

:: Start the backend server
echo Launching FastAPI server...
echo [%date% %time%] Starting FastAPI server >> "..\%LOG_DIR%\backend.log"

start "A1Betting Backend" cmd /k "echo Starting A1Betting Backend Server... && python -m uvicorn main:app --host 0.0.0.0 --port %BACKEND_PORT% --reload"

cd ..
exit /b 0

:START_FRONTEND_INTERNAL
echo Starting frontend service...
cd "%FRONTEND_DIR%"

:: Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found in frontend directory
    cd ..
    exit /b 1
)

:: Check Node.js
node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ERROR: Node.js not found or not in PATH
    echo [%date% %time%] Node.js not found >> "..\%LOG_DIR%\frontend.log"
    cd ..
    exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo Installing Node.js dependencies... (this may take a few minutes)
    echo [%date% %time%] Installing npm dependencies >> "..\%LOG_DIR%\frontend.log"
    npm install >> "..\%LOG_DIR%\frontend.log" 2>&1
    if !errorlevel! neq 0 (
        echo ERROR: Failed to install frontend dependencies
        echo [%date% %time%] npm install failed >> "..\%LOG_DIR%\frontend.log"
        cd ..
        exit /b 1
    )
)

:: Start the frontend server
echo Launching React development server...
echo [%date% %time%] Starting React dev server >> "..\%LOG_DIR%\frontend.log"

start "A1Betting Frontend" cmd /k "echo Starting A1Betting Frontend Server... && npm run dev -- --port %FRONTEND_PORT%"

cd ..
exit /b 0

:WAIT_FOR_BACKEND
set /a counter=0
set /a max_wait=30

:BACKEND_WAIT_LOOP
echo Checking backend health... (Attempt !counter!/!max_wait!)

:: Check if port is listening
netstat -an | findstr ":%BACKEND_PORT% " | findstr "LISTENING" >nul 2>&1
if !errorlevel! equ 0 (
    :: Port is listening, check if API responds
    curl -s -f http://localhost:%BACKEND_PORT%/health >nul 2>&1
    if !errorlevel! equ 0 (
        echo Backend is ready and responding!
        exit /b 0
    ) else (
        echo Backend port is listening but API not responding yet...
    )
) else (
    echo Backend port not listening yet...
)

set /a counter+=1
if !counter! geq !max_wait! (
    echo WARNING: Backend did not become ready within !max_wait! seconds
    echo The backend may still be starting up in the background
    exit /b 1
)

timeout /t 1 >nul
goto BACKEND_WAIT_LOOP

:HEALTH_DASHBOARD
cls
title A1Betting Health Dashboard

:HEALTH_LOOP
cls
echo ================================================================
echo                     Health Check Dashboard                     
echo                   Updates every 5 seconds                     
echo ================================================================
echo.

call :CHECK_SERVICES_STATUS

echo System Health Status:
echo ================================================================
echo.

:: Backend Health Check
if "!BACKEND_STATUS!"=="[RUNNING]" (
    echo Backend Service:     !BACKEND_STATUS!
    
    :: Try to get backend health info
    curl -s http://localhost:%BACKEND_PORT%/health >nul 2>&1
    if !errorlevel! equ 0 (
        echo   API Health:      [HEALTHY]
        echo   Response:        OK
    ) else (
        echo   API Health:      [STARTING]
        echo   Response:        Not ready
    )
) else (
    echo Backend Service:     !BACKEND_STATUS!
    echo   API Health:      [UNAVAILABLE]
)

echo.

:: Frontend Health Check
if "!FRONTEND_STATUS!"=="[RUNNING]" (
    echo Frontend Service:    !FRONTEND_STATUS!
    echo   Dev Server:      [ACTIVE]
    echo   Hot Reload:      [ENABLED]
) else (
    echo Frontend Service:    !FRONTEND_STATUS!
    echo   Dev Server:      [STOPPED]
)

echo.
echo ================================================================
echo Last Updated: %date% %time%
echo.
echo [R] Refresh Now  [M] Main Menu  [Q] Quit Dashboard
echo.

choice /c RMQ /n /t 5 /d R >nul
if errorlevel 3 goto MAIN_MENU
if errorlevel 2 goto MAIN_MENU
if errorlevel 1 goto HEALTH_LOOP

:VIEW_LOGS
cls
echo ================================================================
echo                        System Logs                           
echo ================================================================
echo.

echo [1] Manager Logs
echo [2] Backend Logs
echo [3] Frontend Logs
echo [4] View All Logs
echo [5] Clear All Logs
echo [0] Back to Main Menu
echo.

set /p log_choice="Select log to view: "

if "%log_choice%"=="1" call :SHOW_LOG "manager.log" "Manager Logs"
if "%log_choice%"=="2" call :SHOW_LOG "backend.log" "Backend Logs"
if "%log_choice%"=="3" call :SHOW_LOG "frontend.log" "Frontend Logs"

if "%log_choice%"=="4" (
    echo.
    echo All System Logs:
    echo ================================================================
    for %%f in ("%LOG_DIR%\*.log") do (
        echo.
        echo --- %%~nxf ---
        if exist "%%f" (
            type "%%f"
        ) else (
            echo No log file found.
        )
        echo.
    )
)

if "%log_choice%"=="5" (
    echo Clearing all logs...
    del /q "%LOG_DIR%\*.log" 2>nul
    echo SUCCESS: All logs cleared.
)

if "%log_choice%"=="0" goto MAIN_MENU

echo.
echo Press any key to continue...
pause >nul
goto VIEW_LOGS

:SHOW_LOG
if exist "%LOG_DIR%\%~1" (
    echo.
    echo %~2:
    echo ================================================================
    type "%LOG_DIR%\%~1"
) else (
    echo.
    echo %~2:
    echo ================================================================
    echo No log file found: %~1
)
exit /b 0

:STOP_SERVICES
cls
echo ================================================================
echo                      Stopping Services                        
echo ================================================================
echo.

echo [%date% %time%] Stopping All Services >> "%LOG_DIR%\manager.log"

echo Stopping Backend services...
taskkill /f /im python.exe 2>nul
taskkill /f /im uvicorn.exe 2>nul

echo Stopping Frontend services...
taskkill /f /im node.exe 2>nul

echo Stopping related processes...
taskkill /f /im cmd.exe /fi "WINDOWTITLE eq A1Betting*" 2>nul

echo.
echo SUCCESS: All services stopped!
echo.
echo Press any key to return to main menu...
pause >nul
goto MAIN_MENU

:SYSTEM_STATUS
cls
echo ================================================================
echo                        System Status                          
echo ================================================================
echo.

call :CHECK_SERVICES_STATUS

echo Current System Status:
echo ================================================================
echo.
echo Service Status:
echo   Backend:           !BACKEND_STATUS!
echo   Frontend:          !FRONTEND_STATUS!
echo.

:: Check ports
echo Port Status:
netstat -an | findstr ":%BACKEND_PORT% " >nul 2>&1
if !errorlevel! equ 0 (
    echo   Port %BACKEND_PORT% (Backend):  [LISTENING]
) else (
    echo   Port %BACKEND_PORT% (Backend):  [CLOSED]
)

netstat -an | findstr ":%FRONTEND_PORT% " >nul 2>&1
if !errorlevel! equ 0 (
    echo   Port %FRONTEND_PORT% (Frontend): [LISTENING]
) else (
    echo   Port %FRONTEND_PORT% (Frontend): [CLOSED]
)

echo.
echo Directory Status:
if exist "%BACKEND_DIR%" (
    echo   Backend Directory: [EXISTS]
    if exist "%BACKEND_DIR%\main.py" (
        echo     main.py: [FOUND]
    ) else (
        echo     main.py: [MISSING]
    )
) else (
    echo   Backend Directory: [MISSING]
)

if exist "%FRONTEND_DIR%" (
    echo   Frontend Directory: [EXISTS]
    if exist "%FRONTEND_DIR%\package.json" (
        echo     package.json: [FOUND]
    ) else (
        echo     package.json: [MISSING]
    )
) else (
    echo   Frontend Directory: [MISSING]
)

echo.
echo Press any key to return to main menu...
pause >nul
goto MAIN_MENU

:CHECK_SERVICES_STATUS
:: Check if backend is running
tasklist | findstr "python.exe" >nul 2>&1
if !errorlevel! equ 0 (
    netstat -an | findstr ":%BACKEND_PORT% " | findstr "LISTENING" >nul 2>&1
    if !errorlevel! equ 0 (
        set BACKEND_STATUS=[RUNNING]
    ) else (
        set BACKEND_STATUS=[STARTING]
    )
) else (
    set BACKEND_STATUS=[STOPPED]
)

:: Check if frontend is running
tasklist | findstr "node.exe" >nul 2>&1
if !errorlevel! equ 0 (
    netstat -an | findstr ":%FRONTEND_PORT% " | findstr "LISTENING" >nul 2>&1
    if !errorlevel! equ 0 (
        set FRONTEND_STATUS=[RUNNING]
    ) else (
        set FRONTEND_STATUS=[STARTING]
    )
) else (
    set FRONTEND_STATUS=[STOPPED]
)

exit /b 0

:EXIT
cls
echo.
echo ================================================================
echo                        Shutting Down                          
echo ================================================================
echo.

echo [%date% %time%] Platform Manager Shutting Down >> "%LOG_DIR%\manager.log"

echo Would you like to stop all running services before exit? (Y/N)
set /p stop_choice=""

if /i "%stop_choice%"=="Y" (
    echo Stopping all services...
    taskkill /f /im python.exe 2>nul
    taskkill /f /im node.exe 2>nul
    echo SUCCESS: All services stopped.
)

echo.
echo Thank you for using A1Betting Platform Manager!
echo.
timeout /t 2 >nul
exit /b 0
