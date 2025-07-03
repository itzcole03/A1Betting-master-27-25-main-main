# Enhanced GUI Test Script
param([switch]$Verbose)

Write-Host "🧪 Testing Enhanced GUI Components..." -ForegroundColor Cyan

$tests = 0
$passed = 0

# Test 1: Check if main script exists
$tests++
if (Test-Path "cursor_ai_gui_enhanced.ps1") {
    Write-Host "✅ Main script found" -ForegroundColor Green
    $passed++
}
else {
    Write-Host "❌ Main script missing" -ForegroundColor Red
}

# Test 2: Check launchers
$tests++
if ((Test-Path "start_enhanced_gui.bat") -and (Test-Path "cursor_ai_enhanced.bat")) {
    Write-Host "✅ Launcher scripts found" -ForegroundColor Green
    $passed++
}
else {
    Write-Host "❌ Launcher scripts missing" -ForegroundColor Red
}

# Test 3: Test assemblies
$tests++
try {
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName PresentationFramework
    Write-Host "✅ Required assemblies loaded" -ForegroundColor Green
    $passed++
}
catch {
    Write-Host "❌ Assembly loading failed" -ForegroundColor Red
}

# Test 4: Test thread-safe collections
$tests++
try {
    $queue = [System.Collections.Concurrent.ConcurrentQueue[string]]::new()
    $queue.Enqueue("test")
    Write-Host "✅ Thread-safe collections working" -ForegroundColor Green
    $passed++
}
catch {
    Write-Host "❌ Thread-safe collections failed" -ForegroundColor Red
}

# Summary
Write-Host ""
Write-Host "Test Results: $passed/$tests passed" -ForegroundColor Cyan
if ($passed -eq $tests) {
    Write-Host "🎉 All tests passed! Ready to launch." -ForegroundColor Green
}
else {
    Write-Host "⚠️ Some tests failed. Check dependencies." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 To start the Enhanced GUI, run:" -ForegroundColor Cyan
Write-Host "   start_enhanced_gui.bat" -ForegroundColor White 