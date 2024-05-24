import React from 'react';
import { Alert, Button, Typography } from '@mui/material';
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
          alignItems: 'center'
        }
      }}>
      <Typography variant="body2" marginInlineStart={1}>
        {t('app.dashboard.IOAlert.title')}
      </Typography>
      <Button>{t('app.dashboard.IOAlert.cta')}</Button>
    </Alert>
  );
};

export default IOAlert;
