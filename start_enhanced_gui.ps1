# A1Betting Enhanced GUI Launcher v2.0
# PowerShell launcher with enhanced error handling and status reporting

param(
    [string]$Theme = 'Cyberpunk',
    [switch]$Debug,
    [string]$LogLevel = 'INFO'
)

# Colors for output
$Colors = @{
    Header  = 'Cyan'
    Success = 'Green'
    Warning = 'Yellow'
    Error   = 'Red'
    Info    = 'White'
    Accent  = 'Magenta'
}

function Write-ColorText {
    param([string]$Text, [string]$Color = 'White')
    Write-Host $Text -ForegroundColor $Colors[$Color]
}

function Test-PowerShellVersion {
    $version = $PSVersionTable.PSVersion
    $isCore = $PSVersionTable.PSEdition -eq 'Core'
    
    return @{
        Version      = $version
        IsCore       = $isCore
        IsMajor7Plus = $version.Major -ge 7
        DisplayName  = if ($isCore) { "PowerShell $version" } else { "Windows PowerShell $version" }
    }
}

function Show-StartupBanner {
    Clear-Host
    Write-ColorText "================================================================" Header
    Write-ColorText "🚀 A1Betting Cursor AI Enhanced GUI v2.0 Launcher" Header
    Write-ColorText "================================================================" Header
    Write-Host ""
    
    $psInfo = Test-PowerShellVersion
    Write-ColorText "PowerShell Environment:" Info
    Write-ColorText "  Engine: $($psInfo.DisplayName)" Info
    Write-ColorText "  Performance: $(if($psInfo.IsMajor7Plus){'Optimal'}else{'Standard'})" $(if ($psInfo.IsMajor7Plus) { 'Success' }else { 'Warning' })
    Write-Host ""
    
    Write-ColorText "Enhanced Features:" Info
    Write-ColorText "  ✨ Modern WPF interface with Windows Forms fallback" Success
    Write-ColorText "  ⚡ Runspace-based background processing" Success
    Write-ColorText "  🔒 Enhanced security and audit logging" Success
    Write-ColorText "  🎯 A1Betting platform-specific commands" Success
    Write-ColorText "  📊 Real-time performance monitoring" Success
    Write-ColorText "  🎨 Theme support: $Theme" Accent
    Write-Host ""
    
    if (-not $psInfo.IsMajor7Plus) {
        Write-ColorText "💡 Tip: Install PowerShell 7+ for best performance" Warning
        Write-ColorText "   Download from: https://aka.ms/powershell" Warning
        Write-Host ""
    }
}

function Start-EnhancedGUI {
    try {
        $scriptPath = Join-Path $PSScriptRoot "cursor_ai_gui_enhanced.ps1"
        
        if (-not (Test-Path $scriptPath)) {
            Write-ColorText "❌ Enhanced GUI script not found: $scriptPath" Error
            return $false
        }
        
        Write-ColorText "🚀 Starting Enhanced GUI..." Info
        Write-ColorText "   Script: $scriptPath" Info
        Write-ColorText "   Theme: $Theme" Info
        if ($Debug) { Write-ColorText "   Debug: Enabled" Warning }
        Write-Host ""
        
        # Build parameters
        $params = @()
        if ($Theme -ne 'Cyberpunk') { $params += @('-Theme', $Theme) }
        if ($Debug) { $params += '-Debug' }
        if ($LogLevel -ne 'INFO') { $params += @('-LogLevel', $LogLevel) }
        
        # Execute the enhanced GUI
        if ($params.Count -gt 0) {
            & $scriptPath @params
        }
        else {
            & $scriptPath
        }
        
        $exitCode = $LASTEXITCODE
        if ($exitCode -eq 0 -or $null -eq $exitCode) {
            Write-ColorText "✅ Enhanced GUI session completed successfully" Success
            return $true
        }
        else {
            Write-ColorText "⚠️  Enhanced GUI exited with code: $exitCode" Warning
            return $false
        }
    }
    catch {
        Write-ColorText "❌ Failed to start Enhanced GUI: $($_.Exception.Message)" Error
        Write-ColorText "   StackTrace: $($_.ScriptStackTrace)" Error
        return $false
    }
}

function Show-CompletionStatus {
    param([bool]$Success)
    
    Write-Host ""
    Write-ColorText "================================================================" Header
    Write-ColorText "📊 Session Summary" Header
    Write-ColorText "================================================================" Header
    
    if ($Success) {
        Write-ColorText "Status: Completed Successfully ✅" Success
    }
    else {
        Write-ColorText "Status: Completed with Issues ⚠️" Warning
    }
    
    # Check for log files
    $logPattern = "$env:TEMP\cursor_ai_enhanced_*.log"
    $logFiles = Get-ChildItem -Path $logPattern -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
    
    if ($logFiles) {
        Write-ColorText "Log Files:" Info
        foreach ($log in $logFiles | Select-Object -First 3) {
            $size = [math]::Round($log.Length / 1KB, 1)
            Write-ColorText "  📄 $($log.Name) (${size}KB) - $($log.LastWriteTime.ToString('HH:mm:ss'))" Info
        }
    }
    else {
        Write-ColorText "No log files found in: $env:TEMP" Warning
    }
    
    Write-Host ""
    Write-ColorText "Thank you for using A1Betting Enhanced GUI! 🚀" Accent
}

# ============================================================================
# Main Execution
# ============================================================================

try {
    Show-StartupBanner
    
    Write-ColorText "Initializing enhanced interface..." Info
    Start-Sleep -Milliseconds 500  # Brief pause for effect
    
    $success = Start-EnhancedGUI
    
    Show-CompletionStatus $success
    
    if (-not $success) {
        Write-Host ""
        Write-ColorText "Press any key to exit..." Info
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}
catch {
    Write-ColorText "❌ Launcher encountered a critical error: $($_.Exception.Message)" Error
    Write-Host ""
    Write-ColorText "Press any key to exit..." Info
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} 