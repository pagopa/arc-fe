import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { getRouteObject } from 'routes/routes';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const path = getRouteObject(location.pathname);

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Sidebar />
        <Grid item bgcolor={grey['100']} padding={4} xs>
          <Stack spacing={3}>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} path={path} />

            {children}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
