import React from 'react';
import { useLoaderData } from 'react-router-dom';
import utils from 'utils';
import QueryLoader from 'components/QueryLoader';
import { TransactionDetailsSkeleton } from 'components/Skeleton';
import { TransactionDetails } from 'components/Transactions';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function Notice() {
  const id = useLoaderData();
  const { data, isError } = utils.loaders.getNoticeDetails(id as string);
  const noticeDetailData = data && utils.converters.prepareNoticeDetailData(data);

  const { t } = useTranslation();

  if (isError) {
    return <p id="transaction-detail-error">Ops! Something went wrong, please try again</p>;
  }

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.notice')} - ${t('app.title')} `}</title>
      </Helmet>
      <QueryLoader loaderComponent={<TransactionDetailsSkeleton />} queryKey="noticeDetail">
        {noticeDetailData && <TransactionDetails noticeData={noticeDetailData} />}
      </QueryLoader>
    </>
  );
}
