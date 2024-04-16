import { Box, Divider, Grid, IconButton, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SidebarMenuItem } from './SidebarMenuItem';
import { ISidebarMenuItem } from 'src/models/SidebarMenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Tooltip from '@mui/material/Tooltip';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

export const Sidebar = () => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const menuItems: Array<ISidebarMenuItem> = [
    {
      label: t('menu.homepage'),
      icon: ViewSidebarIcon,
      route: '/'
    },
    {
      label: t('menu.receipts'),
      icon: ReceiptLongIcon,
      route: '/'
    }
  ];
  return (
    <>
      <Grid
        alignItems={'normal'}
        display={'flex'}
        flexDirection={'column'}
        item
        minHeight={'50vh'}
        xs={collapsed ? 'auto' : 3}>
        <List role="navigation" component="nav" aria-label={t('menu.description')}>
          {menuItems.map((item: ISidebarMenuItem, index: number) => (
            <SidebarMenuItem collapsed={collapsed} item={item} key={index}></SidebarMenuItem>
          ))}
        </List>
        <Divider orientation="horizontal" flexItem />
        <Box marginTop={'auto'} aria-hidden="true">
          <Divider orientation="horizontal" flexItem />
          <Box p={2}>
            <Tooltip
              placement="right"
              title={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}>
              <IconButton
                aria-label={t(!collapsed ? 'sidebar.collapse' : 'sidebar.expand')}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
                size="large">
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
