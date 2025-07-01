import React from 'react';
import { Card, CardContent, Typography, Grid} from '@mui/material';
import { strategyService} from '@/services/strategy';
import { StrategyAutomationToggle} from '@/components/StrategyAutomationToggle';

export const StrategiesPage: React.FC = () => {

  return (
    <Grid container spacing={2} key={272161}>
      {strategies.map(strategy => (
        <Grid key={strategy.name} item md={6} xs={12} key={515669}>
          <Card key={650115}>
            <CardContent key={452065}>
              <Typography variant="h6" key={93421}>{strategy.name}</Typography>
              <Typography color="textSecondary" variant="body2" key={603568}>
                {strategy.description}
              </Typography>
              <StrategyAutomationToggle strategyName={strategy.name} / key={395370}>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )};



