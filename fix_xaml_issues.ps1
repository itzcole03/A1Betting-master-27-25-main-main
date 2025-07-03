$ErrorActionPreference = "Continue"
$logFile = "xaml_fix_log.txt"
"XAML Fix Operation Started: $(Get-Date)" | Out-File $logFile

# 1. Find ALL script files with potential XAML
Write-Host "Scanning for ALL PowerShell files with XAML..." -ForegroundColor Cyan
$psFiles = Get-ChildItem -Path . -Recurse -Include *.ps1
"Found $($psFiles.Count) PS1 files to examine" | Out-File $logFile -Append

foreach ($file in $psFiles) {
    try {
        $content = Get-Content -Raw $file.FullName
        "Checking file: $($file.FullName)" | Out-File $logFile -Append
        
        # Check for XAML content
        if ($content -match "<Window") {
            Write-Host "XAML found in: $($file.FullName)" -ForegroundColor Yellow
            "XAML found in: $($file.FullName)" | Out-File $logFile -Append
            
            # Count Window tags
            $windowCount = ([regex]::Matches($content, "<Window")).Count
            "Window tag count: $windowCount" | Out-File $logFile -Append
            
            if ($windowCount -gt 1) {
                Write-Host "⚠️ DUPLICATE WINDOWS FOUND! Fixing..." -ForegroundColor Red
                "DUPLICATE WINDOWS FOUND! Fixing..." | Out-File $logFile -Append
                
                # Create backup
                Copy-Item $file.FullName "$($file.FullName).bak"
                "Backup created at $($file.FullName).bak" | Out-File $logFile -Append
                
                # Fix by keeping only first Window block
                $fixedContent = $content -replace "(?s)(<Window[\s\S]*?</Window>)([\s\S]*<Window[\s\S]*?</Window>)", '$1'
                Set-Content -Path $file.FullName -Value $fixedContent
                "File fixed - duplicate windows removed" | Out-File $logFile -Append
            }
            
            # Verify here-string syntax
            if ($content -match '@"[\s\S]*<Window' -and -not ($content -match '</Window>[\s\S]*"@')) {
                Write-Host "⚠️ Malformed here-string. Fixing..." -ForegroundColor Red
                "Malformed here-string detected. Fixing..." | Out-File $logFile -Append
                
                # Fix unclosed here-string
                if ($content -match '(@"[\s\S]*</Window>)') {
                    $fixedContent = $matches[1] + "`r`n\"@"
                    Set-Content -Path $file.FullName -Value $fixedContent
                    "Here-string syntax fixed" | Out-File $logFile -Append
                }
            }
            
            # Final verification
            $newContent = Get-Content -Raw $file.FullName
            $newWindowCount = ([regex]::Matches($newContent, "<Window")).Count
            "After fix: Window tag count: $newWindowCount" | Out-File $logFile -Append
            
            if ($newWindowCount -eq 1) {
                Write-Host "✅ File is now valid with 1 Window element" -ForegroundColor Green
                "File is now valid with 1 Window element" | Out-File $logFile -Append
            }
        }
    }
    catch {
        "ERROR processing $($file.FullName): $_" | Out-File $logFile -Append
        Write-Host "ERROR processing $($file.FullName): $_" -ForegroundColor Red
    }
}

# 2. Fix start_enhanced_gui.bat to use absolute paths
$batFile = Get-Item "start_enhanced_gui.bat" -ErrorAction SilentlyContinue
if ($batFile) {
    $batContent = Get-Content -Raw $batFile.FullName
    $psPath = Join-Path $batFile.DirectoryName "cursor_ai_gui_enhanced.ps1"
    $newBatContent = "@echo off`r`necho Running enhanced GUI from: $psPath`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`"`r`npause"
    Set-Content -Path $batFile.FullName -Value $newBatContent
    Write-Host "✅ Updated batch file to use absolute path" -ForegroundColor Green
    "Updated batch file to use absolute path: $psPath" | Out-File $logFile -Append
}

# 3. Add diagnostic code to cursor_ai_gui_enhanced.ps1
$guiFile = Get-Item "cursor_ai_gui_enhanced.ps1" -ErrorAction SilentlyContinue
if ($guiFile) {
    $guiContent = Get-Content -Raw $guiFile.FullName
    $diagCode = "# Diagnostic header - added by fix script`nWrite-Host \"==== DIAGNOSTIC INFO ==== \" -ForegroundColor Cyan`nWrite-Host \"Running script: $PSCommandPath\" -ForegroundColor Cyan`nWrite-Host \"PowerShell version: $($PSVersionTable.PSVersion)\" -ForegroundColor Cyan`nWrite-Host \"=======================`n\" -ForegroundColor Cyan`n`n" + $guiContent
    Set-Content -Path $guiFile.FullName -Value $diagCode
    "Added diagnostic header to GUI script" | Out-File $logFile -Append
}

Write-Host "`n✅ ALL FIXES COMPLETE! Check xaml_fix_log.txt for details" -ForegroundColor Green
"Fix operation completed: $(Get-Date)" | Out-File $logFile -Append 