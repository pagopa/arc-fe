import React from 'react';
import { Container, Grid, useTheme } from '@mui/material';
import utils from 'utils';
import { HeaderAccount } from '@pagopa/mui-italia';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export function PreLoginLayout({ children }: { children?: ReactJSXElement }) {
  const ASSISTANCE_MAIL = utils.config.assistanceLink;
  const onAssistanceClick = () => {
    window.open(`mailto:${ASSISTANCE_MAIL}`);
  };
  const theme = useTheme();

  return (
    <>
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
        <Grid
          container
          height={'100%'}
          minHeight="100vh"
          flexDirection="column"
          flexWrap={'nowrap'}>
          <Grid item flexBasis={{ xs: 'fit-content' }} xs={12} height="fit-content">
            <HeaderAccount
              rootLink={utils.config.pagopaLink}
              onAssistanceClick={onAssistanceClick}
              enableLogin={false}
            />
          </Grid>
          <Grid
            item
            flex={'1'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}>
            {children || <Outlet />}
          </Grid>
          <Grid
            item
            xs={12}
            mt="auto"
            height="fit-content"
            flexBasis={{ xs: 'fit-content' }}
            flexShrink={3}>
            {/*xs in flex basis is specified to override mui clas.*/}
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
