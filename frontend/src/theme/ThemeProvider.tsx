import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// ============================================================================
// THEME TYPES;
// ============================================================================

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    fast: string;
    normal: string;
    slow: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// THEME DEFINITIONS;
// ============================================================================

const lightTheme: Theme = {
  name: "light",
  colors: {
    primary: "#2563eb",
    secondary: "#64748b",
    accent: "#f59e0b",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#1e293b",
    muted: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6"
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem"
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
  },
  animations: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease"
  }
};

const darkTheme: Theme = {
  name: "dark",
  colors: {
    primary: "#3b82f6",
    secondary: "#94a3b8",
    accent: "#fbbf24",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f1f5f9",
    muted: "#94a3b8",
    success: "#34d399",
    warning: "#fbbf24",
    error: "#f87171",
    info: "#60a5fa"
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem"
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.3)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.3)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.3)"
  },
  animations: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease"
  }
};

// ============================================================================
// THEME CONTEXT;
// ============================================================================

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============================================================================
// THEME PROVIDER COMPONENT;
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light"
}) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return defaultTheme === "dark";
  });

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (themeName: "light" | "dark") => {
    setIsDark(themeName === "dark");
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  const contextValue: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// THEME UTILITIES;
// ============================================================================

export const getThemeColors = (isDark: boolean): ThemeColors => {
  return isDark ? darkTheme.colors : lightTheme.colors;
};

export const getThemeValue = (
  path: string,
  isDark: boolean = false,
): string => {
  let value: any = isDark ? darkTheme : lightTheme;

  const keys = path.split('.');
  for (const key of keys) {
    value = value?.[key];
  }

  return value || "";
};

// CSS class utilities for common theme patterns;
export const themeClasses = {
  // Glass effect cards;
  glassCard:
    "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/30",

  // Gradient backgrounds;
  gradientPrimary: "bg-gradient-to-br from-blue-500 to-purple-600",
  gradientSecondary: "bg-gradient-to-br from-purple-500 to-pink-600",
  gradientAccent: "bg-gradient-to-br from-cyan-500 to-blue-600",

  // Text variants;
  textPrimary: "text-gray-900 dark:text-white",
  textSecondary: "text-gray-600 dark:text-gray-300",
  textMuted: "text-gray-500 dark:text-gray-400",

  // Interactive elements;
  buttonPrimary:
    "bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200",
  buttonSecondary:
    "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-200",

  // Surfaces;
  surfacePrimary: "bg-white dark:bg-gray-800",
  surfaceSecondary: "bg-gray-50 dark:bg-gray-900",

  // Borders;
  borderPrimary: "border-gray-200 dark:border-gray-700",
  borderSecondary: "border-gray-300 dark:border-gray-600",

  // Shadows;
  shadowSm: "shadow-sm",
  shadowMd: "shadow-md",
  shadowLg: "shadow-lg",
  shadowXl: "shadow-xl",

  // Animations;
  transitionAll: "transition-all duration-300 ease-in-out",
  transitionColors: "transition-colors duration-200 ease-in-out",

  // Focus states;
  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
};

export default ThemeProvider;



`
