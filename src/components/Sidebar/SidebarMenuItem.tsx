import { alpha } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ISidebarMenuItem } from 'models/SidebarMenuItem';

type Props = {
  collapsed: boolean;
  item: ISidebarMenuItem;
};

function renderIcon(Icon: SvgIconComponent | (() => JSX.Element)) {
  return <Icon></Icon>;
}

export const SidebarMenuItem = ({ collapsed, item }: Props) => {
  const theme = useTheme();

  function ListItemLink() {
    return (
      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to={item.route}
          role={'menuitem'}
          sx={{
            px: 3,
            '&.active': {
              fontWeight: 'bold',
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              '.MuiTypography-root': {
                fontWeight: 600,
                color: theme.palette.primary.dark
              },
              '.MuiListItemIcon-root': {
                color: theme.palette.primary.dark
              }
            }
          }}>
          {item.icon && <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>}
          {!collapsed && (
            <ListItemText
              id={`menu-item-${item.label.toLowerCase()}`}
              primary={item.label}></ListItemText>
          )}
        </ListItemButton>
      </ListItem>
    );
  }

  return <ListItemLink />;
};
