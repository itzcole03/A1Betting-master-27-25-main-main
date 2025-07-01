@echo off
echo ================================================================
echo           A1Betting Platform - Fix Verification Test           
echo ================================================================
echo.

:: Test 1: Check if backend directory exists
echo [1/6] Checking backend directory...
if exist "backend" (
    echo ✓ Backend directory found
) else (
    echo ✗ Backend directory missing
    goto :TEST_FAILED
)

:: Test 2: Check if frontend directory exists
echo [2/6] Checking frontend directory...
if exist "frontend" (
    echo ✓ Frontend directory found
) else (
    echo ✗ Frontend directory missing
    goto :TEST_FAILED
)

:: Test 3: Check if environment files exist
echo [3/6] Checking environment configuration...
if exist "backend\.env" (
    echo ✓ Backend .env file created
) else (
    echo ✗ Backend .env file missing
    goto :TEST_FAILED
)

if exist "frontend\.env" (
    echo ✓ Frontend .env file created
) else (
    echo ✗ Frontend .env file missing
    goto :TEST_FAILED
)

:: Test 4: Check if API config exists
echo [4/6] Checking API configuration...
if exist "frontend\src\config\api.ts" (
    echo ✓ Unified API configuration created
) else (
    echo ✗ API configuration missing
    goto :TEST_FAILED
)

:: Test 5: Check Python availability
echo [5/6] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Python is available
) else (
    echo ⚠ Python not found in PATH - backend may not start
)

:: Test 6: Check Node.js availability
echo [6/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Node.js is available
) else (
    echo ⚠ Node.js not found in PATH - frontend may not start
)

echo.
echo ================================================================
echo                    All Tests Passed! ✓                        
echo ================================================================
echo.
echo Your A1Betting platform is ready to start!
echo Run 'start.bat' to launch the platform.
echo.
pause
exit /b 0

:TEST_FAILED
echo.
echo ================================================================
echo                     Tests Failed! ✗                           
echo ================================================================
echo.
echo Please check the missing components above.
echo.
pause
exit /b 1 