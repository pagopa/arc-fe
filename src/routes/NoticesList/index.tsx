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
    token?: string;
  }>({});

  const [activeTab, setActiveTab] = React.useState(NoticesTabs.all);
  const [currentPage, setCurrentPages] = React.useState(0);
  const [pages, setPages] = React.useState(['']);

  const { t } = useTranslation();

  const noticesList = useNormalizedNoticesList(noticeQueryParams);

  const {
    queryResult: { data, error, refetch }
  } = noticesList;

  const onTabChange = (activeTab: NoticesTabs) => {
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
    setNoticeQueryParams({ ...noticeQueryParams, token: pages[pageIndex] });
  };

  // pages
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
  }, [currentPage]);

  // activetab
  React.useEffect(() => {
    refetch();
  }, [activeTab]);

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
              content: <TransactionsList rows={all} />
            },
            {
              title: t('app.transactions.paidByMe'),
              content: <TransactionsList rows={paidByMe} />
            },
            {
              title: t('app.transactions.ownedByMe'),
              content: <TransactionsList rows={registeredToMe} />
            }
          ]}
        />
        <button disabled={currentPage === 0} onClick={() => goToPage(-1)}>
          indietro
        </button>
        <button disabled={pages[currentPage + 1] === undefined} onClick={() => goToPage(+1)}>
          avanti
        </button>
      </>
    );
  };

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
            <MainContent
              all={noticesList.all}
              paidByMe={noticesList.paidByMe}
              registeredToMe={noticesList.registeredToMe}
            />
          );
        })()}
      </QueryLoader>
    </>
  );
}
