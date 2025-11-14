import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QueryLoader from 'components/QueryLoader';
import Retry from 'components/Transactions/Retry';
import NoData from 'components/Transactions/NoData';
import { TransactionListSkeleton } from 'components/Skeleton';
import utils from 'utils';
import { Helmet } from 'react-helmet';
import config from 'utils/config';
import { useSearch } from 'hooks/useSearch';
import { ReceiptDataGrid } from './ReceiptDataGrid';

export default function NoticesListPage() {
  const { t } = useTranslation();
  // TODO: retrieve brokerId from context when available
  const brokerId = Number(config.brokerId);

  const mutation = utils.loaders.getPagedDebtorReceipts(brokerId);

  const { query, applyFilters } = useSearch({
    query: mutation
  });

  if (query.isError) return <Retry action={() => applyFilters()} />;

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.notices')} - ${t('app.title')} `}</title>
      </Helmet>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts.pageTitle')}</Typography>
      </Stack>

      <QueryLoader loaderComponent={<TransactionListSkeleton />} loading={query.isPending}>
        {query?.data?.content.length ? (
          <ReceiptDataGrid data={query.data} />
        ) : (
          <NoData
            title={t('app.paymentNotice.filtered.nodata.ownedByMe.title')}
            text={t('app.paymentNotice.filtered.nodata.ownedByMe.text')}
          />
        )}
      </QueryLoader>
    </>
  );
}
