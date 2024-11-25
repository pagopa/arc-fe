import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const _Info = () => {
  const { t } = useTranslation();
  return (
    <Stack
      padding={1.3}
      gap={1}
      justifyContent="flex-start"
      marginTop={{ xs: 10, lg: 0 }}
      component="aside">
      <Typography variant="body1" component="p">
        {t('app.paymentNotices.bottomAlert.info')}
      </Typography>
    </Stack>
  );
};
