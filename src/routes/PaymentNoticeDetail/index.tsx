import React from 'react';
import { PaymentNotice } from 'components/PaymentNotice';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from '@tanstack/react-query';
import { PaymentNoticeDetailsType } from 'models/PaymentNotice';
import { Typography } from '@mui/material';
import QueryLoader from 'components/QueryLoader';
import { PaymentNoticeDetails } from 'components/Skeleton';
import Retry from 'components/Transactions/Retry';

type NoticeDetailLoader = () => UseQueryResult<PaymentNoticeDetailsType, Error>;

export default function PaymentNoticeDetail() {
  // loader function is passed from the navigation router
  const noticeDetailQuery = useLoaderData() as NoticeDetailLoader;

  const { data: paymentNotice, isError, refetch } = noticeDetailQuery();

  const { t } = useTranslation();

  const Content = () => {
    if (isError || !paymentNotice) {
      return (
        <>
          <Typography variant="h4" component={'h1'} mb={3}>
            {t('app.paymentNoticeDetail.title')}
          </Typography>
          <Retry action={refetch} />
        </>
      );
    }
    return <PaymentNotice.Detail paymentNotice={paymentNotice} />;
  };

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.paymentnotice')} - ${t('app.title')} `}</title>
      </Helmet>
      <QueryLoader
        queryKey="paymentNoticeDetails"
        loaderComponent={<PaymentNoticeDetails />}
        atLeast={5000}>
        <Content />
      </QueryLoader>
    </>
  );
}
