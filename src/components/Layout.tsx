import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Sidebar />
        <Grid item bgcolor={grey['100']} padding={4} xs>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} />

            <Outlet />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
