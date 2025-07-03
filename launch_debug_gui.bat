@echo off
Title A1Betting GUI - Debug Version
echo =====================================
echo A1Betting GUI Debug Launcher
echo =====================================
echo.
echo Starting debug version with full error reporting...
echo Output will be saved to debug_output.txt
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0cursor_ai_gui_final_fixed.ps1" > "%~dp0debug_output.txt" 2>&1
echo.
echo Script execution finished. Check debug_output.txt for details.
pause
