import React from 'react';
import { Alert as MuiAlert, AlertProps, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';

export type InfoAlertProps = {
  variant?: AlertProps['variant'];
  severity?: AlertProps['severity'];
  message: string;
  action: {
    href: string;
    message: string;
  };
};

export const Alert = ({
  message,
  action,
  variant = 'outlined',
  severity = 'info'
}: InfoAlertProps) => (
  <MuiAlert
    severity={severity}
    variant={variant}
    sx={{
      '& .MuiAlert-message': {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 1,
        justifyContent: 'space-between'
      }
    }}>
    <Typography variant="body2" width="80%">
      {message}
    </Typography>
    <ButtonNaked color="primary" href={action.href} target="_blank">
      {action.message}
    </ButtonNaked>
  </MuiAlert>
);
