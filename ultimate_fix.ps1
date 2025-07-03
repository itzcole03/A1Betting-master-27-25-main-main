Write-Host "🔧 ULTIMATE GUI FIX - Replacing ALL broken scripts..." -ForegroundColor Red

# Get the working script content
$workingContent = Get-Content "cursor_ai_gui_final_fixed.ps1" -Raw

# Find and replace ALL GUI scripts
$allGuiScripts = Get-ChildItem -Path . -Recurse -Include "*cursor_ai_gui*.ps1" | Where-Object { $_.Name -ne "cursor_ai_gui_final_fixed.ps1" }

foreach ($script in $allGuiScripts) {
    Write-Host "Replacing: $($script.FullName)" -ForegroundColor Yellow
    Copy-Item $script.FullName "$($script.FullName).broken" -Force
    Set-Content -Path $script.FullName -Value $workingContent -Force
    Write-Host "✅ Replaced with working version" -ForegroundColor Green
}

# Create ultimate launcher using a here-string
$launcherContent = @"
@echo off
Title A1Betting GUI - Debug Version
echo =====================================
echo A1Betting GUI Debug Launcher
echo =====================================
echo.
echo Starting debug version with full error reporting...
echo.
powershell -ExecutionPolicy Bypass -NoExit -Command "& '%~dp0cursor_ai_gui_final_fixed.ps1'"
"@

Set-Content -Path "launch_debug_gui.bat" -Value $launcherContent -Force
Write-Host "`n✅ Created debug launcher: launch_debug_gui.bat" -ForegroundColor Green
Write-Host "🚀 Double-click 'launch_debug_gui.bat' to run the fixed GUI!" -ForegroundColor Cyan 