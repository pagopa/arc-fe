import React from 'react';
import Tabs from 'components/Tabs';
import { TransactionsList, TransactionProps } from 'components/Transactions';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QueryLoader from 'components/QueryLoader';
import { useNormalizedNoticesList } from 'hooks/useNormalizedNoticesList';
import Empty from 'components/Transactions/Empty';
import Retry from 'components/Transactions/Retry';
import { TransactionListSkeleton } from 'components/Skeleton';
import { PaginationItem } from '@mui/material';

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
    continuationToken?: string;
    /** date order, the only one avaiable. default DESC */
    ordering?: 'ASC' | 'DESC';
  }>({ continuationToken: '', ordering: 'DESC' });

  const [activeTab, setActiveTab] = React.useState(NoticesTabs.all);
  const [currentPage, setCurrentPages] = React.useState(0);
  const [dateOrdering, setDateOrdering] = React.useState<'ASC' | 'DESC'>('DESC');
  const [pages, setPages] = React.useState(['']);

  // console.log(
  //   'activeTab',
  //   activeTab,
  //   'currentPage',
  //   currentPage,
  //   'dateOrder',
  //   dateOrder,
  //   'pages',
  //   pages
  // );

  const { t } = useTranslation();

  const noticesList = useNormalizedNoticesList(noticeQueryParams);

  const {
    queryResult: { data, error, refetch }
  } = noticesList;

  const resetPagination = () => {
    setCurrentPages(0);
    setPages(['']);
  };

  const resetDateOrdering = () => {
    setDateOrdering('DESC');
  };

  const toggleDateOrder = () => {
    resetPagination();
    const newDateOrdering = dateOrdering === 'DESC' ? 'ASC' : 'DESC';
    setDateOrdering(newDateOrdering);
    setNoticeQueryParams({
      ...noticeQueryParams,
      ordering: newDateOrdering,
      continuationToken: ''
    });
  };

  const onTabChange = (activeTab: NoticesTabs) => {
    resetPagination();
    resetDateOrdering();
    setActiveTab(activeTab);
    switch (activeTab) {
      case NoticesTabs.all:
        setNoticeQueryParams({});
        break;
      case NoticesTabs.paidByMe:
        setNoticeQueryParams({ paidByMe: true });
        break;
      case NoticesTabs.registeredToMe:
        setNoticeQueryParams({ registeredToMe: true });
    }
  };

  const goToPage = (direction: number) => {
    const pageIndex = currentPage + direction;
    setCurrentPages(pageIndex);
    setNoticeQueryParams({ ...noticeQueryParams, continuationToken: pages[pageIndex] });
  };

  React.useEffect(() => {
    (async () => {
      const response = await refetch();
      const continuationToken = response.data?.continuationToken;
      // if no token is returned we reach the end
      if (!continuationToken) return;
      // is a new token? if not, no need to update the token pages array
      const isNewToken = !pages.find((oldToken) => oldToken === continuationToken);
      if (isNewToken) setPages([...pages, continuationToken]);
    })();
  }, [currentPage, activeTab, dateOrdering]);

  const MainContent = ({
    all,
    paidByMe,
    registeredToMe
  }: {
    all: TransactionProps[];
    paidByMe: TransactionProps[];
    registeredToMe: TransactionProps[];
  }) => {
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
                  rows={all}
                  dateOrdering={dateOrdering}
                  onDateOrderClick={toggleDateOrder}
                />
              )
            },
            {
              title: t('app.transactions.paidByMe'),
              content: (
                <TransactionsList
                  rows={paidByMe}
                  dateOrdering={dateOrdering}
                  onDateOrderClick={toggleDateOrder}
                />
              )
            },
            {
              title: t('app.transactions.ownedByMe'),
              content: (
                <TransactionsList
                  rows={registeredToMe}
                  dateOrdering={dateOrdering}
                  onDateOrderClick={toggleDateOrder}
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
      />
      <PaginationItem
        disabled={pages[currentPage + 1] === undefined}
        onClick={() => goToPage(+1)}
        size="medium"
        type="next"
      />
    </Stack>
  );

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts.pageTitle')}</Typography>
      </Stack>

      <QueryLoader loaderComponent={<TransactionListSkeleton />} queryKey="noticesList">
        {(() => {
          if (error || !data || !data.noticesList.notices) return <Retry action={refetch} />;
          if (data.noticesList.notices?.length === 0) return <Empty />;
          return (
            <>
              <MainContent
                all={noticesList.all}
                paidByMe={noticesList.paidByMe}
                registeredToMe={noticesList.registeredToMe}
              />
            </>
          );
        })()}
      </QueryLoader>
      {pages.length > 1 && <Pagination />}
    </>
  );
}
