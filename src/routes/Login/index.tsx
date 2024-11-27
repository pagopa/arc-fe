import React, { useEffect } from 'react';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import utils from 'utils';
import { useTranslation } from 'react-i18next';
import { LogoPagoPAProduct } from '@pagopa/mui-italia';
import { ArcRoutes } from 'routes/routes';

const Login = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  useEffect(() => {
    if (utils.storage.user.hasToken()) window.location.replace(ArcRoutes.DASHBOARD);
  }, []);

  return (
    <Grid
      item
      display={'flex'}
      marginTop={16}
      marginBottom={16}
      flexWrap={'wrap'}
      justifyContent={'center'}
      direction={'column'}>
      <Box width={'100%'}>
        <Stack textAlign={'center'} justifyContent={'center'} alignItems={'center'} spacing={4}>
          <LogoPagoPAProduct color="default" title="PagoPA" size={100} />
          <Typography variant="h1">{t('app.login.title')}</Typography>
          <Button
            variant="contained"
            size="large"
            role="button"
            onClick={() => window.location.replace(utils.config.loginUrl)}
            sx={{
              borderRadius: 2
            }}
            aria-label={t('app.login.login')}>
            <Typography
              sx={{
                fontWeight: 'fontWeightMedium',
                textAlign: 'center',
                color: theme.palette.primary.contrastText
              }}>
              {t('app.login.login')}
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default Login;
