@echo off
REM Simple Launcher for A1Betting Enhanced GUI v2.0
REM Direct launch of the enhanced PowerShell interface

echo ================================================================
echo 🚀 Starting A1Betting Enhanced GUI v2.0...
echo ================================================================
echo.
echo Features:
echo  ✨ Modern WPF interface with fallback to Windows Forms
echo  ⚡ Runspace-based background processing
echo  🔒 Enhanced security and performance monitoring
echo  🎯 A1Betting platform-specific commands
echo.
echo Please wait while the interface loads...
echo.

REM Check for PowerShell 7+ (preferred for best performance)
where pwsh >nul 2>nul
if %errorlevel%==0 (
    echo ✅ Using PowerShell 7+ for optimal performance
    pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui_enhanced.ps1"
) else (
    echo ⚠️  PowerShell 7+ not found, using Windows PowerShell
    echo    📥 Consider installing PowerShell 7+ from https://aka.ms/powershell
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui_enhanced.ps1"
)

if %errorlevel% neq 0 (
    echo.
    echo ❌ Enhanced GUI encountered an error. Exit code: %errorlevel%
    echo 📋 Check logs at: %TEMP%\cursor_ai_enhanced_*.log
    echo.
    pause
) else (
    echo.
    echo ✅ Enhanced GUI session completed successfully
    echo 📊 Check logs at: %TEMP%\cursor_ai_enhanced_*.log
)

echo.
echo Press any key to exit...
pause >nul 