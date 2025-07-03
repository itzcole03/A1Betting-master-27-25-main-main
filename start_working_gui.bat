@echo off
title A1Betting GUI Launcher
echo Starting A1Betting GUI...
powershell -ExecutionPolicy Bypass -File "cursor_ai_gui_working.ps1"
if errorlevel 1 (
    echo Error occurred. Press any key to exit.
    pause >nul
)
