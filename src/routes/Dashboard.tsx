import React from 'react';
import IOAlert from 'components/Alerts/IOAlert';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import utils from 'utils';
import { ArcRoutes } from './routes';
import { grey } from '@mui/material/colors';
import Transactions from 'components/Transactions/Transactions';
import QueryLoader from 'components/QueryLoader';
import { PaymentNotice } from 'components/PaymentNotice';

const Dashboard = () => {
  const { t } = useTranslation();
  const { data, isError } = utils.loaders.getTransactions();
  const navigate = useNavigate();
  const theme = useTheme();

  const rows =
    data &&
    utils.converters.prepareRowsData({
      transactions: data.transactions,
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
      <Stack gap={5}>
        <IOAlert />
        <PaymentNotice.Preview />
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
      </Stack>
      <Box
        bgcolor={grey['A200']}
        padding={{ xs: 3, md: 2 }}
        margin={{ xs: -3, md: 0 }}
        marginTop={0}>
        <QueryLoader
          queryKey="transactions"
          // TODO: fallback component of behavior be defined
          fallback={isError && <p>Ops! Something went wrong, please try again</p>}>
          {rows && <Transactions rows={rows} />}
        </QueryLoader>
      </Box>
    </>
  );
};

export default Dashboard;
