@echo off
REM Enhanced Launcher for A1Betting Cursor AI Command Interface
REM Version: 2.0.0 | Enhanced Performance & Security

echo ========================================================================
echo 🚀 A1Betting Cursor AI Command Interface - Enhanced Launcher v2.0
echo ========================================================================
echo.
echo Select your preferred interface:
echo.
echo 1. Enhanced WPF GUI v2.0 (Recommended)
echo    ✨ Peak performance with runspaces and thread-safe collections
echo    🎨 Modern WPF interface with themes and advanced styling
echo    🔒 Enhanced security with audit trails and input validation
echo    📊 Real-time performance monitoring and intelligent recommendations
echo    🚀 A1Betting specific features (ML model check, TypeScript repair)
echo.
echo 2. Original Windows Forms GUI v1.0
echo    📋 Simple, reliable interface with basic functionality
echo    🔧 Proven stable for basic command operations
echo.
echo 3. Command Line Interface (CLI)
echo    ⚡ Fastest startup, minimal resource usage
echo    💻 Traditional menu-driven interface
echo.
echo 4. Help & Documentation
echo    📚 View enhancement details and best practices
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto enhanced_gui
if "%choice%"=="2" goto original_gui
if "%choice%"=="3" goto cli
if "%choice%"=="4" goto help
goto invalid

:enhanced_gui
echo.
echo 🚀 Starting Enhanced WPF GUI v2.0...
echo ⏱️  Initial startup may take 2-3 seconds for assembly pre-compilation...
echo.

REM Check for PowerShell 7+ (preferred for best performance)
where pwsh >nul 2>nul
if %errorlevel%==0 (
    echo ✅ Using PowerShell 7+ for optimal performance
    pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui_enhanced.ps1"
) else (
    echo ⚠️  PowerShell 7+ not found, using Windows PowerShell (reduced performance)
    echo    📥 Consider installing PowerShell 7+ from https://aka.ms/powershell
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui_enhanced.ps1"
)
goto end

:original_gui
echo.
echo 📋 Starting Original Windows Forms GUI v1.0...
echo.

where pwsh >nul 2>nul
if %errorlevel%==0 (
    pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui.ps1"
) else (
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui.ps1"
)
goto end

:cli
echo.
echo 💻 Starting Command Line Interface...
echo.

where pwsh >nul 2>nul
if %errorlevel%==0 (
    pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai.ps1"
) else (
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0cursor_ai.ps1"
)
goto end

:help
echo.
echo ========================================================================
echo 📚 A1Betting Cursor AI Interface - Enhancement Details
echo ========================================================================
echo.
echo 🚀 Enhanced WPF GUI v2.0 Features:
echo.
echo PERFORMANCE OPTIMIZATIONS:
echo   ⚡ Runspaces for background task execution (non-blocking UI)
echo   🧵 Thread-safe collections for inter-thread communication
echo   🔄 Asynchronous command processing with queue management
echo   📊 Real-time performance monitoring (memory, UI responsiveness)
echo   🎯 10 FPS UI update rate for smooth responsiveness
echo.
echo SECURITY ENHANCEMENTS:
echo   🔒 Secure configuration with execution policy enforcement
echo   📝 Comprehensive audit logging with encryption support
echo   🛡️ Input validation and sanitization
echo   🚨 Emergency stop functionality for immediate task termination
echo   🔐 Mutex-based thread-safe file operations
echo.
echo USER EXPERIENCE IMPROVEMENTS:
echo   🎨 Modern WPF interface with advanced XAML styling
echo   🌈 Multiple theme support (Cyberpunk, Professional, HighContrast)
echo   📱 Responsive design with intelligent layout adaptation
echo   💡 Intelligent recommendation engine with urgency prioritization
echo   🏷️ Categorized command tabs with icons and tooltips
echo   📈 Real-time status updates and progress tracking
echo.
echo A1BETTING SPECIFIC FEATURES:
echo   🧮 ML model accuracy verification (96.4%% target monitoring)
echo   🔨 TypeScript error repair (26,797→^<100 goal tracking)
echo   🎲 PrizePicks API integration health monitoring
echo   📊 Betting analytics and performance metrics (73.8%% win rate)
echo   🚀 Enhanced autonomous mode with recursive development
echo   🎯 Project-specific recommendations based on memory bank analysis
echo.
echo ACCESSIBILITY ^& DEPLOYMENT:
echo   ♿ High contrast theme for accessibility compliance
echo   🌍 Preparation for localization support
echo   📦 Modular architecture for easy maintenance
echo   🔧 Comprehensive error handling and recovery mechanisms
echo   📋 Detailed logging for troubleshooting and audit purposes
echo.
echo SYSTEM REQUIREMENTS:
echo   💻 Windows 10/11 (PowerShell 5.1+ required, 7+ recommended)
echo   🧠 Minimum 4GB RAM (8GB recommended for large projects)
echo   💾 50MB disk space for logs and temporary files
echo   🖥️  Minimum 1200x800 screen resolution
echo.
echo For technical documentation, see: docs/cursor-background-agents-guide.md
echo For best practices, see: docs/best_practices.txt
echo.
pause
goto start

:invalid
echo ❌ Invalid choice. Please enter 1, 2, 3, or 4.
echo.
goto start

:start
goto :eof

:end
echo.
echo 🏁 Session completed. Thank you for using A1Betting Cursor AI Interface!
echo 📊 Check logs at: %TEMP%\cursor_ai_enhanced_*.log
echo.
pause 