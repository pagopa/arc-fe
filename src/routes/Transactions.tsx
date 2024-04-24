import React from 'react';
import Tabs from 'components/Tabs';
import Transactions from 'components/Transactions/Transactions';
import { Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// TO BE REMOVED
import { dummyTransactionsData } from '../stories/utils/mocks';
import { Search } from '@mui/icons-material';
import { theme } from '@pagopa/mui-italia';

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h3">{t('menu.receipts')}</Typography>
        <Button
          variant="contained"
          size="large"
          href="https://uat.checkout.pagopa.it/"
          target="_blank">
          {t('app.dashboard.newPayment')}
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          size="small"
          fullWidth={true}
          label={t('app.transactions.searchByName')}
          InputLabelProps={{
            sx: {
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        
      </Stack>
      <Tabs
        initialActiveTab={0}
        tabs={[
          {
            title: t('app.transactions.all'),
            content: <Transactions rows={dummyTransactionsData.all} />
          },
          {
            title: t('app.transactions.paidByMe'),
            content: <Transactions rows={dummyTransactionsData.payedByMe} />
          },
          {
            title: t('app.transactions.ownedByMe'),
            content: <Transactions rows={dummyTransactionsData.ownedByMe} />
          }
        ]}
      />
    </>
  );
}
