import React from 'react';
import Tabs from 'components/Tabs';
import { TransactionsList, TransactionProps } from 'components/Transactions';
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Search } from '@mui/icons-material';
import { theme } from '@pagopa/mui-italia';
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
  }>({});
  const [activeTab, setActiveTab] = React.useState(NoticesTabs.all);

  const { t } = useTranslation();
  const noticesList = useNormalizedNoticesList(noticeQueryParams);

  const {
    queryResult: { data, error, refetch }
  } = noticesList;

  const onChange = (activeTab: NoticesTabs) => {
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
      <Tabs
        ariaLabel="tabs"
        initialActiveTab={activeTab}
        onChange={onChange}
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
    );
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
        <Typography variant="h3">{t('menu.receipts.pageTitle')}</Typography>
      </Stack>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={9}>
          <TextField
            role="textbox"
            aria-required="false"
            aria-label={t('app.transactions.searchByName')}
            size="small"
            fullWidth={true}
            label={t('app.transactions.searchByName')}
            InputLabelProps={{
              sx: {
                color: theme.palette.text.secondary,
                fontWeight: 600
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ display: 'block', minWidth: '100%' }}>
            <InputLabel id="transactions-filter-select">{t('app.transactions.orderBy')}</InputLabel>
            <Select
              color="primary"
              size="small"
              fullWidth={true}
              labelId="transactions-filter-select"
              label={t('app.transactions.orderBy')}>
              <MenuItem selected value="it-health-code">
                {t('app.transactions.mostRecent')}
              </MenuItem>
              <MenuItem value="it-health-code">{t('app.transactions.leastRecent')}</MenuItem>
              <MenuItem value="it-health-code">{t('app.transactions.lowerAmount')}</MenuItem>
              <MenuItem value="it-health-code">{t('app.transactions.higherAmount')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <QueryLoader loaderComponent={<TransactionListSkeleton />} queryKey="noticesList">
        {(() => {
          if (error || !data || !data.notices) return <Retry action={refetch} />;
          if (data.notices.length === 0) return <Empty />;
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
