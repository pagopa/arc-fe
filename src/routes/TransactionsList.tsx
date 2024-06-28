import React from 'react';
import Tabs from 'components/Tabs';
import Transactions from 'components/Transactions/Transactions';
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Search } from '@mui/icons-material';
import { theme } from '@pagopa/mui-italia';
import { useNavigate } from 'react-router-dom';
import utils from 'utils';
import { ArcRoutes } from './routes';
import QueryLoader from 'components/QueryLoader';

export default function TransactionsList() {
  const { t } = useTranslation();
  const { data, isError } = utils.loaders.getTransactions();
  const navigate = useNavigate();

  const paidByMe =
    data &&
    utils.converters.prepareRowsData({
      transactions: data.transactions?.filter(({ payedByMe }) => payedByMe),
      status: { label: t('app.transactions.payed') },
      payee: { multi: t('app.transactions.multiEntities') },
      action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
    });

  const registeredToMe =
    data &&
    utils.converters.prepareRowsData({
      transactions: data.transactions?.filter(({ registeredToMe }) => registeredToMe),
      status: { label: t('app.transactions.payed') },
      payee: { multi: t('app.transactions.multiEntities') },
      action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
    });

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts')}</Typography>
      </Stack>
      <QueryLoader
        // TODO: fallback component of behavior be defined
        fallback={isError && <p>Ops! Something went wrong, please try again</p>}
        queryKey="transactions">
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
            <FormControl sx={{ display: 'block', minWidth: '100%' }}>
              <InputLabel id="transactions-filter-select">
                {t('app.transactions.orderBy')}
              </InputLabel>
              <Select
                color="primary"
                size="small"
                fullWidth={true}
                labelId="transactions-filter-select"
                label={t('app.transactions.orderBy')}>
                <MenuItem selected value="it-health-code">
                  {t('app.transactions.mostRecent')}
                </MenuItem>
                <MenuItem value="it-health-code">{t('app.transactions.leastRecent')}</MenuItem>
                <MenuItem value="it-health-code">{t('app.transactions.lowerAmount')}</MenuItem>
                <MenuItem value="it-health-code">{t('app.transactions.higherAmount')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {registeredToMe && paidByMe && (
          <Tabs
            ariaLabel="tabs"
            initialActiveTab={0}
            tabs={[
              {
                title: t('app.transactions.all'),
                content: <Transactions rows={paidByMe.concat(registeredToMe)} />
              },
              {
                title: t('app.transactions.paidByMe'),
                content: <Transactions rows={paidByMe} />
              },
              {
                title: t('app.transactions.ownedByMe'),
                content: <Transactions rows={registeredToMe} />
              }
            ]}
          />
        )}
      </QueryLoader>
    </>
  );
}
