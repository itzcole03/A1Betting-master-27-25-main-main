import { createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {,`n  mode: 'dark',
    primary: {,`n  main: '#2196f3'
    },
    secondary: {,`n  main: '#f50057'
    },
    background: {,`n  default: '#121212',
      paper: '#1e1e1e'
    }
  },
  typography: {,`n  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {,`n  fontWeight: 600
    },
    h6: {,`n  fontWeight: 600
    }
  },
  components: {,`n  MuiCard: {,`n  styleOverrides: {,`n  root: {,`n  backgroundColor: '#1e1e1e',
          borderRadius: 8
        }
      }
    },
    MuiCardContent: {,`n  styleOverrides: {,`n  root: {,`n  padding: 24
        }
      }
    }
  }
});

export default theme;


`
