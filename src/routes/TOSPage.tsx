import React, { useEffect } from 'react';
import { Box, Container, Grid, Stack, useTheme } from '@mui/material';
import { HeaderAccount } from '@pagopa/mui-italia';
import utils from 'utils';
import { Footer } from 'components/Footer';

const TOSPage = () => {
  const ASSISTANCE_MAIL = utils.config.assistanceLink;
  const onAssistanceClick = () => {
    window.open(`mailto:${ASSISTANCE_MAIL}`);
  };
  const theme = useTheme();

  useEffect(() => {
    OneTrust.NoticeApi.Initialized.then(function () {
      OneTrust.NoticeApi.LoadNotices(
        [
          'https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/draft/3f089590-8e93-4a08-86d4-40387d57cbad.json'
        ],
        false
      );
    });
  }, []);

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
              <Stack spacing={2} paddingX={1}></Stack>
              <div
                id="otnotice-3f089590-8e93-4a08-86d4-40387d57cbad"
                className="otnotice"></div>{' '}
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

export default TOSPage;
