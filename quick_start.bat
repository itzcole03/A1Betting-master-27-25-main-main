@echo off
echo ============================================
echo Cursor Chat History Recovery - Quick Start
echo ============================================
echo.

echo This script will help you recover lost chat history from Cursor.
echo.

echo Phase 1: Broad Search (A1Betting project keywords)
echo.
pause

python export_chats.py --keywords A1Betting betting prediction arbitrage ensemble prizepicks --days-back 30 --output phase1_broad_search.json

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error running export script. Please check:
    echo 1. Python is installed and in PATH
    echo 2. The export_chats.py file exists
    echo 3. You have access to Cursor's storage directory
    pause
    exit /b 1
)

echo.
echo Phase 1 export completed. Now cleaning and organizing the data...
echo.

node clean_history.js phase1_broad_search.json phase1_cleaned

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error running clean script. Please check:
    echo 1. Node.js is installed and in PATH
    echo 2. The clean_history.js file exists
    echo 3. The export file was created successfully
    pause
    exit /b 1
)

echo.
echo ============================================
echo Phase 1 Complete!
echo ============================================
echo.
echo Results saved to: phase1_cleaned\
echo.
echo Next steps:
echo 1. Review phase1_cleaned\summary_*.txt for an overview
echo 2. Check the highest-scoring conversations first
echo 3. If you need more specific results, run additional searches:
echo.
echo    For technical discussions:
echo    python export_chats.py --keywords react typescript python api component --days-back 21 --output phase2_technical.json
echo.
echo    For implementation details:
echo    python export_chats.py --keywords implement create build fix debug error --days-back 14 --output phase3_implementation.json
echo.
echo    For specific features:
echo    python export_chats.py --keywords authentication dashboard analytics --days-back 30 --output phase4_features.json
echo.
echo Then clean each export:
echo    node clean_history.js phase2_technical.json phase2_cleaned
echo    node clean_history.js phase3_implementation.json phase3_cleaned
echo    node clean_history.js phase4_features.json phase4_cleaned
echo.
pause 