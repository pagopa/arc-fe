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
import { Trans, useTranslation } from 'react-i18next';
import { Footer } from 'components/Footer';
import { Logout } from '@mui/icons-material';
import { getLogin } from 'utils/loaders';

const Login = () => {
  const { t } = useTranslation();
  const ASSISTANCE_MAIL = utils.config.assistanceLink;
  const onAssistanceClick = () => {
    window.open(`mailto:${ASSISTANCE_MAIL}`);
  };
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
          <Box width={'100%'}>
            <Stack textAlign={'center'} justifyContent={'center'} alignItems={'center'} spacing={4}>
              <Stack spacing={2} paddingX={1}>
                <Typography variant="h3">{t('app.login.title')}</Typography>
                <Typography variant="body1">{t('app.login.description')}</Typography>
              </Stack>
              <Card
                raised
                sx={{
                  borderRadius: 2,
                  padding: 2,
                  width: '100%',
                  maxWidth: { lg: '25%', xs: '75%', sm: '50%' } //I used SEND's login page as a reference for sizes, since the design is in pixels.
                }}>
                <CardActions>
                  <Stack spacing={2} width={'100%'}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<SpidIcon />}
                      role="button"
                      onClick={() => getLogin()}
                      sx={{
                        borderRadius: 2,
                        width: '100%',
                        marginBottom: 1
                      }}
                      aria-label={t('app.login.spid')}>
                      <Typography
                        sx={{
                          fontWeight: 'fontWeightMedium',
                          textAlign: 'center',
                          color: theme.palette.primary.contrastText
                        }}>
                        {t('app.login.spid')}
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      role="button"
                      aria-label={t('app.login.cie')}
                      fullWidth
                      onClick={() => window.location.replace('/api/login/oneidentity')}
                      sx={{
                        borderRadius: 1,
                        width: '100%',
                        marginBottom: 1
                      }}
                      startIcon={<CieIcon />}>
                      <Typography
                        sx={{
                          fontWeight: 'fontWeightMedium',
                          textAlign: 'center',
                          color: theme.palette.primary.contrastText
                        }}>
                        {t('app.login.cie')}
                      </Typography>
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
              <Grid item maxWidth={{ lg: '25%', xs: '75%', sm: '50%' }}>
                <Typography variant="body1">
                  <Trans
                    i18nKey={t('app.login.terms')}
                    components={{
                      link1: (
                        <Link href="#" fontWeight={800} />
                      ) /* I've kept two separate components because in the future we will have two different destination addresses which will be defined here. */,
                      link2: <Link href="#" fontWeight={800} />
                    }}
                  />
                </Typography>
              </Grid>
              <Card
                sx={{
                  backgroundColor: alpha('rgba(250, 250, 250)', 1),
                  borderRadius: 1,
                  width: '100%',
                  maxWidth: { lg: '25%', xs: '75%', sm: '50%' },
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
