import React from 'react';
import Tabs from 'components/Tabs';
import Transactions from 'components/Transactions/Transactions';
import {
  Box,
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

// TO BE REMOVED
import { dummyTransactionsData } from '../stories/utils/mocks';
import { Search } from '@mui/icons-material';
import { theme } from '@pagopa/mui-italia';

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts')}</Typography>
      </Stack>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={9}>
          <TextField
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
            <FormControl fullWidth>
              <InputLabel
                size="small"
                sx={{ fontWeight: 600, fontSize: theme.typography.body2.fontSize }}>
                {t('app.transactions.orderBy')}:
              </InputLabel>

              <Select
                id="search-by"
                label={t('app.transactions.searchBy')}
                labelId="search-by-label"
                size="small"
                fullWidth
                onChange={function noRefCheck() {}}
                value="">
                <MenuItem selected value="it-health-code">
                  {t('app.transactions.mostRecent')}
                </MenuItem>
                <MenuItem selected value="it-health-code">
                  {t('app.transactions.leastRecent')}
                </MenuItem>
                <MenuItem selected value="it-health-code">
                  {t('app.transactions.lowerAmount')}
                </MenuItem>
                <MenuItem selected value="it-health-code">
                  {t('app.transactions.higherAmount')}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
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
