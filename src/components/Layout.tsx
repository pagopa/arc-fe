import React from 'react';
import { Container, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar/Sidebar';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Sidebar />
        <Grid item bgcolor={grey['100']} padding={4} xs>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
