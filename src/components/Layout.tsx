import { useTheme } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import React from 'react';

interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default
      }}>
      {children}
    </Box>
  );
}
