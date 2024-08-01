import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PaymentNotice } from 'components/PaymentNotice';
import QueryLoader from 'components/QueryLoader';
import { PaymentNoticesListSkeleton } from 'components/Skeleton';
import React from 'react';
import { useTranslation } from 'react-i18next';
import utils from 'utils';

const Notices = () => {
  const { data, isError } = utils.loaders.getPaymentNotices();

  const Content = () => {
    if (isError || !data) return <PaymentNotice.Error />;
    if (!data.length) return <PaymentNotice.Empty />;
    const preparedData = utils.converters.preparePaymentNoticeListData(data);
    console.log(preparedData);

    return (
      <Stack gap={5} component="section">
        <PaymentNotice.List paymentNoticesList={preparedData} />
        <PaymentNotice.Info />
      </Stack>
    );
  };

  return (
    <QueryLoader
      queryKey="paymentNotices"
      loaderComponent={<PaymentNoticesListSkeleton />}
      atLeast={5000}>
      <Content />
    </QueryLoader>
  );
};

export const PaymentNotices = () => {
  const { t } = useTranslation();
  const optIn = utils.storage.pullPaymentsOptIn.get();

  return (
    <>
      <Typography mb={3} variant="h3" component="h1">
        {t('app.paymentNotices.title')}
      </Typography>
      <Stack height="100%" justifyContent={{ lg: 'space-between' }} component="main">
        {optIn.value ? <Notices /> : <PaymentNotice.Preview />}
      </Stack>
    </>
  );
};
