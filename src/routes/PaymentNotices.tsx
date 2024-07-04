import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PaymentNotice } from 'components/PaymentNotice';
import QueryLoader from 'components/QueryLoader';
import { PaymentNoticesList } from 'components/Skeleton';
import React from 'react';
import { useTranslation } from 'react-i18next';
import utils from 'utils';

export const PaymentNotices = () => {
  const { t } = useTranslation();
  const { data, isError } = utils.loaders.getPaymentNotices();

  console.log(data);

  return (
    <>
      <Typography mb={3} variant="h3" component="h1">
        {t('app.paymentNotices.title')}
      </Typography>
      <Stack height="100%" justifyContent={{ lg: 'space-between' }} component="main">
        <QueryLoader
          queryKey="paymentNotices"
          loaderComponent={<PaymentNoticesList />}
          atLeast={5000}>
          <Stack gap={5} component="section">
            {(() => {
              if (isError || !data) return <PaymentNotice.Error />;
              if (!data.length) return <PaymentNotice.Empty />;
              return (
                <>
                  <PaymentNotice.List paymentNoticesList={data} />
                  <PaymentNotice.Info />
                </>
              );
            })()}
          </Stack>
        </QueryLoader>
      </Stack>
    </>
  );
};
