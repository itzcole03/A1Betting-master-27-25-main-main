@echo off
setlocal enabledelayedexpansion

REM ====== Advanced Context-Aware Recommendations (from progress.md) ======
set "RECOMMEND="
set "MULTISTEP="
set "MARK6="
set "MARK13="
set "MARK14="
set "MARK5="
set "MARK8="
set "MARK9="
set "MARK12="
set "MARK3="
set "MARK2="
REM Parse memory-bank/progress.md for context
if exist memory-bank\progress.md (
    for /f "delims=" %%a in ('findstr /i "TypeScript Errors" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!TypeScript error reduction in progress. Suggest: typescript repair, autonomous mode. "
        set "MULTISTEP=!MULTISTEP!typescript repair autonomous mode "
        set "MARK6=>>"
        set "MARK13=>>"
    )
    for /f "delims=" %%a in ('findstr /i "testing framework available" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!Testing coverage is a short-term goal. Suggest: test implementation. "
        set "MULTISTEP=!MULTISTEP!test implementation "
        set "MARK14=>>"
    )
    for /f "delims=" %%a in ('findstr /i "performance optimization" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!Performance/build optimization in progress. Suggest: performance check, build optimization. "
        set "MULTISTEP=!MULTISTEP!performance check build optimization "
        set "MARK8=>>"
        set "MARK9=>>"
    )
    for /f "delims=" %%a in ('findstr /i "build system enhancement" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!Build system enhancement in progress. Suggest: build optimization. "
        set "MULTISTEP=!MULTISTEP!build optimization "
        set "MARK9=>>"
    )
    for /f "delims=" %%a in ('findstr /i "memory bank auto-updates" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!Memory bank auto-updates in progress. Suggest: update memory. "
        set "MULTISTEP=!MULTISTEP!update memory "
        set "MARK3=>>"
    )
    for /f "delims=" %%a in ('findstr /i "multi-agent coordination" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!Multi-agent coordination active. Suggest: agent mode, autonomous mode. "
        set "MULTISTEP=!MULTISTEP!agent autonomous mode "
        set "MARK2=>>"
        set "MARK13=>>"
    )
    for /f "delims=" %%a in ('findstr /i "system health" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!System health monitoring active. Suggest: system health. "
        set "MULTISTEP=!MULTISTEP!system health "
        set "MARK12=>>"
    )
    for /f "delims=" %%a in ('findstr /i "check progress" memory-bank\progress.md') do (
        set "RECOMMEND=!RECOMMEND!Progress tracking active. Suggest: check progress. "
        set "MULTISTEP=!MULTISTEP!check progress "
        set "MARK5=>>"
    )
)
if not defined RECOMMEND set "RECOMMEND=No urgent recommendations."
if not defined MULTISTEP set "MULTISTEP=No recommended commands."

REM ====== Usage Logging ======
set "LOGFILE=cursor_ai_usage.log"
echo [%date% %time%] Menu loaded. Recommendations: !RECOMMEND! >> %LOGFILE%

:MENU
cls
REM ====== Display Context-Aware Recommendations ======
echo ========================================
echo CURSOR AI - Command Guide
echo ========================================
echo.
echo Recommendations:
echo !RECOMMEND!
echo.
echo  1. Plan Mode
set cmd1=plan
echo  2. %MARK2% Agent Mode
set cmd2=agent
echo  3. %MARK3% Update Memory
set cmd3=update memory
echo  4. Review Context
set cmd4=review context
echo  5. %MARK5% Check Progress
set cmd5=check progress
echo  6. %MARK6% TypeScript Repair
set cmd6=typescript repair
echo  7. Security Audit
set cmd7=security audit
echo  8. %MARK8% Performance Check
set cmd8=performance check
echo  9. %MARK9% Build Optimization
set cmd9=build optimization
echo 10. ML Model Check
set cmd10=ml model check
echo 11. Memory Status
set cmd11=memory status
echo 12. %MARK12% System Health
set cmd12=system health
echo 13. %MARK13% AUTONOMOUS MODE
set cmd13=autonomous mode
echo 14. %MARK14% Test Implementation
set cmd14=test implementation
echo 15. %MARK15% Error Handling
set cmd15=error handling
echo 16. TypeScript Types
set cmd16=typescript types
echo 17. Ultimate Enhancement Cycle
set cmd17=multi17
echo 18. Run Audit Report
set cmd18=run audit report
echo 19. Lint
set cmd19=lint
echo 20. Format
set cmd20=format
echo 21. Dependency Audit
set cmd21=dependency audit
echo 22. Generate Docs
set cmd22=generate docs
echo 23. Custom Command
set cmd23=custom command
echo 24. Show Documentation
set cmd24=show documentation
echo 25. Run All Commands (Batch)
set cmd25=multi25
echo 26. Copy All Recommended Commands
set cmd26=multistep
echo.
set /p opt="Select an option (1-26, 0 to exit): "

