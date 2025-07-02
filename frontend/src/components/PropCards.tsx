import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Chip, Skeleton} from '@mui/material';
import { TrendingUp as TrendingUpIcon} from '@mui/icons-material';
import { useAppStore} from '@/stores/useAppStore';

interface Prop {
  id: string
,`n  title: string;
,`n  description: string
,`n  odds: number;
,`n  category: string
,`n  confidence: number;
,`n  prediction: string}

interface PropCardsProps {
  data: Prop[0]
,`n  isLoading: boolean}

export const PropCards: React.FC<PropCardsProps key={962906}> = ({ data, isLoading}) => {
  const { addToBetSlip} = useAppStore();

  if (isLoading) {
    return (
      <Grid container spacing={2} key={272161}>
        {[1, 2, 3, 4].map(index => (
          <Grid key={index} item md={4} sm={6} xs={12} key={937628}>
            <Card key={650115}>
              <CardContent key={452065}>
                <Skeleton variant="text" width="60%" / key={884479}>
                <Skeleton variant="text" width="40%" / key={868871}>
                <Skeleton variant="text" width="80%" / key={759876}>
                <Box sx={{ mt: 2}} key={337181}>
                  <Skeleton height={36} variant="rectangular" / key={543911}>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}

  return (
    <Grid container spacing={2} key={272161}>
      {data.map(prop => (
        <Grid key={prop.id} item md={4} sm={6} xs={12} key={370235}>
          <Card key={650115}>
            <CardContent key={452065}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1}} key={386900}>
                <Typography component="div" variant="h6" key={277111}>
                  {prop.title}
                </Typography>
                <Chip color="primary" label={prop.category} size="small" variant="outlined" / key={205159}>
              </Box>

              <Typography gutterBottom color="text.secondary" key={774111}>
                {prop.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}} key={838256}>
                <TrendingUpIcon color="success" sx={{ mr: 1}} / key={138070}>
                <Typography color="success.main" variant="body2" key={412211}>
                  {prop.prediction}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={875362}>
                <Typography color="primary" variant="h6" key={397198}>
                  {prop.safeNumber(odds, 2)}
                </Typography>
                <Button;
                  color="primary"
                  variant="contained"
                  onClick={() = key={44811}>
                    addToBetSlip({
                      id: prop.id,
                      selection: prop.title,
                      odds: prop.odds,
                      stake: 0
                    })}
                >
                  Add to Bet Slip;
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )};

export default React.memo(PropCards);




`
