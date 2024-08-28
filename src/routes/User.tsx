import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import utils from 'utils';
import QueryLoader from 'components/QueryLoader';
import { UserInfoSkeleton } from 'components/Skeleton';

export default function UserRoute() {
  const { t } = useTranslation();
  const theme = useTheme();

  const { data } = utils.loaders.getUserInfo();

  const UserRowInfo = ({ label, data }: { label: string; data: string }) => (
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} gap={{ md: 1 }}>
      <Typography component="div" width={{ sm: '20%', md: '25%' }} variant="body2">
        {label}
      </Typography>
      <Typography component="div" variant="subtitle2">
        {data}
      </Typography>
    </Stack>
  );

  return (
    <>
      <Stack direction="column" gap={3}>
        <Stack direction="column" gap={2}>
          <Typography variant="h4" fontSize={{ md: 32 }} component="h1">
            {t('app.user.title')}
          </Typography>
          <Typography variant="body2" component="h2">
            {t('app.user.subtitle')}
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Stack
            bgcolor={theme.palette.background.paper}
            borderRadius={1}
            p={3}
            gap={{ xs: 2, md: 0 }}>
            <QueryLoader queryKey="userInfo" loaderComponent={<UserInfoSkeleton />}>
              <UserRowInfo
                label={t('app.user.info.name')}
                data={data?.name || utils.config.missingValue}
              />
              <UserRowInfo
                label={t('app.user.info.surname')}
                data={data?.familyName || utils.config.missingValue}
              />
              <UserRowInfo
                label={t('app.user.info.identifier')}
                data={data?.fiscalCode || utils.config.missingValue}
              />
              <UserRowInfo
                label={t('app.user.info.email')}
                data={data?.email || utils.config.missingValue}
              />
            </QueryLoader>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
