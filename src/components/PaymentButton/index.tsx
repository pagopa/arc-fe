import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PaymentButton = () => {
  const { t } = useTranslation();

  return (
    <Button variant="contained" size="large" href="https://uat.checkout.pagopa.it/" target="_blank">
      {t('app.dashboard.newPayment')}
    </Button>
  );
};

export default PaymentButton;
