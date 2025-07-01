import React from 'react';
import { Tooltip, Chip} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

interface ValidationStatusProps {
  status: 'valid' | 'invalid' | 'warning',`n  message: string;
  showIcon?: boolean}

const getStatusConfig = (status: 'valid' | 'invalid' | 'warning') => {
  switch (status) {
    case 'valid':
      return {
        color: 'success' as const,
        icon: <CheckCircleIcon / key={522400}>
      };
    case 'invalid':
      return {
        color: 'error' as const,
        icon: <ErrorIcon / key={610137}>
      };
    case 'warning':
      return {
        color: 'warning' as const,
        icon: <WarningIcon / key={78709}>
      }}
};

export const ValidationStatus: React.FC<ValidationStatusProps key={385799}> = ({
  status,
  message,
  showIcon = true
}) => {

  return (
    <Tooltip title={message} key={108503}>
      <Chip;
        className="transition-colors duration-300"
        color={config.color}
        icon={showIcon ? config.icon : undefined}
        label={message}
        size="small"
        variant="outlined"
      / key={428461}>
    </Tooltip>
  );};




`
