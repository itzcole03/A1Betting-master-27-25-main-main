# A1Betting PrizePicks Full Stack Startup Script
# PowerShell version for Windows/cross-platform support

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "🚀 A1BETTING PRIZEPICKS FULL STACK STARTUP" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Starting Backend (FastAPI) + Frontend (React) concurrently..." -ForegroundColor White
Write-Host "Backend will run on: http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend will run on: http://localhost:8173" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan

# Set console title
$Host.UI.RawUI.WindowTitle = "A1Betting PrizePicks Full Stack"

# Function to check if command exists
function Test-Command($command) {
    try {
        Get-Command $command -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Check dependencies
Write-Host "🔍 Checking dependencies..." -ForegroundColor Yellow

if (-not (Test-Command "python")) {
    Write-Host "❌ ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.11+ and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Command "node")) {
    Write-Host "❌ ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ ERROR: npm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install npm and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Dependencies check passed!" -ForegroundColor Green
Write-Host ""

# Create logs directory if it doesn't exist
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

# Setup backend
Write-Host "📦 Setting up backend..." -ForegroundColor Yellow
Set-Location "backend"

if (-not (Test-Path ".venv")) {
    Write-Host "🔧 Creating Python virtual environment..." -ForegroundColor Blue
    python -m venv .venv
}

Write-Host "🔧 Activating virtual environment..." -ForegroundColor Blue
if ($IsWindows -or $PSVersionTable.Platform -eq "Win32NT" -or [System.Environment]::OSVersion.Platform -eq "Win32NT") {
    & ".venv\Scripts\Activate.ps1"
} else {
    & ".venv/bin/Activate.ps1"
}

Write-Host "📦 Installing/updating Python dependencies..." -ForegroundColor Blue
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

Write-Host "✅ Backend dependencies ready!" -ForegroundColor Green
Set-Location ".."

# Setup frontend
Write-Host "📦 Setting up frontend..." -ForegroundColor Yellow
Set-Location "frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "🔧 Installing Node.js dependencies..." -ForegroundColor Blue
    npm install
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

Set-Location ".."

Write-Host ""
Write-Host "🎯 Starting services..." -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan

# Start backend
Write-Host "🚀 Starting Backend (FastAPI)..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Set-Location "backend"
    if ($IsWindows -or $PSVersionTable.Platform -eq "Win32NT" -or [System.Environment]::OSVersion.Platform -eq "Win32NT") {
        & ".venv\Scripts\python.exe" "main.py"
    } else {
        & ".venv/bin/python" "main.py"
    }
}

# Wait for backend to start
Start-Sleep -Seconds 5

# Start frontend
Write-Host "🚀 Starting Frontend (React)..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Set-Location "frontend"
    npm run dev
}

# Wait for frontend to start
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "✅ BOTH SERVICES STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Frontend (React):     http://localhost:8173" -ForegroundColor Green
Write-Host "🎯 PrizePicks Page:      http://localhost:8173#prizepicks" -ForegroundColor Green
Write-Host ""
Write-Host "⚡ Backend (FastAPI):    http://localhost:8000" -ForegroundColor Green
Write-Host "📚 API Documentation:   http://localhost:8000/docs" -ForegroundColor Green
Write-Host "💚 Health Check:        http://localhost:8000/api/health/all" -ForegroundColor Green
Write-Host "🎲 PrizePicks API:      http://localhost:8000/api/prizepicks/comprehensive-projections" -ForegroundColor Green
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "🔧 DEVELOPMENT TOOLS:" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "📊 Real-time Logs:      Use Get-Job and Receive-Job to check logs" -ForegroundColor White
Write-Host "🐛 Debug Mode:          Backend runs with auto-reload" -ForegroundColor White
Write-Host "🔄 Hot Reload:          Frontend has live reload enabled" -ForegroundColor White
Write-Host "📱 Network Access:      Both services accessible on local network" -ForegroundColor White
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "🧪 TESTING PRIZEPICKS INTEGRATION:" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "1. Wait for both services to fully start (usually 10-30 seconds)" -ForegroundColor White
Write-Host "2. Open http://localhost:8173#prizepicks" -ForegroundColor White
Write-Host "3. Check if real PrizePicks data loads" -ForegroundColor White
Write-Host "4. If you see 'Loading...' or errors, check backend logs" -ForegroundColor White
Write-Host "5. Backend logs will show API calls and data fetching status" -ForegroundColor White
Write-Host ""
Write-Host "✨ Expected behavior:" -ForegroundColor Magenta
Write-Host "   - Real PrizePicks projections from 30+ sports" -ForegroundColor White
Write-Host "   - Dynamic filters populated from live data" -ForegroundColor White
Write-Host "   - ML predictions with confidence scores" -ForegroundColor White
Write-Host "   - SHAP explanations for AI transparency" -ForegroundColor White
Write-Host "   - Kelly optimization for bet sizing" -ForegroundColor White
Write-Host ""

# Function to check job status
function Show-JobStatus {
    Write-Host "📊 Service Status:" -ForegroundColor Yellow
    Write-Host "Backend Job: $($backendJob.State)" -ForegroundColor $(if ($backendJob.State -eq "Running") { "Green" } else { "Red" })
    Write-Host "Frontend Job: $($frontendJob.State)" -ForegroundColor $(if ($frontendJob.State -eq "Running") { "Green" } else { "Red" })
}

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "🚀 READY FOR TESTING!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Show initial status
Show-JobStatus
Write-Host ""

# Prompt to open browser
Write-Host "Press any key to open the PrizePicks page in your browser..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open browser
Start-Process "http://localhost:8173#prizepicks"

Write-Host ""
Write-Host "🎉 Browser opened! Check the PrizePicks page for real data." -ForegroundColor Green
Write-Host ""

# Keep script running and provide management options
while ($true) {
    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "🔧 Management Options:" -ForegroundColor Yellow
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "[S] Show service status" -ForegroundColor White
    Write-Host "[L] Show backend logs" -ForegroundColor White
    Write-Host "[F] Show frontend logs" -ForegroundColor White
    Write-Host "[O] Open PrizePicks page" -ForegroundColor White
    Write-Host "[Q] Quit and stop all services" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Enter your choice"
    
    switch ($choice.ToUpper()) {
        "S" { Show-JobStatus }
        "L" { 
            Write-Host "Backend Logs:" -ForegroundColor Yellow
            Receive-Job -Job $backendJob
        }
        "F" { 
            Write-Host "Frontend Logs:" -ForegroundColor Yellow
            Receive-Job -Job $frontendJob
        }
        "O" { Start-Process "http://localhost:8173#prizepicks" }
        "Q" { 
            Write-Host "🛑 Stopping services..." -ForegroundColor Red
            Stop-Job -Job $backendJob, $frontendJob
            Remove-Job -Job $backendJob, $frontendJob
            Write-Host "✅ All services stopped." -ForegroundColor Green
            exit 0
        }
        default { Write-Host "Invalid choice. Please try again." -ForegroundColor Red }
    }
}
