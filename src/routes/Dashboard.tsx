import React from 'react';
import Tabs from 'components/Tabs';
import Transactions from 'components/Transactions/Transactions';
import IOAlert from 'components/Alerts/IOAlert';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import utils from 'utils';
import { TransactionsResponse } from '../../generated/data-contracts';
import { ArcRoutes } from './routes';

export default function Dashboard() {
  const { t } = useTranslation();
  const transactions = useLoaderData();
  const navigate = useNavigate();

  const rows = utils.converters.prepareRowsData({
    transactions: transactions as TransactionsResponse,
    status: { label: t('app.transactions.payed') },
    payee: { multi: t('app.transactions.multiEntities') },
    action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
  });

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h3">{t('app.dashboard.hello')}</Typography>
        <Button
          variant="contained"
          size="large"
          href="https://uat.checkout.pagopa.it/"
          target="_blank">
          {t('app.dashboard.newPayment')}
        </Button>
      </Stack>
      <Stack mb={3}>
        <IOAlert />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="h2">
          {t('app.dashboard.lastTransactions')}
        </Typography>
        <Button component={Link} to={ArcRoutes.TRANSACTIONS}>
          {t('app.dashboard.seeAllTransactions')}
        </Button>
      </Stack>
      <Tabs
        initialActiveTab={0}
        hideTabs
        tabs={[
          {
            title: 'Last transactions',
            content: <Transactions rows={rows} />
          }
        ]}
      />
    </>
  );
}
