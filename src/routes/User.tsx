import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function UserRoute() {
  const { t } = useTranslation();
  const theme = useTheme();

  const UserRowInfo = ({ label, data }: { label: string; data: string }) => (
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} gap={{ md: 1 }}>
      <Typography component="div" width="170px" variant="body2">
        {label}
      </Typography>
      <Typography component="div" variant="subtitle1" fontSize="1rem">
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
          <Typography variant="body1" component="h2">
            {t('app.user.subtitle')}
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Stack
            bgcolor={theme.palette.background.paper}
            borderRadius={1}
            p={3}
            gap={{ xs: 2, md: 0 }}>
            <UserRowInfo label={t('app.user.info.name')} data="Matteo" />
            <UserRowInfo label={t('app.user.info.surname')} data="Rossi" />
            <UserRowInfo label={t('app.user.info.identifier')} data="MTTRSS74B23F205K" />
            <UserRowInfo label={t('app.user.info.channelCode')} data="97735020584_01" />
            <UserRowInfo label={t('app.user.info.email')} data="matteo.rossi@email.com" />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
