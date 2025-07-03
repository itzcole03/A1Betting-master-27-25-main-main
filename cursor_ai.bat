@echo off
REM Launcher for the PowerShell Cursor AI GUI Command Interface

REM Use PowerShell Core if available, fallback to Windows PowerShell
where pwsh >nul 2>nul
if %errorlevel%==0 (
    pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui.ps1"
) else (
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui.ps1"
)

echo If you see this, the batch file did not crash.
echo Press any key to exit...
pause >nul 