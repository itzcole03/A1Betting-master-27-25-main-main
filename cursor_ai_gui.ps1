# A1Betting Cursor AI GUI - WORKING VERSION
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

function New-WorkingGUI {
    # Define XAML using proper PowerShell syntax
    [xml]$xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="A1Betting Cursor AI Interface - Working Version"
        Height="800" Width="1200" MinHeight="600" MinWidth="800"
        Background="#0d1117" WindowStartupLocation="CenterScreen">
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="200"/>
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>
        
        <!-- Sidebar -->
        <StackPanel Grid.Column="0" Background="#161b22" Margin="5">
            <TextBlock Text="A1Betting" FontSize="20" FontWeight="Bold" 
                      Foreground="White" Margin="10" HorizontalAlignment="Center"/>
            
            <Button Name="DashboardBtn" Content="Dashboard" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button Name="AnalyticsBtn" Content="Analytics" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button Name="MLBtn" Content="ML Dashboard" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button Name="SettingsBtn" Content="Settings" Height="40" Margin="10,5"
                   Background="#21262d" Foreground="White" BorderBrush="#30363d"/>
            <Button Name="ExitBtn" Content="Exit" Height="40" Margin="10,20,10,5"
                   Background="#da3633" Foreground="White" BorderBrush="#f85149"/>
        </StackPanel>
        
        <!-- Main Content -->
        <Grid Grid.Column="1" Margin="10">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="*"/>
                <RowDefinition Height="100"/>
            </Grid.RowDefinitions>
            
            <!-- Header -->
            <Border Grid.Row="0" Background="#161b22" CornerRadius="5" Padding="15" Margin="0,0,0,10">
                <TextBlock Name="HeaderText" Text="Welcome to A1Betting AI Interface" 
                          FontSize="18" FontWeight="Bold" Foreground="White"/>
            </Border>
            
            <!-- Content Area -->
            <Border Grid.Row="1" Background="#161b22" CornerRadius="5" Padding="15" Margin="0,0,0,10">
                <ScrollViewer>
                    <TextBlock Name="ContentText" Text="Select an option from the sidebar to begin." 
                              FontSize="14" Foreground="#c9d1d9" TextWrapping="Wrap"/>
                </ScrollViewer>
            </Border>
            
            <!-- Status Bar -->
            <Border Grid.Row="2" Background="#161b22" CornerRadius="5" Padding="10">
                <TextBox Name="StatusBox" Background="Transparent" Foreground="#58a6ff" 
                        BorderThickness="0" IsReadOnly="True" Text="System Ready - Select an action"/>
            </Border>
        </Grid>
    </Grid>
</Window>
"@

    # Create the window using the CORRECT method
    $reader = New-Object System.Xml.XmlNodeReader $xaml
    $window = [Windows.Markup.XamlReader]::Load($reader)
    
    # Get controls
    $dashboardBtn = $window.FindName("DashboardBtn")
    $analyticsBtn = $window.FindName("AnalyticsBtn") 
    $mlBtn = $window.FindName("MLBtn")
    $settingsBtn = $window.FindName("SettingsBtn")
    $exitBtn = $window.FindName("ExitBtn")
    $headerText = $window.FindName("HeaderText")
    $contentText = $window.FindName("ContentText")
    $statusBox = $window.FindName("StatusBox")
    
    # Event handlers
    $dashboardBtn.Add_Click({
            $headerText.Text = "Dashboard - System Overview"
            $contentText.Text = "Dashboard loaded successfully.`n`nKey Metrics:`n• System Status: Online`n• Active Processes: 3`n• Memory Usage: 45%`n• Last Update: $(Get-Date)"
            $statusBox.Text = "Dashboard view activated"
        })
    
    $analyticsBtn.Add_Click({
            $headerText.Text = "Analytics - Data Insights"
            $contentText.Text = "Analytics module loaded.`n`nAvailable Reports:`n• Performance Analytics`n• User Behavior Analysis`n• Betting Patterns`n• Revenue Metrics`n`nSelect a report type to continue."
            $statusBox.Text = "Analytics module ready"
        })
    
    $mlBtn.Add_Click({
            $headerText.Text = "Machine Learning Dashboard"
            $contentText.Text = "ML Dashboard initialized.`n`nML Models Status:`n• Prediction Model: Active`n• Risk Assessment: Running`n• Pattern Recognition: Enabled`n• Auto-Learning: ON`n`nAll systems operational."
            $statusBox.Text = "ML Dashboard active"
        })
    
    $settingsBtn.Add_Click({
            $headerText.Text = "System Settings"
            $contentText.Text = "Settings panel loaded.`n`nConfiguration Options:`n• User Preferences`n• System Parameters`n• Security Settings`n• API Configuration`n• Theme Selection`n`nModify settings as needed."
            $statusBox.Text = "Settings panel opened"
        })
    
    $exitBtn.Add_Click({
            $result = [System.Windows.MessageBox]::Show("Are you sure you want to exit?", "Confirm Exit", "YesNo", "Question")
            if ($result -eq "Yes") {
                $window.Close()
            }
        })
    
    return $window
}

# Main execution with error handling
try {
    Write-Host "Starting A1Betting GUI..." -ForegroundColor Green
    $gui = New-WorkingGUI
    
    if ($gui) {
        Write-Host "GUI created successfully. Opening window..." -ForegroundColor Green
        $gui.ShowDialog() | Out-Null
    }
    else {
        Write-Host "Failed to create GUI window" -ForegroundColor Red
    }
}
catch {
    Write-Host "Error creating GUI: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Stack trace: $($_.ScriptStackTrace)" -ForegroundColor Yellow
    [System.Windows.MessageBox]::Show("GUI Error: $($_.Exception.Message)", "Error", "OK", "Error")
}

Write-Host "GUI session ended." -ForegroundColor Cyan 
