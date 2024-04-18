import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

const customTheme = createTheme({
  ...theme,
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          borderBottom: `solid 2px ${theme.palette.grey[300]}`
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'success' && {
            backgroundColor: theme.palette.success.extraLight
          })
        })
      }
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
