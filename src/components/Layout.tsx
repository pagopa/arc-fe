import React from 'react';
import { Container, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { Outlet, useMatches } from 'react-router-dom';
import { RouteHandleObject } from 'models/Breadcrumbs';
import { Header } from './Header';

const defaultRouteHandle: RouteHandleObject = {
  sidebar: { visible: true },
  crumbs: { backButton: false, routeName: '', elements: [] }
};

export function Layout() {
  const matches = useMatches();

  const { crumbs, sidebar } = {
    ...defaultRouteHandle,
    ...(matches.find((match) => Boolean(match.handle))?.handle || {})
  } as RouteHandleObject;

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', height: '100vh', alignItems: 'baseline' }}>
      <Grid container height={'100%'} flexDirection="column" flexWrap={'nowrap'}>
        <Grid flexBasis={{ xs: 'fit-content' }} item xs={12} height="fit-content">
          <Header />
        </Grid>
        <Grid item display={'flex'} flexGrow={1} flexWrap={'wrap'}>
          {sidebar?.visible ? <Sidebar /> : null}
          <Grid item bgcolor={grey['100']} padding={3} xs>
            <Breadcrumbs crumbs={crumbs} separator={<NavigateNext fontSize="small" />} />
            <Outlet />
          </Grid>
        </Grid>
        <Grid item xs={12} height="fit-content" flexBasis={{xs:'fit-content'}} flexShrink={3}> {/*xs is specified to override mui class.*/ }
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
