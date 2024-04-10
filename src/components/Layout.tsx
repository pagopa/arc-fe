import { Container, Grid, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import style from 'src/utils/style';

interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export type LangLabels = Partial<Record<LangCode, string>> & {
  it: string;
};

const it: Record<LangCode, string> = {"it": "IT", "de": "DE", "fr":"FR", "sl":"SL", "en":"EN"};
const languages: Record<LangCode, LangLabels> = {it: it, de: it} ;

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <Container
      maxWidth="lg"
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
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
