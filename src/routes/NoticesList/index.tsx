import React from 'react';
import Tabs from 'components/Tabs';
import { TransactionsList, TransactionProps } from 'components/Transactions';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QueryLoader from 'components/QueryLoader';
import Empty from 'components/Transactions/Empty';
import Retry from 'components/Transactions/Retry';
import NoData from 'components/Transactions/NoData';
import { TransactionListSkeleton } from 'components/Skeleton';
import { PaginationItem } from '@mui/material';
import utils from 'utils';
import { Helmet } from 'react-helmet';

enum NoticesTabs {
  all,
  paidByMe,
  registeredToMe
}

export default function NoticesListPage() {
  const [noticeQueryParams, setNoticeQueryParams] = React.useState<{
    paidByMe?: boolean;
    registeredToMe?: boolean;
    /** continuation token, used to paginate the elements */
    continuationToken: string;
    /** date order, the only one avaiable. default DESC */
    ordering: 'ASC' | 'DESC';
  }>({ continuationToken: '', ordering: 'DESC' });

  const [activeTab, setActiveTab] = React.useState(NoticesTabs.all);
  const [currentPage, setCurrentPages] = React.useState(0);
  const [pages, setPages] = React.useState(['']);

  const { t } = useTranslation();

  const queryResult = utils.loaders.getNoticesList(
    {
      size: 10,
      ordering: noticeQueryParams.ordering,
      paidByMe: noticeQueryParams.paidByMe,
      registeredToMe: noticeQueryParams.registeredToMe
    },
    noticeQueryParams.continuationToken,
    [activeTab, currentPage, noticeQueryParams.ordering]
  );

  const { isError, refetch, isFetching, dataUpdatedAt } = queryResult;

  const data = utils.converters.prepareRowsData({
    notices: queryResult.data?.notices || [],
    status: { label: t('app.transactions.paid') },
    payee: { multi: t('app.transactions.multiEntities') }
  });

  const resetPagination = () => {
    setCurrentPages(0);
    setPages(['']);
  };

  const toggleDateOrder = () => {
    resetPagination();
    const newDateOrdering = noticeQueryParams.ordering === 'DESC' ? 'ASC' : 'DESC';
    setNoticeQueryParams({
      ...noticeQueryParams,
      ordering: newDateOrdering,
      continuationToken: ''
    });
  };

  const onTabChange = (activeTab: NoticesTabs) => {
    resetPagination();
    setActiveTab(activeTab);
    switch (activeTab) {
      case NoticesTabs.all:
        setNoticeQueryParams({
          ordering: 'DESC',
          continuationToken: '',
          registeredToMe: undefined,
          paidByMe: undefined
        });
        break;
      case NoticesTabs.paidByMe:
        setNoticeQueryParams({
          ordering: 'DESC',
          continuationToken: '',
          paidByMe: true,
          registeredToMe: undefined
        });
        break;
      case NoticesTabs.registeredToMe:
        setNoticeQueryParams({
          ordering: 'DESC',
          continuationToken: '',
          registeredToMe: true,
          paidByMe: undefined
        });
    }
  };

  const goToPage = (direction: number) => {
    const pageIndex = currentPage + direction;
    setCurrentPages(pageIndex);
    setNoticeQueryParams({ ...noticeQueryParams, continuationToken: pages[pageIndex] });
  };

  React.useEffect(() => {
    (async () => {
      const continuationToken = queryResult.data?.continuationToken;
      // if no token is returned we reach the end
      if (!continuationToken) return;
      // is a new token? if not, no need to update the token pages array
      const isNewToken = !pages.find((oldToken) => oldToken === continuationToken);
      if (isNewToken) setPages((prevPages) => [...prevPages, continuationToken]);
    })();
  }, [queryResult.data?.continuationToken, dataUpdatedAt]); // in same circustances the token is the same, so we need to check the dateUpdatedAt, see P4PU-892

  console.log(queryResult.data?.continuationToken);
  const MainContent = ({ data }: { data: TransactionProps[] }) => {
    return (
      <>
        <Tabs
          ariaLabel="tabs"
          initialActiveTab={activeTab}
          onChange={onTabChange}
          tabs={[
            {
              title: t('app.transactions.all'),
              content: (
                <TransactionsList
                  rows={data}
                  dateOrdering={noticeQueryParams.ordering}
                  onDateOrderClick={toggleDateOrder}
                />
              )
            },
            {
              title: t('app.transactions.paidByMe'),
              content: data.length ? (
                <TransactionsList
                  rows={data}
                  dateOrdering={noticeQueryParams.ordering}
                  onDateOrderClick={toggleDateOrder}
                />
              ) : (
                <NoData
                  title={t('app.paymentNotice.filtered.nodata.paidByMe.title')}
                  text={t('app.paymentNotice.filtered.nodata.paidByMe.text')}
                />
              )
            },
            {
              title: t('app.transactions.ownedByMe'),
              content: data.length ? (
                <TransactionsList
                  rows={data}
                  dateOrdering={noticeQueryParams.ordering}
                  onDateOrderClick={toggleDateOrder}
                />
              ) : (
                <NoData
                  title={t('app.paymentNotice.filtered.nodata.ownedByMe.title')}
                  text={t('app.paymentNotice.filtered.nodata.ownedByMe.text')}
                />
              )
            }
          ]}
        />
      </>
    );
  };

  const Pagination = () => (
    <Stack direction={'row'} justifyContent={'end'} pt={2}>
      <PaginationItem
        disabled={currentPage === 0}
        onClick={() => goToPage(-1)}
        size="medium"
        type="previous"
        data-testid="notices-pagination-prev"
      />
      <PaginationItem
        disabled={pages[currentPage + 1] === undefined}
        onClick={() => goToPage(+1)}
        size="medium"
        type="next"
        data-testid="notices-pagination-next"
      />
    </Stack>
  );

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.notices')} - ${t('app.title')} `}</title>
      </Helmet>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts.pageTitle')}</Typography>
      </Stack>

      <QueryLoader loaderComponent={<TransactionListSkeleton />} loading={isFetching}>
        {(() => {
          if (isError) return <Retry action={refetch} />;
          //** this means that the Empty component needs to be displayed only for 'all' Tab */
          if (data.length === 0 && activeTab === NoticesTabs.all) return <Empty />;
          return <MainContent data={data} />;
        })()}
      </QueryLoader>

      {pages.length > 1 && <Pagination />}
    </>
  );
}
