import React from 'react';
import { ISidebarMenuItem } from 'models/SidebarMenuItem';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SvgIconComponent } from '@mui/icons-material';
import { alpha } from '@mui/material';

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
          sx={{
            px: 3,
            '&.active': {
              fontWeight: 'bold',
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderRight: '2px solid',
              borderColor: theme.palette.primary.dark,
              '.MuiTypography-root': {
                fontWeight: 600,
                color: theme.palette.primary.dark
              },
              '.MuiListItemIcon-root': {
                color: theme.palette.primary.dark
              }
            }
          }}>
          {item.icon && <ListItemIcon aria-hidden="true">{renderIcon(item.icon)}</ListItemIcon>}
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
