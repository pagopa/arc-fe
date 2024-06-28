import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';
import PaymentButton from 'components/PaymentButton';
import { useTranslation } from 'react-i18next';

const Empty = () => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ padding: 4 }}>
      <Stack alignItems="center" spacing={3}>
        <Typography variant="body2" fontWeight={600}>
          {t('app.transactions.empty.title')}
        </Typography>
        <Typography variant="body2">{t('app.transactions.empty.subtitle')}</Typography>
        <PaymentButton />
      </Stack>
    </Paper>
  );
};

export default Empty;
