import React from 'react';
import { Alert, AlertTitle, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import style from '../../utils/style';

const IOAlert = () => {
  const { t } = useTranslation();

  return (
    <Alert
      severity="info"
      sx={{
        borderLeft: `solid 4px ${style.theme.palette.info.main}`,
        '& .MuiAlert-icon': {
          color: 'info.contrastText',
          alignItems: 'center'
        }
      }}>
      <AlertTitle sx={{ marginBottom: 0 }}>{t('app.dashboard.IOAlert.title')}</AlertTitle>
      <Typography variant="body2" mb={1}>
        {t('app.dashboard.IOAlert.description')}
      </Typography>
      <Button>{t('app.dashboard.IOAlert.cta')}</Button>
    </Alert>
  );
};

export default IOAlert;
