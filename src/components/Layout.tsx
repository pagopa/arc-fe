import { Container, Grid, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import style from 'src/utils/style';
import { LangCode } from '@pagopa/mui-italia';
import { Footer } from './Footer';

interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
  currentLanguage: LangCode;
  changeLanguage(langCode: LangCode): void;
}

export function Layout({ children, currentLanguage, changeLanguage }: LayoutProps) {
  const theme = useTheme();
  return (
    <Container
      maxWidth={'lg'}
      disableGutters
      sx={{
        bgcolor: theme.palette.background.default
      }}>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={3} height={`calc(100vh - (${style.header.height + style.footer.height}px))`}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer currentLanguage={currentLanguage} changeLanguage={changeLanguage} />
        </Grid>
      </Grid>
    </Container>
  );
}