REM ====== Log Selection ======
set "cmd=!cmd%opt%!"
echo [%date% %time%] Selected option: %opt% Command: !cmd! >> %LOGFILE%

if "%opt%"=="0" exit
if "%opt%"=="1"  call :show "%cmd1%"
if "%opt%"=="2"  call :show "%cmd2%"
if "%opt%"=="3"  call :show "%cmd3%"
if "%opt%"=="4"  call :show "%cmd4%"
if "%opt%"=="5"  call :show "%cmd5%"
if "%opt%"=="6"  call :show "%cmd6%"
if "%opt%"=="7"  call :show "%cmd7%"
if "%opt%"=="8"  call :show "%cmd8%"
if "%opt%"=="9"  call :show "%cmd9%"
if "%opt%"=="10" call :show "%cmd10%"
if "%opt%"=="11" call :show "%cmd11%"
if "%opt%"=="12" call :show "%cmd12%"
if "%opt%"=="13" call :show "%cmd13%"
if "%opt%"=="14" call :show "%cmd14%"
if "%opt%"=="15" call :show "%cmd15%"
if "%opt%"=="16" call :show "%cmd16%"
if "%opt%"=="17" call :showmulti17
if "%opt%"=="18" call :show "%cmd18%"
if "%opt%"=="19" call :show "%cmd19%"
if "%opt%"=="20" call :show "%cmd20%"
if "%opt%"=="21" call :show "%cmd21%"
if "%opt%"=="22" call :show "%cmd22%"
if "%opt%"=="23" call :showcustom
if "%opt%"=="24" call :showdoc
if "%opt%"=="25" call :showmulti25
if "%opt%"=="26" call :showmultistep
goto MENU

:show
cls
echo ========================================
echo Command to feed to Cursor AI Copilot:
echo.
echo     %~1
echo.
pause
goto MENU

:showmulti17
cls
echo ========================================
echo Multi-step commands to feed to Cursor AI Copilot:
echo.
echo     plan
echo     agent
echo     test implementation
echo     typescript repair
echo     security audit
echo     performance check
echo     build optimization
echo     ml model check
echo     memory status
echo     system health
echo     run audit report
echo.
pause
goto MENU

:showmulti25
cls
echo ========================================
echo Multi-step commands to feed to Cursor AI Copilot:
echo.
echo     plan
echo     agent
echo     update memory
echo     review context
echo     check progress
echo     typescript repair
echo     security audit
echo     performance check
echo     build optimization
echo     ml model check
echo     memory status
echo     system health
echo     autonomous mode
echo     test implementation
echo     error handling
echo     typescript types
echo     plan
echo     agent
echo     test implementation
echo     typescript repair
echo     security audit
echo     performance check
echo     build optimization
echo     ml model check
echo     memory status
echo     system health
echo     run audit report
echo     run audit report
echo     lint
echo     format
echo     dependency audit
echo     generate docs
echo.
pause
goto MENU

:showmultistep
cls
echo ========================================
echo Recommended commands to feed to Cursor AI Copilot:
echo.
if "%MULTISTEP%"=="No recommended commands." (
    echo     No recommended commands.
) else (
    for %%c in (!MULTISTEP!) do echo     %%c
)
echo.
pause
goto MENU

:showcustom
cls
echo ========================================
echo Custom commands from custom_commands.txt:
echo.
if not exist custom_commands.txt (
    echo custom_commands.txt not found.
) else (
    type custom_commands.txt
)
echo.
pause
goto MENU

:showdoc
cls
echo ========================================
echo Documentation:
echo.
if not exist docs\best_practices.txt (
    echo docs\best_practices.txt not found.
) else (
    type docs\best_practices.txt
)
echo.
pause
goto MENU 