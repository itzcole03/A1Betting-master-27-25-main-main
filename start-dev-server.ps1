# PowerShell script to start dev server without Console Ninja issues
Write-Host "Starting A1Betting Development Server..." -ForegroundColor Green
Write-Host "Disabling Console Ninja..." -ForegroundColor Yellow

$env:DISABLE_CONSOLE_NINJA = "true"
$env:CONSOLE_NINJA_DISABLE = "true"

Set-Location frontend
Write-Host "Starting Vite dev server on port 3000..." -ForegroundColor Cyan
Write-Host "Server will be available at: http://localhost:3000" -ForegroundColor Green

npx vite --host 0.0.0.0 --port 3000
