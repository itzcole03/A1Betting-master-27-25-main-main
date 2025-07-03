# A1Betting Cursor AI GUI - FINAL DEBUGGED VERSION
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

function New-DebuggingGUI {
    Write-Host "Creating XAML with debugging..." -ForegroundColor Cyan
    
    # XAML with explicit x:Name attributes that WILL be found
    [xml]$xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="A1Betting AI Interface - Debug Version"
        Height="800" Width="1200" WindowStartupLocation="CenterScreen"
        Background="#0d1117">
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="200"/>
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>
        
        <!-- Sidebar with explicit Names -->
        <StackPanel Grid.Column="0" Background="#161b22" Margin="5">
            <TextBlock Text="A1Betting Debug" FontSize="16" FontWeight="Bold" 
                      Foreground="White" Margin="10" HorizontalAlignment="Center"/>
            
            <Button x:Name="DashboardBtn" Content="Dashboard" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button x:Name="AnalyticsBtn" Content="Analytics" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button x:Name="MLBtn" Content="ML Dashboard" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button x:Name="SettingsBtn" Content="Settings" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button x:Name="ExitBtn" Content="Exit" Height="40" Margin="10,20,10,5"
                   Background="#da3633" Foreground="White" BorderBrush="#f85149"/>
        </StackPanel>
        
        <!-- Main Content with explicit Names -->
        <Grid Grid.Column="1" Margin="10">
            <Grid.RowDefinitions>
                <RowDefinition Height="60"/>
                <RowDefinition Height="*"/>
                <RowDefinition Height="80"/>
            </Grid.RowDefinitions>
            
            <!-- Header -->
            <Border Grid.Row="0" Background="#161b22" CornerRadius="5" Padding="15">
                <TextBlock x:Name="HeaderText" Text="Welcome to A1Betting Debug Interface" 
                          FontSize="18" FontWeight="Bold" Foreground="White"/>
            </Border>
            
            <!-- Content Area -->
            <Border Grid.Row="1" Background="#161b22" CornerRadius="5" Padding="15" Margin="0,10">
                <ScrollViewer>
                    <TextBlock x:Name="ContentText" Text="Debug Mode: All controls initialized. Select an option from the sidebar." 
                              FontSize="14" Foreground="#c9d1d9" TextWrapping="Wrap"/>
                </ScrollViewer>
            </Border>
            
            <!-- Status Bar -->
            <Border Grid.Row="2" Background="#161b22" CornerRadius="5" Padding="10">
                <TextBox x:Name="StatusBox" Background="Transparent" Foreground="#58a6ff" 
                        BorderThickness="0" IsReadOnly="True" 
                        Text="DEBUG: System Ready - All controls verified"/>
            </Border>
        </Grid>
    </Grid>
</Window>
"@

    Write-Host "Loading XAML..." -ForegroundColor Yellow
    
    # Create window with error handling
    try {
        $reader = New-Object System.Xml.XmlNodeReader $xaml
        $window = [Windows.Markup.XamlReader]::Load($reader)
        Write-Host "✅ XAML loaded successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ XAML Load Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
    
    # Debug: Find and verify ALL controls
    Write-Host "`nVerifying controls..." -ForegroundColor Cyan
    $controlNames = @("DashboardBtn", "AnalyticsBtn", "MLBtn", "SettingsBtn", "ExitBtn", "HeaderText", "ContentText", "StatusBox")
    $script:controls = @{}
    
    foreach ($controlName in $controlNames) {
        $control = $window.FindName($controlName)
        if ($control) {
            $script:controls[$controlName] = $control
            Write-Host "✅ Found: $controlName" -ForegroundColor Green
        }
        else {
            Write-Host "❌ NOT FOUND: $controlName" -ForegroundColor Red
        }
    }
    
    # Only proceed if ALL controls are found
    $missingControls = $controlNames | Where-Object { -not $script:controls.ContainsKey($_) }
    if ($missingControls.Count -gt 0) {
        Write-Host "❌ Missing controls: $($missingControls -join ', ')" -ForegroundColor Red
        [System.Windows.MessageBox]::Show("Missing controls: $($missingControls -join ', ')", "Control Error", "OK", "Error")
        return $null
    }
    
    Write-Host "✅ All controls verified. Setting up event handlers..." -ForegroundColor Green
    
    # Safe event handlers with null checks
    $script:controls["DashboardBtn"].Add_Click({
            try {
                Write-Host "Dashboard clicked" -ForegroundColor Yellow
                $script:controls["HeaderText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "Dashboard - System Overview")
                $script:controls["ContentText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "Dashboard Active`n`nSystem Metrics:`n- Status: Online`n- Uptime: $(Get-Date)`n- Memory: 45% Used`n- Processes: 12 Active")
                $script:controls["StatusBox"].Text = "Dashboard view activated - $(Get-Date -Format 'HH:mm:ss')"
            }
            catch {
                Write-Host "Dashboard Error: $($_.Exception.Message)" -ForegroundColor Red
            }
        })
    
    $script:controls["AnalyticsBtn"].Add_Click({
            try {
                Write-Host "Analytics clicked" -ForegroundColor Yellow
                $script:controls["HeaderText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "Analytics Dashboard")
                $script:controls["ContentText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "Analytics Module Loaded`n`nAvailable Reports:`n- Performance Analytics`n- User Behavior`n- Betting Patterns`n- Revenue Analysis`n- Trend Forecasting")
                $script:controls["StatusBox"].Text = "Analytics module ready - $(Get-Date -Format 'HH:mm:ss')"
            }
            catch {
                Write-Host "Analytics Error: $($_.Exception.Message)" -ForegroundColor Red
            }
        })
    
    $script:controls["MLBtn"].Add_Click({
            try {
                Write-Host "ML Dashboard clicked" -ForegroundColor Yellow
                $script:controls["HeaderText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "Machine Learning Hub")
                $script:controls["ContentText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "ML Dashboard Initialized`n`nModel Status:`n- Prediction Engine: Active`n- Risk Assessment: Running`n- Pattern Recognition: Learning`n- Auto-Optimization: Enabled")
                $script:controls["StatusBox"].Text = "ML Dashboard active - $(Get-Date -Format 'HH:mm:ss')"
            }
            catch {
                Write-Host "ML Error: $($_.Exception.Message)" -ForegroundColor Red
            }
        })
    
    $script:controls["SettingsBtn"].Add_Click({
            try {
                Write-Host "Settings clicked" -ForegroundColor Yellow
                $script:controls["HeaderText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "System Configuration")
                $script:controls["ContentText"].SetValue([System.Windows.Controls.TextBlock]::TextProperty, "Settings Panel`n`nConfiguration Options:`n- User Preferences`n- API Settings`n- Security Configuration`n- Theme Selection`n- Debug Options")
                $script:controls["StatusBox"].Text = "Settings panel opened - $(Get-Date -Format 'HH:mm:ss')"
            }
            catch {
                Write-Host "Settings Error: $($_.Exception.Message)" -ForegroundColor Red
            }
        })
    
    $script:controls["ExitBtn"].Add_Click({
            try {
                Write-Host "Exit clicked" -ForegroundColor Yellow
                $result = [System.Windows.MessageBox]::Show("Exit A1Betting GUI?", "Confirm Exit", "YesNo", "Question")
                if ($result -eq "Yes") {
                    Write-Host "User confirmed exit" -ForegroundColor Cyan
                    $window.Close()
                }
            }
            catch {
                Write-Host "Exit Error: $($_.Exception.Message)" -ForegroundColor Red
            }
        })
    
    Write-Host "✅ All event handlers configured successfully" -ForegroundColor Green
    return $window
}

# Main execution with comprehensive error handling
Write-Host "=== A1Betting GUI Debug Launcher ===" -ForegroundColor Cyan
Write-Host "PowerShell Version: $($PSVersionTable.PSVersion)" -ForegroundColor Gray
Write-Host "Execution Policy: $(Get-ExecutionPolicy)" -ForegroundColor Gray

try {
    $gui = New-DebuggingGUI
    
    if ($gui) {
        Write-Host "`n🚀 Launching GUI window..." -ForegroundColor Green
        $result = $gui.ShowDialog()
        Write-Host "GUI closed with result: $result" -ForegroundColor Cyan
    }
    else {
        Write-Host "❌ Failed to create GUI - check errors above" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Critical Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Stack Trace: $($_.ScriptStackTrace)" -ForegroundColor Yellow
    [System.Windows.MessageBox]::Show("Critical GUI Error:`n$($_.Exception.Message)", "Fatal Error", "OK", "Error")
}

Write-Host "`n=== GUI Session Complete ===" -ForegroundColor Cyan
Read-Host "Press Enter to exit"