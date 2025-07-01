import React, { useEffect} from 'react';
import { Box} from '@mui/material';
import { BettingSettingsPanel} from './BettingSettingsPanel';
import { BettingSettingsSummary} from './BettingSettingsSummary';
import { useBettingSettings} from '@/hooks/useBettingSettings';

export const BettingSettingsContainer: React.FC = () => {
  const { fetchSettings} = useBettingSettings();

  useEffect(() => {
    fetchSettings();}, [fetchSettings]);

  return (
    <Box sx={{ p: 3}} key={486541}>
      <Box;
        sx={{
          display: 'grid',
          gridTemplateColumns: {,`n  xs: '1fr',
            md: '2fr 1fr'
          },
          gap: 3
        }}
       key={86819}>
        <BettingSettingsPanel / key={982092}>
        <BettingSettingsSummary / key={272268}>
      </Box>
    </Box>
  )};



`
