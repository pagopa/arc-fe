import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { togglePaymentTypeDrawerVisibility } from 'store/PaymentTypeDrawerVisibilityStore';

const PaymentButton = () => {
  const { t } = useTranslation();

  return (
    <Button variant="contained" size="large" onClick={togglePaymentTypeDrawerVisibility}>
      {t('app.dashboard.newPayment')}
    </Button>
  );
};

export default PaymentButton;
