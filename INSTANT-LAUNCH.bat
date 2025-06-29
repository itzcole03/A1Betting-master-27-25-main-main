@echo off
cls
echo.
echo  ╔══════════════════════════════════════════════════════════════════╗
echo  ║                A1BETTING INSTANT LAUNCHER                        ║
echo  ║                   One-Click Development                          ║
echo  ╚══════════════════════════════════════════════════════════════════╝
echo.

echo 🚀 Starting A1Betting Live Development Environment...
echo.

REM Change to the script directory
cd /d "%~dp0"

REM Launch the main automation script
echo 🎯 Launching automated development environment...
start "" "auto-launch.bat"

REM Wait a moment for servers to start
echo ⏱️  Waiting for servers to initialize...
timeout /t 15 /nobreak >nul

REM Open the builder.io-style live development interface
echo 🌐 Opening Builder.io-style Live Development Interface...
start "" "builder-live-dev.html"

echo.
echo ✅ Live development environment launched successfully!
echo 🤝 Ready for builder.io-style collaboration!
echo.
echo 📝 What's happening:
echo    • Backend server starting on port 8000
echo    • Frontend server starting on port 5173
echo    • VS Code workspace opening
echo    • Live control center opened
echo.
echo 🎯 Next: Use Live Share in VS Code for team collaboration
echo.
pause
