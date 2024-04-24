import React from 'react';
import { Container, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { Outlet, useMatches } from 'react-router-dom';
import { CrumbObject } from 'models/Breadcrumbs';

export function Layout() {
  const matches = useMatches();
  const crumbs = (matches.find((match) => Boolean(match.handle))?.handle as CrumbObject)?.crumb;
  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Sidebar />
        <Grid item bgcolor={grey['100']} padding={4} xs>
          <Breadcrumbs crumbs={crumbs} separator={<NavigateNext fontSize="small" />} />

          <Outlet />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
