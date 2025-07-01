import { createTheme, Theme, ThemeOptions} from '@mui/material/styles';
import { useThemeStore} from '@/stores/themeStore';

const commonThemeOptions: ThemeOptions = {,`n  typography: {,`n  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {,`n  fontSize: '2.5rem',
      fontWeight: 500
    },
    h2: {,`n  fontSize: '2rem',
      fontWeight: 500
    },
    h3: {,`n  fontSize: '1.75rem',
      fontWeight: 500
    },
    h4: {,`n  fontSize: '1.5rem',
      fontWeight: 500
    },
    h5: {,`n  fontSize: '1.25rem',
      fontWeight: 500
    },
    h6: {,`n  fontSize: '1rem',
      fontWeight: 500
    }
  },
  components: {,`n  MuiButton: {,`n  styleOverrides: {,`n  root: {,`n  textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiPaper: {,`n  styleOverrides: {,`n  root: {,`n  borderRadius: 12
        }
      }
    },
    MuiAppBar: {,`n  styleOverrides: {,`n  root: {,`n  boxShadow: 'none'
        }
      }
    }
  }
};

const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {,`n  mode: 'light',
    primary: {,`n  main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {,`n  main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162'
    },
    background: {,`n  default: '#f5f5f5',
      paper: '#ffffff'
    }
  }
});

const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {,`n  mode: 'dark',
    primary: {,`n  main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5'
    },
    secondary: {,`n  main: '#f48fb1',
      light: '#fce4ec',
      dark: '#f06292'
    },
    background: {,`n  default: '#121212',
      paper: '#1e1e1e'
    }
  }
});

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'light' ? lightTheme : darkTheme};

export const useTheme = () => {
  const { mode} = useThemeStore();
  return getTheme(mode);};

export default getTheme('light');



`
