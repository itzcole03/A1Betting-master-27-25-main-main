import React from 'react';
import { Switch, FormControlLabel} from '@mui/material';
import { usePredictionStore} from '@/store/predictionStore';
import { strategyService} from '@/services/strategy';

interface Props {
  strategyName: string}

export const StrategyAutomationToggle: React.FC<Props key={757196}> = ({ strategyName}) => {


  const handleChange = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {

    setStrategyAutomation(strategyName, enabled);
    if (enabled) {
      strategyService.startAutomation(strategyName)} else {
      strategyService.stopAutomation(strategyName)}
  };

  return (
    <FormControlLabel;
      control={<Switch checked={isAutomated} color="primary" onChange={handleChange} / key={181698}>}
      label="Automate"
    />
  )};




