import { ArcRoutes } from 'routes/routes';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ISidebarMenuItem } from 'models/SidebarMenuItem';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Tooltip from '@mui/material/Tooltip';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import useCollapseMenu from 'hooks/useCollapseMenu';

export const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems: Array<ISidebarMenuItem> = [
    {
      label: t('menu.homepage'),
      icon: ViewSidebarIcon,
      route: '/'
    },
    {
      label: t('menu.receipts'),
      icon: ReceiptLongIcon,
      route: ArcRoutes.TRANSACTIONS
    }
  ];
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const smOrMd = useMediaQuery(theme.breakpoints.between('sm', 'lg')); //had to make a separate variable because otherwise there would be a crash due to too many renders. Variable is true if current breakpoints are sm or md
  const { collapsed, changeMenuState } = useCollapseMenu(!lg); //Should be collapsed on load if on mobile,  if lg is false, we're on mobile.

  const overlay = !collapsed && smOrMd;
  const fullHeight = !collapsed || lg;
  const showHamburger = lg || collapsed;

  if (overlay || (xs && !collapsed)) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }

  return (
    <>
      <Box
        zIndex={!lg && !collapsed ? 30000 : 3}
        sx={{
          position: !collapsed ? 'fixed' : 'relative',
          width: '100%',
          top: '0',
          height: '100%',
          [theme.breakpoints.between('sm', 'lg')]: { width: collapsed ? '100%' : 'fit-content' }, //I couldn't define the height mobile first, because if I did, when not in mobile breakpoints, even if I set the height to 100%, it would still not cover the whole surface...
          [theme.breakpoints.up('lg')]: {
            width: 'fit-content',
            position: 'relative'
          },
          [theme.breakpoints.down('lg')]: {
            height: !collapsed ? '100%' : 'fit-content'
          }
        }}>
        <Grid
          alignItems={'normal'}
          display={'flex'}
          flexDirection={'column'}
          item
          minHeight={fullHeight ? '50vh' : '1vh'}
          component={'nav'}
          aria-expanded={!collapsed}
          aria-label={t('menu.navigationMenu')}
          role="navigation"
          sx={{
            height: '100%',
            bgcolor: 'background.paper',
            [theme.breakpoints.up('xs')]: { width: '100%' },
            [theme.breakpoints.up('sm')]: { width: collapsed ? '100%' : '300px' },
            [theme.breakpoints.up('lg')]: { width: collapsed ? '88px' : '300px' }
          }}>
          {!showHamburger && (
            <Box textAlign={'right'} pt={1} pr={2}>
              <Tooltip
                placement="left"
                title={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}>
                <IconButton
                  data-testid="collapseClose"
                  aria-label={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}
                  onClick={() => {
                    changeMenuState(collapsed);
                  }}
                  size="large">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {
            <>
              <List
                component="ol"
                aria-label={t('menu.description')}
                hidden={collapsed && !lg}
                aria-hidden={collapsed && !lg}>
                {menuItems.map((item: ISidebarMenuItem, index: number) => (
                  <SidebarMenuItem collapsed={collapsed} item={item} key={index} />
                ))}
              </List>
              <Divider orientation="horizontal" flexItem />
            </>
          }
          <Box marginTop={fullHeight ? 'auto' : 0} hidden={!showHamburger}>
            <Divider orientation="horizontal" flexItem />
            <Box p={2}>
              <Tooltip
                placement="right"
                title={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}>
                <IconButton
                  data-testid="hamburgerButton"
                  aria-label={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}
                  onClick={() => {
                    changeMenuState(collapsed);
                  }}
                  size="large">
                  <MenuIcon />
                  {!lg && (
                    <Typography variant="button" fontWeight={600} pl={1}>
                      {t('menu.menu')}
                    </Typography>
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Box>

      {overlay && (
        <Box
          bgcolor={'rgba(23, 50, 77, 0.7)'}
          zIndex={1}
          position={'fixed'}
          top="0"
          left="0"
          height={'100%'}
          width={'100%'}
        />
      )}
    </>
  );
};
