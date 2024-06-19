import React from 'react';
import { Container, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { RouteHandleObject } from 'models/Breadcrumbs';
import { Header } from './Header';
import { BackButton } from './BackButton';
import { ArcRoutes } from 'routes/routes';

const defaultRouteHandle: RouteHandleObject = {
  sidebar: { visible: true },
  crumbs: { routeName: '', elements: [] },
  backButton: false
};

export function Layout() {
  const matches = useMatches();

  const { crumbs, sidebar, backButton, backButtonText } = {
    ...defaultRouteHandle,
    ...(matches.find((match) => Boolean(match.handle))?.handle || {})
  } as RouteHandleObject;

  const sidePadding = sidebar.visible ? 3 : { xs: 3, md: 12, lg: 27, xl: 34 };
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', height: '100%', minHeight: '100vh', alignItems: 'baseline' }}>
      <Grid container height={'100%'} minHeight="100vh" flexDirection="column" flexWrap={'nowrap'}>
        <Grid flexBasis={{ xs: 'fit-content' }} item xs={12} height="fit-content">
          <Header
            onAssistanceClick={() => {
              navigate(ArcRoutes.ASSISTANCE);
            }}
          />
        </Grid>
        <Grid item display={'flex'} flexGrow={1} alignContent={'flex-start'} flexBasis={'50vh'}>
          {sidebar?.visible ? <Sidebar /> : null}
          <Grid item bgcolor={grey['100']} padding={3} height={'100%'} xs paddingX={sidePadding}>
            {backButton && <BackButton text={backButtonText} />}
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
