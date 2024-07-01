import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import utils from 'utils';

const PaymentButton = () => {
  const { t } = useTranslation();

  return (
    <Button variant="contained" size="large" href={utils.config.checkoutHost} target="_blank">
      {t('app.dashboard.newPayment')}
    </Button>
  );
};

export default PaymentButton;
