import { Container, useTheme } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "inline  ",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        bgcolor: theme.palette.background.default,
      }}>
      <Header />
      <Sidebar />
      <Container
        sx={{
          p: { xs: 0 },
          pl: { xs: 2, sm: 6, md: 0 },
          pr: { xs: 2, sm: 6, md: 0 },
          flexGrow: 1
        }}
        style={{display:'inline-block', textAlign:'center'}}
        maxWidth={'sm'}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
}
