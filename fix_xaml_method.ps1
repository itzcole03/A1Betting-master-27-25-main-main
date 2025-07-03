Write-Host "🔧 Fixing XmlNodeReader method error..." -ForegroundColor Cyan

# Find all GUI script files
$guiFiles = Get-ChildItem -Path . -Recurse -Include "*cursor_ai_gui*.ps1"

foreach ($file in $guiFiles) {
    Write-Host "Processing: $($file.FullName)" -ForegroundColor Yellow
    
    # Create backup
    $backupPath = "$($file.FullName).method_fix.bak"
    Copy-Item -Path $file.FullName -Destination $backupPath -Force
    Write-Host "Backup created: $backupPath" -ForegroundColor Cyan
    
    # Read the current content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the incorrect XmlNodeReader code with the correct approach
    $correctCode = @'
    $reader = New-Object System.Xml.XmlNodeReader ([xml]$xaml)
    try {
        $window = [Windows.Markup.XamlReader]::Load($reader)
    }
    catch {
        Write-Host "XAML Loading Error: $_" -ForegroundColor Red
        [System.Windows.MessageBox]::Show("XAML Error: $_`n`nPlease check the XAML syntax and try again.", "XAML Error", "OK", "Error")
        return $null
    }
'@
    
    # Pattern to find the problematic code block
    $oldPattern = '(?s)\$reader\s*=\s*\[System\.Xml\.XmlNodeReader\]::new\(\[System\.Xml\.XmlDocument\]::new\(\)\)\s*\$reader\.LoadXml\(\$xaml\)\s*\$window\s*=\s*\[Windows\.Markup\.XamlReader\]::Load\(\$reader\)'
    
    # Replace with correct code
    $newContent = $content -replace $oldPattern, $correctCode
    
    # Save the fixed file
    Set-Content -Path $file.FullName -Value $newContent -Force
    Write-Host "✅ Fixed XmlNodeReader method in $($file.Name)" -ForegroundColor Green
}

# Create an updated batch file that runs with error handling
$mainScript = ($guiFiles | Select-Object -First 1).FullName
$batchContent = @"
@echo off
echo Running fixed GUI script with proper XML parsing...
powershell -ExecutionPolicy Bypass -Command "& {try { & '$mainScript' } catch { Write-Host 'Error: ' `$_.Exception.Message -ForegroundColor Red; Read-Host 'Press Enter to exit' }}"
pause
"@

Set-Content -Path "run_fixed_method.bat" -Value $batchContent -Force
Write-Host "`n✅ Created new batch file with error handling: run_fixed_method.bat" -ForegroundColor Green

Write-Host "`n🚀 READY! Run 'run_fixed_method.bat' to launch the fixed GUI" -ForegroundColor Cyan 