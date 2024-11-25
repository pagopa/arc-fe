import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NoData = () => {
  const { t } = useTranslation();
  return (
    <Typography
      variant="body2"
      fontWeight={600}
      data-testid="app.paymentNotice.filtered.noData"
      textAlign="center">
      {t('app.paymentNotice.filtered.noData')}
    </Typography>
  );
};

export default NoData;
