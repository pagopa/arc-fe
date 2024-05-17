import { ArcRoutes } from 'routes/routes';
import {
  Backdrop,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ISidebarMenuItem } from 'models/SidebarMenuItem';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Tooltip from '@mui/material/Tooltip';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import useCollapseMenu from './useCollapseMenu';

export const Sidebar = () => {
  const { t } = useTranslation();

  const { collapsed, changeMenuState } = useCollapseMenu(false);

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
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const overlay = !collapsed && sm && !lg;

  return (
    <>
      <Box
        zIndex={3}
        sx={{
          width: 'fit-content',
          [theme.breakpoints.between('xs', 'lg')]: { width: collapsed ? '100%' : 'fit-content' },
          [theme.breakpoints.only('xs')]: { width: '100%' }
        }}>
        <Grid
          alignItems={'normal'}
          display={'flex'}
          flexDirection={'column'}
          item
          minHeight={!collapsed || lg ? '50vh' : '1vh'}
          component={'nav'}
          aria-label={t('menu.navigationMenu')}
          role="navigation"
          sx={{
            height: '100%',
            bgcolor: 'background.paper',
            [theme.breakpoints.up('xs')]: { width: '100%' },
            [theme.breakpoints.up('sm')]: { width: collapsed ? '100%' : '300px' },
            [theme.breakpoints.up('lg')]: { width: collapsed ? '88px' : '300px' }
          }}>
          {(!collapsed || lg) && (
            <>
              <List component="ol" aria-label={t('menu.description')}>
                {menuItems.map((item: ISidebarMenuItem, index: number) => (
                  <SidebarMenuItem collapsed={collapsed} item={item} key={index} />
                ))}
              </List>
              <Divider orientation="horizontal" flexItem />
            </>
          )}
          <Box marginTop={!collapsed || lg ? 'auto' : 0}>
            <Divider orientation="horizontal" flexItem />
            <Box p={2}>
              <Tooltip
                aria-hidden="true"
                placement="right"
                title={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}>
                <IconButton
                  aria-label={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}
                  onClick={() => {
                    changeMenuState(collapsed);
                  }}
                  size="large">
                  <MenuIcon />
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
