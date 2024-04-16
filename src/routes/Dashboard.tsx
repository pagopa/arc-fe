import { Button, Stack, Typography } from '@mui/material';
import Tabs from 'src/components/Tabs';
import Transactions from 'src/components/Transactions/Transactions';

// TO BE REMOVED
import { dummyTransactionsData } from '../stories/utils/mocks';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h3">{t('app.dashboard.hello')}</Typography>
        <Button variant="contained" size="large">
          {t('app.dashboard.newPayment')}
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{t('app.dashboard.lastTransactions')}</Typography>
        <Button>{t('app.dashboard.lastTransactions')}</Button>
      </Stack>
      <Tabs
        initialActiveTab={0}
        hideTabs
        tabs={[
          {
            title: 'Last transactions',
            content: <Transactions rows={dummyTransactionsData.ownedByMe} />
          }
        ]}
      />
    </>
  );
}
