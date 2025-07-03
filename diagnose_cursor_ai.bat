@echo off

set DIAG_LOG=%TEMP%\cursor_ai_diagnostic_log.txt
if exist "%DIAG_LOG%" del "%DIAG_LOG%"

echo === Cursor AI Diagnostic Tool Starting === >> "%DIAG_LOG%"
echo Timestamp: %DATE% %TIME% >> "%DIAG_LOG%"
echo Running diagnostics for cursor_ai.bat and cursor_ai.ps1 >> "%DIAG_LOG%"
echo. >> "%DIAG_LOG%"

echo Checking for PowerShell 7+ (pwsh)... >> "%DIAG_LOG%"
where pwsh >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: PowerShell 7+ (pwsh) not found. >> "%DIAG_LOG%"
    echo Please install PowerShell 7+ from https://aka.ms/powershell >> "%DIAG_LOG%"
    echo Diagnostic failed due to missing PowerShell. >> "%DIAG_LOG%"
    echo Press any key to exit...
    pause >nul
    exit /b 1
)
echo PowerShell 7+ (pwsh) found. >> "%DIAG_LOG%"

echo Diagnostics complete. Please check the log file at %DIAG_LOG% for results.
echo This window will remain open for 30 seconds or until you press a key...
timeout /t 30 /nobreak >nul
pause >nul 