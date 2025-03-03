import React from 'react';
import { useLoaderData } from 'react-router-dom';
import utils from 'utils';
import QueryLoader from 'components/QueryLoader';
import { TransactionDetailsSkeleton } from 'components/Skeleton';
import { Retry, TransactionDetails } from 'components/Transactions';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function Notice() {
  const id = useLoaderData();
  const { data, isError, refetch } = utils.loaders.getNoticeDetails(id as string);
  const noticeDetailData = data && utils.converters.prepareNoticeDetailData(data);

  const { t } = useTranslation();

  if (isError) {
    return (
      <>
        <Typography
          variant="h2"
          fontSize={{ xs: 28, md: 32 }}
          sx={{ wordBreak: 'break-word' }}
          mb={3}>
          {t('app.transactionDetail.title')}
        </Typography>
        <Retry action={refetch} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.notice')} - ${t('app.title')} `}</title>
      </Helmet>
      <QueryLoader
        loaderComponent={<TransactionDetailsSkeleton />}
        queryKey="noticeDetails"
        atLeast={500}>
        {noticeDetailData && <TransactionDetails noticeData={noticeDetailData} />}
      </QueryLoader>
    </>
  );
}
