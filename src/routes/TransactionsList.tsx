import React from 'react';
import Tabs from 'components/Tabs';
import Transactions from 'components/Transactions/Transactions';
import { Box, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Search } from '@mui/icons-material';
import { theme } from '@pagopa/mui-italia';
import { AxiosResponse } from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import utils from 'utils';
import { TransactionsResponse } from '../../generated/apiClient';
import { ArcRoutes } from './routes';

export default function TransactionsList() {
  const { t } = useTranslation();
  const transactions = useLoaderData();
  const navigate = useNavigate();

  const rows = utils.converters.prepareRowsData({
    transactions: (transactions as AxiosResponse<TransactionsResponse>).data,
    status: { label: t('app.transactions.payed') },
    payee: { multi: t('app.transactions.multiEntities') },
    action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
  });
  const paidByMe = utils.converters.prepareRowsData({
    transactions: (transactions as AxiosResponse<TransactionsResponse>).data.filter(
      ({ payedByMe }) => payedByMe
    ),
    status: { label: t('app.transactions.payed') },
    payee: { multi: t('app.transactions.multiEntities') },
    action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
  });

  const ownedByMe = utils.converters.prepareRowsData({
    transactions: (transactions as AxiosResponse<TransactionsResponse>).data.filter(
      ({ payedByMe }) => !payedByMe
    ),
    status: { label: t('app.transactions.payed') },
    payee: { multi: t('app.transactions.multiEntities') },
    action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
  });

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts')}</Typography>
      </Stack>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={9}>
          <TextField
            role="textbox"
            aria-required="false"
            aria-label={t('app.transactions.searchByName')}
            size="small"
            fullWidth={true}
            label={t('app.transactions.searchByName')}
            InputLabelProps={{
              sx: {
                color: theme.palette.text.secondary,
                fontWeight: 600
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
        </Grid>
        <Grid item xs={3}>
          <Box>
            <TextField
              color="primary"
              size="small"
              fullWidth={true}
              aria-label={t('app.transactions.orderBy')}
              role="listbox"
              label={t('app.transactions.orderBy')}
              SelectProps={{
                sx: {
                  fontSize: theme.typography.body2,
                  fontWeight: 600,
                  background: 'white'
                }
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.text.secondary,
                  fontWeight: 600
                }
              }}
              select>
              <MenuItem role="option" selected value="it-health-code">
                {t('app.transactions.mostRecent')}
              </MenuItem>
              <MenuItem role="option" selected value="it-health-code">
                {t('app.transactions.leastRecent')}
              </MenuItem>
              <MenuItem role="option" selected value="it-health-code">
                {t('app.transactions.lowerAmount')}
              </MenuItem>
              <MenuItem role="option" selected value="it-health-code">
                {t('app.transactions.higherAmount')}
              </MenuItem>
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <Tabs
        ariaLabel="tabs"
        initialActiveTab={0}
        tabs={[
          {
            title: t('app.transactions.all'),
            content: <Transactions rows={rows} />
          },
          {
            title: t('app.transactions.paidByMe'),
            content: <Transactions rows={paidByMe} />
          },
          {
            title: t('app.transactions.ownedByMe'),
            content: <Transactions rows={ownedByMe} />
          }
        ]}
      />
    </>
  );
}
