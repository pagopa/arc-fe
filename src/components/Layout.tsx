import React from 'react';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { Outlet, useMatches } from 'react-router-dom';
import { RouteHandleObject } from 'models/Breadcrumbs';
import { Header } from './Header';
import { BackButton } from './BackButton';
import { theme } from '@pagopa/mui-italia';

const defaultRouteHandle: RouteHandleObject = {
  sidebar: { visible: true },
  crumbs: { routeName: '', elements: [] },
  backButton: false
};

export function Layout() {
  const matches = useMatches();

  const { crumbs, sidebar, backButton } = {
    ...defaultRouteHandle,
    ...(matches.find((match) => Boolean(match.handle))?.handle || {})
  } as RouteHandleObject;

  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));

  const sidePadding = sidebar.visible ? 3 : xl ? 34.6 : lg ? 27.3 : md ? 12 : 3;

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', height: '100%', minHeight: '100vh', alignItems: 'baseline' }}>
      <Grid container height={'100%'} minHeight="100vh" flexDirection="column" flexWrap={'nowrap'}>
        <Grid flexBasis={{ xs: 'fit-content' }} item xs={12} height="fit-content">
          <Header />
        </Grid>
        <Grid
          item
          display={'flex'}
          flexGrow={1}
          flexWrap={'wrap'}
          alignContent={'flex-start'}
          flexBasis={'50vh'}>
          {sidebar?.visible ? <Sidebar /> : null}
          <Grid
            item
            bgcolor={grey['100']}
            padding={3}
            height={'100%'}
            xs
            paddingLeft={sidePadding}
            paddingRight={sidePadding}>
            {backButton && <BackButton />}
            {crumbs && (
              <Breadcrumbs crumbs={crumbs} separator={<NavigateNext fontSize="small" />} />
            )}
            <Outlet />
          </Grid>
        </Grid>
        <Grid item xs={12} height="fit-content" flexBasis={{ xs: 'fit-content' }} flexShrink={3}>
          {/*xs in flex basis is specified to override mui clas.*/}
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
