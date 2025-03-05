import { SxProps, Theme } from '@mui/material';

export const Styles = (theme: Theme): Record<string, SxProps> => ({
  container: {
    zIndex: 10,
    position: 'fixed',
    right: 0,
    top: 0,
    width: { lg: '30%', md: '40%', sm: '50%', xs: '100%' },
    maxWidth: '417px',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    padding: theme.spacing(3)
  },
  overlay: {
    bgcolor: 'rgba(23, 50, 77, 0.7)',
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  }
});
