import React from 'react';
import { Card, CardContent, LinearProgress, Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PaymentNoticesList = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <Card>
        <CardContent sx={{ padding: 3 }}>
          <Typography variant="body1" mb={3} textAlign="center">
            {t('app.paymentNotices.loading')}
          </Typography>
          <LinearProgress />
        </CardContent>
      </Card>

      {Array.from({ length: 4 }, (_, i) => (
        <Card key={i}>
          <CardContent sx={{ padding: 3 }}>
            <Skeleton variant="rounded" height={60} />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default PaymentNoticesList;
