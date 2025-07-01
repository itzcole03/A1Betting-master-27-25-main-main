import React from 'react';
import { IconButton, useTheme} from '@mui/material';
import { Brightness4, Brightness7} from '@mui/icons-material';
import { useTheme as useCustomTheme} from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme} = useCustomTheme();


  return (
    <IconButton;
      aria-label="toggle theme"
      color="inherit"
      sx={{
        color: muiTheme.palette.text.primary,
        '&:hover': {
          bgcolor: muiTheme.palette.action.hover
        }
      }}
      onClick={theme.toggle}
     key={479101}>
      {isDark ? <Brightness7 / key={835748}> : <Brightness4 / key={722417}>}
    </IconButton>
  )};

export default React.memo(ThemeToggle);



