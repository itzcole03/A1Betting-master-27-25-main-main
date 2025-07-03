$files = Get-ChildItem -Path "c:\Users\bcmad\Downloads\A1Betting-master-27-25-main-main" -Recurse -Include "*cursor_ai_gui*.ps1"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    [System.IO.File]::Copy($file.FullName, "$($file.FullName).bak", $true)
    $fixedContent = $content -replace '(?s)(</Window>).*?(<Window[^>]*>)', '$1'
    [System.IO.File]::WriteAllText($file.FullName, $fixedContent)
    Write-Host "Fixed: $($file.FullName)" -ForegroundColor Green
} 