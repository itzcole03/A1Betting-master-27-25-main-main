# 1. Find EXACTLY which script is being executed
cd "c:\Users\bcmad\Downloads\A1Betting-master-27-25-main-main"
$batFile = Get-Item "start_enhanced_gui.bat" -ErrorAction SilentlyContinue
if ($batFile) {
    $batContent = Get-Content $batFile.FullName -Raw
    Write-Host "Batch file content:" -ForegroundColor Cyan
    Write-Host $batContent -ForegroundColor Yellow
    if ($batContent -match '"%~dp0([^\"]+)"') {
        $targetScript = $matches[1]
        $fullPath = Join-Path $batFile.DirectoryName $targetScript
        Write-Host "Target script path: $fullPath" -ForegroundColor Green
    }
}

# 2. Create a complete replacement script with guaranteed clean XAML
$cleanScript = @'
# A1Betting Cursor AI Command Interface - Enhanced v2.1
# Fixed XAML version - single Window element

Add-Type -AssemblyName PresentationFramework

function New-EnhancedWPFInterface {
    $xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="A1Betting Cursor AI Command Interface - Enhanced v2.1"
        Height="900" Width="1400" MinHeight="800" MinWidth="1200"
        Background="#0d1117" WindowStartupLocation="CenterScreen" ResizeMode="CanResize">
    <DockPanel>
        <StackPanel DockPanel.Dock="Left" Width="220" Background="#161b22" KeyboardNavigation.TabNavigation="Cycle">
            <TextBlock Name="SidebarHeader" Text="A1Betting" FontFamily="Segoe UI" FontSize="18" FontWeight="Bold" Margin="0,8,0,4" AutomationProperties.Name="SidebarHeader"/>
            <Button Name="DashboardBtn" Content="Dashboard" Margin="0,8,0,0" Height="40" AutomationProperties.Name="Dashboard"/>
            <Button Name="AnalyticsBtn" Content="Analytics" Margin="0,8,0,0" Height="40" AutomationProperties.Name="Analytics"/>
            <Button Name="MLDashboardBtn" Content="ML Dashboard" Margin="0,8,0,0" Height="40" AutomationProperties.Name="MLDashboard"/>
            <Button Name="SettingsBtn" Content="Settings" Margin="0,8,0,0" Height="40" AutomationProperties.Name="Settings"/>
            <Button Name="ThemeBtn" Content="Switch Theme" Margin="0,8,0,0" Height="40" AutomationProperties.Name="ThemeSwitch"/>
        </StackPanel>
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="*"/>
                <RowDefinition Height="120"/>
            </Grid.RowDefinitions>
            <Border Grid.Row="0" Background="#161b22" CornerRadius="8" Padding="16" Margin="0,0,0,8">
                <TextBlock Name="Header" Text="A1Betting Command Interface - Enhanced v2.1" FontFamily="Segoe UI" FontSize="18" FontWeight="Bold" AutomationProperties.Name="Header"/>
            </Border>
            <Border Grid.Row="1" Background="#0d1117" CornerRadius="8" Padding="16" Margin="0,0,0,8">
                <TextBlock Name="WelcomeText" Text="Welcome to the A1Betting Enhanced GUI. Select a function from the sidebar." Foreground="#c9d1d9" FontSize="16" AutomationProperties.Name="WelcomeText"/>
            </Border>
            <Border Grid.Row="2" Background="#161b22" CornerRadius="8" Padding="16" Margin="0,0,0,0">
                <TextBox Name="StatusTextBox" IsReadOnly="True" AcceptsReturn="True" VerticalScrollBarVisibility="Auto" Height="100" AutomationProperties.Name="StatusTextBox"/>
            </Border>
        </Grid>
    </DockPanel>
</Window>
"@

    $reader = [System.Xml.XmlNodeReader]::new([System.Xml.XmlDocument]::new())
    $reader.LoadXml($xaml)
    $window = [Windows.Markup.XamlReader]::Load($reader)

    # Set up event handlers
    $window.FindName("DashboardBtn").Add_Click({ Show-Dashboard $window })
    $window.FindName("AnalyticsBtn").Add_Click({ Show-Analytics $window })
    $window.FindName("MLDashboardBtn").Add_Click({ Show-MLDashboard $window })
    $window.FindName("SettingsBtn").Add_Click({ Show-Settings $window })
    $window.FindName("ThemeBtn").Add_Click({ Toggle-Theme $window })
    
    # Initialize status
    $statusTextBox = $window.FindName("StatusTextBox")
    $statusTextBox.Text = "System ready. Please select an option from the menu."
    
    return $window
}

function Show-Dashboard($window) {
    $statusTextBox = $window.FindName("StatusTextBox")
    $statusTextBox.Text = "Dashboard selected. Loading metrics..."
}

function Show-Analytics($window) {
    $statusTextBox = $window.FindName("StatusTextBox")
    $statusTextBox.Text = "Analytics selected. Fetching data..."
}

function Show-MLDashboard($window) {
    $statusTextBox = $window.FindName("StatusTextBox")
    $statusTextBox.Text = "ML Dashboard selected. Loading models..."
}

function Show-Settings($window) {
    $statusTextBox = $window.FindName("StatusTextBox")
    $statusTextBox.Text = "Settings panel opened."
}

function Toggle-Theme($window) {
    $currentBg = $window.Background
    if ($currentBg -eq "#0d1117") {
        $window.Background = "#ffffff"
        $statusTextBox = $window.FindName("StatusTextBox")
        $statusTextBox.Text = "Theme switched to light mode."
    } else {
        $window.Background = "#0d1117"
        $statusTextBox = $window.FindName("StatusTextBox")
        $statusTextBox.Text = "Theme switched to dark mode."
    }
}

# Main execution
try {
    $window = New-EnhancedWPFInterface
    $window.ShowDialog()
} catch {
    [System.Windows.MessageBox]::Show("Error: $_", "Application Error", "OK", "Error")
}
'@

# 3. Replace ALL copies with the clean script
$guiFiles = Get-ChildItem -Path . -Recurse -Include "*cursor_ai_gui*.ps1"
foreach ($file in $guiFiles) {
    Write-Host "Found script: $($file.FullName)" -ForegroundColor Yellow
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = "$($file.FullName).$timestamp.bak"
    Copy-Item -Path $file.FullName -Destination $backupPath
    Write-Host "Created backup: $backupPath" -ForegroundColor Cyan
    Set-Content -Path $file.FullName -Value $cleanScript -Force
    Write-Host "✅ Replaced with clean script" -ForegroundColor Green
}

# 4. Create a new batch file that explicitly uses the right script
$mainGuiScript = $guiFiles | Where-Object { $_.Name -eq "cursor_ai_gui_enhanced.ps1" } | Select-Object -First 1
if ($mainGuiScript) {
    $newBatchContent = "@echo off`r`necho Running clean GUI script from: $($mainGuiScript.FullName)`r`npowershell -ExecutionPolicy Bypass -File `"$($mainGuiScript.FullName)`"`r`npause"
    Set-Content -Path "run_fixed_gui.bat" -Value $newBatchContent
    Write-Host "`n✅ Created new batch file: run_fixed_gui.bat" -ForegroundColor Green
    Write-Host "Run this batch file to launch the fixed GUI" -ForegroundColor Green
}

Write-Host "`n🚀 CLEANUP COMPLETE! Run 'run_fixed_gui.bat' to start the GUI" -ForegroundColor Cyan 