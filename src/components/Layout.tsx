import React from 'react';
import { Container, Grid } from '@mui/material';
import { SxProps } from '@mui/system';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import style from 'src/utils/style';
import { grey } from '@mui/material/colors';

interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={3} height={`calc(100vh - (${style.header.height + style.footer.height}px))`}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} bgcolor={grey['100']} padding={4}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
