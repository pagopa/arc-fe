import React from 'react';
import Tabs from 'components/Tabs';
import Transactions from 'components/Transactions/Transactions';
import IOAlert from 'components/Alerts/IOAlert';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import utils from 'utils';
import { AxiosResponse } from 'axios';
import { TransactionsResponse } from '../../generated/apiClient';

export default function Dashboard() {
  const { t } = useTranslation();
  const transactions = useLoaderData();
  const navigate = useNavigate();

  const rows = utils.converters.prepareRowsData(
    (transactions as AxiosResponse<TransactionsResponse>).data,
    t,
    navigate
  );

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
        <Typography variant="h6">{t('app.dashboard.lastTransactions')}</Typography>
        <Button>{t('app.dashboard.seeAllTransactions')}</Button>
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
