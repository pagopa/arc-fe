import React from 'react';
import Transactions from 'components/Transactions/Transactions';
import IOAlert from 'components/Alerts/IOAlert';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import utils from 'utils';
import { TransactionsResponse } from '../../generated/data-contracts';
import { ArcRoutes } from './routes';
import { grey } from '@mui/material/colors';

export default function Dashboard() {
  const { t } = useTranslation();
  const transactions = useLoaderData();
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const rows = utils.converters.prepareRowsData({
    transactions: transactions as TransactionsResponse,
    status: { label: t('app.transactions.payed') },
    payee: { multi: t('app.transactions.multiEntities') },
    action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
  });

  return (
    <>
      <Stack
        flex={1}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ sm: 'center' }}
        gap={3}
        mb={5}>
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
      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        mb={2}>
        <Typography variant="h6" component="h2" marginInlineStart={{ xs: 1, sm: 0 }}>
          {t('app.dashboard.lastTransactions')}
        </Typography>
        <Button
          component={Link}
          to={ArcRoutes.TRANSACTIONS}
          sx={{ width: theme.spacing(10), justifyContent: 'flex-start' }}>
          {t('app.dashboard.seeAllTransactions')}
        </Button>
      </Stack>
      <Box bgcolor={grey['A200']} padding={mdUp ? 2 : 3} margin={!mdUp ? -3 : 0} marginTop={0}>
        <Transactions rows={rows} />
      </Box>
    </>
  );
}
