Write-Host "🔍 Finding the GUI script file..." -ForegroundColor Cyan

# Find all potential GUI script files
$guiFiles = Get-ChildItem -Path . -Recurse -Include "*cursor_ai_gui*.ps1"

foreach ($file in $guiFiles) {
    Write-Host "📄 Examining $($file.FullName)" -ForegroundColor Yellow
    
    # Read file content as a single string (preserves exact formatting)
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Check for duplicate Window tags
    $windowCount = ([regex]::Matches($content, "<Window")).Count
    Write-Host "   Found $windowCount Window tags" -ForegroundColor $(if ($windowCount -gt 1) { "Red" }else { "Green" })
    
    if ($windowCount -gt 1) {
        # Create backup
        $backupPath = "$($file.FullName).backup"
        [System.IO.File]::Copy($file.FullName, $backupPath, $true)
        Write-Host "✓ Created backup at $backupPath" -ForegroundColor Green
        
        # Fix the XAML by keeping everything up to the first complete Window block
        $pattern = '(?s)(<Window.*?</Window>)(.*?)(<Window.*)'
        $fixedContent = $content -replace $pattern, '$1$2'
        
        # Save fixed content
        [System.IO.File]::WriteAllText($file.FullName, $fixedContent)
        Write-Host "✅ FIXED: Removed duplicate Window block" -ForegroundColor Green
        
        # Verify the fix
        $newContent = [System.IO.File]::ReadAllText($file.FullName)
        $newWindowCount = ([regex]::Matches($newContent, "<Window")).Count
        Write-Host "   Now contains $newWindowCount Window tags" -ForegroundColor $(if ($newWindowCount -eq 1) { "Green" }else { "Red" })
    }
}

# Run the GUI script directly (to bypass any batch file issues)
Write-Host "`n🚀 Running the fixed GUI script..." -ForegroundColor Cyan
foreach ($file in $guiFiles) {
    if ([System.IO.Path]::GetFileName($file) -eq "cursor_ai_gui_enhanced.ps1") {
        Write-Host "   Executing: $($file.FullName)" -ForegroundColor Yellow
        & powershell -ExecutionPolicy Bypass -File $file.FullName
        break
    }
} 