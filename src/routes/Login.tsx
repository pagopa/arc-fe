import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';

import { HeaderAccount } from '@pagopa/mui-italia';
import utils from 'utils';
import { useTranslation } from 'react-i18next';
import { Footer } from 'components/Footer';
import { Logout } from '@mui/icons-material';

const Login = () => {
  const { t } = useTranslation();
  const onAssistanceClick = () => {};
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        height: '100%',
        minHeight: '100vh',
        alignItems: 'baseline',
        bgcolor: theme.palette.background.default
      }}>
      <Grid container height={'100%'} minHeight="100vh" flexDirection="column" flexWrap={'nowrap'}>
        <Grid flexBasis={{ xs: 'fit-content' }} item xs={12} height="fit-content">
          <HeaderAccount
            rootLink={utils.config.pagopaLink}
            onAssistanceClick={onAssistanceClick}
            enableLogin={false}
          />
        </Grid>
        <Grid
          item
          display={'flex'}
          marginTop={16}
          marginBottom={16}
          flexWrap={'wrap'}
          justifyContent={'center'}>
          {' '}
          <Box width={'100%'}>
            <Stack textAlign={'center'} justifyContent={'center'} alignItems={'center'} spacing={4}>
              <Stack spacing={2}>
                <Typography variant="h3">{t('app.login.title')}</Typography>
                <Typography variant="body1">{t('app.login.description')}</Typography>
              </Stack>
              <Card
                raised
                sx={{
                  borderRadius: '16px',
                  padding: 2,
                  width: '100%',
                  maxWidth: '25%' //I used SEND's login page as a reference for sizes, since the design is in pixels.
                }}>
                <CardActions>
                  <Stack spacing={2} width={'100%'}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<SpidIcon />}
                      fullWidth
                      role="button"
                      aria-label={t('app.login.spid')}
                      sx={{ paddingX: 11 }}>
                      {t('app.login.spid')}
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      role="button"
                      aria-label={t('app.login.cie')}
                      fullWidth
                      startIcon={<CieIcon />}>
                      {t('app.login.cie')}
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
              <Typography variant="body1">
                {`${t('app.login.terms1')}`} <Link fontWeight={700}>{t('app.login.terms2')}</Link>
                {` ${t('app.login.terms3')}`}
                <Link fontWeight={700}>{t('app.login.terms4')}</Link>
              </Typography>
              <Card
                sx={{
                  backgroundColor: alpha('rgba(250, 250, 250)', 1),
                  borderRadius: 1,
                  width: '100%',
                  maxWidth: '25%',

                  borderLeft: 'solid',
                  borderLeftWidth: 4,
                  borderLeftColor: theme.palette.primary.main
                }}>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant="body1" fontWeight={600} gutterBottom>
                    {t('app.login.areYouAnEnterprise')}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body1" fontWeight={600} color={theme.palette.primary.main}>
                      {t('app.login.accessYourArea')}
                    </Typography>
                    <ReactRouterLink to="" aria-label={t('app.login.accessYourArea')} role="link">
                      <Logout color="primary" />
                    </ReactRouterLink>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} height="fit-content" flexBasis={{ xs: 'fit-content' }} flexShrink={3}>
          {/*xs in flex basis is specified to override mui clas.*/}
          <Footer loggedUser={false} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
