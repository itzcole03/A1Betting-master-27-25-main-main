import { CloudOff, Info, Refresh, WifiOff} from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Typography} from '@mui/material';
import React from 'react';

interface DataUnavailableMessageProps {
  title?: string
  message?: string
  errorType?: 'network' | 'api' | 'service' | 'maintenance';
  onRetry?: () => void;
  showRetryButton?: boolean
  severity?: 'info' | 'warning' | 'error';}

export const DataUnavailableMessage: React.FC<DataUnavailableMessageProps> = ({
  title = 'Live Data Unavailable',
  message = 'We are unable to load live data at the moment. This may be due to temporary service issues or network connectivity.',
  errorType = 'api',
  onRetry,
  showRetryButton = true,
  severity = 'warning'
}) => {
  const getIcon = () => {
    switch (errorType) {
      case 'network':
        return <WifiOff />;
      case 'api':
        return <CloudOff />;
      case 'service':
        return <Info />;
      case 'maintenance':
        return <Info />;
      default: return <Info />}
  };

  const getDefaultMessage = () => {
    switch (errorType) {
      case 'network':
        return 'Please check your internet connection and try again.';
      case 'api':
        return 'The data service is temporarily unavailable. Please try again later.';
      case 'service':
        return 'Our service is experiencing temporary issues. We are working to resolve this.';
      case 'maintenance':
        return 'We are performing scheduled maintenance. Please check back soon.';
      default: return message}
  };

  const displayMessage = message || getDefaultMessage();

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
        minHeight: '200px',
        width: '100%'
      }}>`n    >
      <Alert severity={severity}
        icon={getIcon()}
        sx={{
          maxWidth: '500px',
          width: '100%',
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}>`n      >
        <AlertTitle sx={{ fontWeight: 'bold', mb: 1}}>{title}</AlertTitle>

        <Typography variant='body2' color='text.secondary' sx={{ mb: 2}}>
          {displayMessage}
        </Typography>

        {showRetryButton && onRetry && (
          <Button variant='outlined'
            size='small'>`n            startIcon={<Refresh />}
            onClick={onRetry}
            sx={{ mt: 1}}
          >
            Try Again
          </Button>
        )}
      </Alert>
    </Box>
  )};

export default DataUnavailableMessage;





