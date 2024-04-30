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

  return (
    <NavLink
      to={item.route}
      className={({ isActive }) => (isActive ? 'active' : '')}
      style={{ textDecoration: 'none', color: theme.palette.primary.dark }}>
      <ListItem disablePadding sx={{ '.active &': { backgroundColor: 'rgba(0, 115, 230, 0.08)' } }}>
        <ListItemButton
          id={`side-item-${item.label.toLowerCase()}`}
          selected={false}
          sx={{
            px: 3,
            '.active &': {
              '& .MuiListItemIcon-root': {
                color: 'primary.dark'
              },
              '& .MuiListItemText-primary	': {
                color: 'primary.dark',
                fontWeight: 600
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
    </NavLink>
  );
};
