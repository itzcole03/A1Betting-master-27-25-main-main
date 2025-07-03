# Save this as replace_with_working.ps1 and run it
$workingScript = Get-Content "cursor_ai_gui_working.ps1" -Raw

# Find all broken GUI scripts and replace them
$brokenScripts = Get-ChildItem -Path . -Recurse -Include "*cursor_ai_gui*.ps1" | Where-Object { $_.Name -ne "cursor_ai_gui_working.ps1" }

foreach ($script in $brokenScripts) {
    Write-Host "Replacing broken script: $($script.FullName)" -ForegroundColor Yellow
    Copy-Item $script.FullName "$($script.FullName).broken.bak" -Force
    Set-Content -Path $script.FullName -Value $workingScript -Force
    Write-Host "✅ Replaced successfully" -ForegroundColor Green
}

# Create a new batch file
$batchContent = @"
@echo off
title A1Betting GUI Launcher
echo Starting A1Betting GUI...
powershell -ExecutionPolicy Bypass -File "cursor_ai_gui_working.ps1"
if errorlevel 1 (
    echo Error occurred. Press any key to exit.
    pause >nul
)
"@

Set-Content -Path "start_working_gui.bat" -Value $batchContent -Force
Write-Host "`n✅ Created working batch file: start_working_gui.bat" -ForegroundColor Green
Write-Host "Double-click 'start_working_gui.bat' to launch the working GUI!" -ForegroundColor Cyan 