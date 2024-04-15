import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

const customTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    background: {
      paper: '#F5F5F5', // mui-italia paper is defined as #FFFFFF
      default: '#FFFFFF' // mui-italia default is defined as '#F2F2F2'
    }
  }
});

const style = {
  theme: customTheme,
  header: {
    height: 122
  },
  footer: {
    height: 158
  }
};

export const Theme = (props: PropsWithChildren) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={style.theme}>{props.children}</ThemeProvider>
  </>
);

export default style;
