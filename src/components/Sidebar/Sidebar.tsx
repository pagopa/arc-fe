import React, { useEffect } from 'react';
import { ArcRoutes } from 'routes/routes';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  Typography,
  useTheme,
  Tooltip,
  Theme,
  SxProps,
  useMediaQuery
} from '@mui/material';
import { ISidebarMenuItem } from 'models/SidebarMenuItem';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useTranslation } from 'react-i18next';
import { Payments } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import useCollapseMenu from 'hooks/useCollapseMenu';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  const { collapsed, changeMenuState, setOverlay, overlay } = useCollapseMenu(!lg);

  useEffect(() => {
    setOverlay(!(lg || collapsed));
  }, [lg, collapsed]);
  //This useEffect is needed, otherwise React will complain about the component being re rendered while another re render is in the queue.

  const styles = sidebarStyles(theme, collapsed);

  const menuItems: Array<ISidebarMenuItem> = [
    {
      label: t('menu.homepage'),
      icon: ViewSidebarIcon,
      route: '/'
    },
    {
      label: t('menu.paymentNotices'),
      icon: Payments,
      route: ArcRoutes.PAYMENT_NOTICES
    },
    {
      label: t('menu.receipts'),
      icon: ReceiptLongIcon,
      route: ArcRoutes.TRANSACTIONS
    }
  ];

  return (
    <>
      <Box sx={styles.container}>
        <Grid
          alignItems="normal"
          display="flex"
          flexDirection="column"
          item
          component="nav"
          aria-expanded={!collapsed}
          aria-label={t('menu.navigationMenu')}
          role="navigation"
          sx={styles.nav}>
          {overlay && (
            <Box sx={styles.collapseIcon}>
              <Tooltip
                placement="left"
                title={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}>
                <IconButton
                  data-testid="collapseClose"
                  aria-label={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}
                  onClick={() => changeMenuState()}
                  size="large">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <List
            sx={styles.list}
            component="ol"
            aria-hidden={collapsed && !lg}
            aria-label={t('menu.description')}>
            {menuItems.map((item, index) => (
              <SidebarMenuItem
                onClick={() => !lg && changeMenuState()}
                collapsed={collapsed}
                item={item}
                key={index}
              />
            ))}
          </List>
          <Divider orientation="horizontal" flexItem />
          <Box sx={styles.hamburgerBox}>
            <Divider orientation="horizontal" flexItem />
            <Box sx={styles.hamburgerIcon}>
              <Tooltip
                placement="right"
                title={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}>
                <IconButton
                  data-testid="hamburgerButton"
                  aria-label={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}
                  onClick={() => changeMenuState()}
                  size="large">
                  <MenuIcon />
                  {!lg && (
                    <Typography variant="button" sx={styles.hamburgerTypography}>
                      {t('menu.menu')}
                    </Typography>
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Box>
      {overlay && <Box sx={styles.overlay} />}
    </>
  );
};

const sidebarStyles = (theme: Theme, collapsed: boolean): Record<string, SxProps> => ({
  container: {
    zIndex: collapsed ? 1 : 10,
    position: collapsed ? 'relative' : 'fixed',
    width: '100%',
    top: 0,
    height: '100%',
    [theme.breakpoints.between('sm', 'lg')]: { width: collapsed ? '100%' : 'fit-content' },
    [theme.breakpoints.up('lg')]: { width: 'fit-content', position: 'relative' },
    [theme.breakpoints.down('lg')]: { height: collapsed ? 'fit-content' : '100%' }
  },
  nav: {
    minHeight: collapsed ? '1vh' : '50vh',
    height: '100%',
    width: '100%',
    bgcolor: 'background.paper',
    [theme.breakpoints.up('sm')]: { width: collapsed ? '100%' : '300px' },
    [theme.breakpoints.up('lg')]: { width: collapsed ? '88px' : '300px', minHeight: '50vh' }
  },
  overlay: {
    bgcolor: 'rgba(23, 50, 77, 0.7)',
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  collapseIcon: {
    textAlign: 'right',
    pt: 1,
    pr: 2
  },
  list: {
    [theme.breakpoints.down('lg')]: { display: collapsed ? 'none' : 'inline-block' }
  },
  hamburgerBox: {
    marginTop: 'auto',
    [theme.breakpoints.down('lg')]: {
      visibility: collapsed ? 'visible' : 'hidden',
      marginTop: collapsed ? 0 : 'auto'
    }
  },
  hamburgerIcon: {
    p: 2
  },
  hamburgerTypography: {
    fontWeight: 600,
    pl: 1
  }
});
