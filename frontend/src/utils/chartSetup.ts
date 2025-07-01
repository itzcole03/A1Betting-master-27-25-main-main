/**
 * Chart.js Setup and Registration;
 * Registers all required Chart.js components for use across the application;
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  LogarithmicScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Decimation,
//   SubTitle
} from 'chart.js';

// Register all Chart.js components;
ChartJS.register(
  // Scales;
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  LogarithmicScale,
  TimeScale,
  TimeSeriesScale,

  // Elements;
  PointElement,
  LineElement,
  BarElement,
  ArcElement,

  // Plugins;
  Title,
  Tooltip,
  Legend,
  Filler,
  Decimation,
//   SubTitle
);

// Default configuration for all charts;
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
ChartJS.defaults.elements.point.radius = 4;
ChartJS.defaults.elements.point.hoverRadius = 6;

// Improve text rendering;
ChartJS.defaults.font.family = "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
ChartJS.defaults.font.size = 12;
ChartJS.defaults.color = '#e5e7eb';

// Theme-aware color scheme;
export const chartTheme = {
  colors: {,`n  primary: '#06ffa5',
    secondary: '#00d4ff',
    accent: '#ff10f0',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    text: '#e5e7eb',
    grid: 'rgba(156, 163, 175, 0.2)'
  },
  gradients: {,`n  primary: ['#06ffa5', '#00d4ff'],
    accent: ['#ff10f0', '#7c3aed'],
    performance: ['#22c55e', '#16a34a']
  }
};

// Utility function to generate chart colors;
export const generateChartColors = (count: number) => {
  const baseColors = [
    chartTheme.colors.primary,
    chartTheme.colors.secondary,
    chartTheme.colors.accent,
    chartTheme.colors.success,
    chartTheme.colors.warning,
    chartTheme.colors.error,
  ];

  for (const i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);}

  return colors;};

// Common chart options;
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {,`n  legend: {,`n  position: 'top' as const,
      labels: {,`n  color: chartTheme.colors.text,
        usePointStyle: true,
        padding: 20,
        font: {,`n  size: 12,
          family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          weight: '500'
        }
      }
    },
    tooltip: {,`n  backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: chartTheme.colors.text,
      bodyColor: chartTheme.colors.text,
      borderColor: chartTheme.colors.primary,
      borderWidth: 1,
      titleFont: {,`n  size: 13,
        family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        weight: '600'
      },
      bodyFont: {,`n  size: 12,
        family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }
    }
  },
  scales: {,`n  x: {,`n  ticks: {,`n  color: chartTheme.colors.text,
        font: {,`n  size: 11,
          family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }
      },
      grid: { color: chartTheme.colors.grid}
    },
    y: {,`n  ticks: {,`n  color: chartTheme.colors.text,
        font: {,`n  size: 11,
          family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }
      },
      grid: { color: chartTheme.colors.grid}
    }
  }
};

// Chart.js is now properly configured;
export default ChartJS;


`
