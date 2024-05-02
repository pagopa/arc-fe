import { SvgIconComponent } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
  ExtendButtonBase,
  ListItemButtonTypeMap
} from '@mui/material';
import React, { ElementType } from 'react';
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

  /* This interface extention is needed, because of the way the component property is handled in MUI. the styled utilty uses
  React.ComponentProps, which doesn't report back the component property for MUI Components. */
  const ListItemButton = styled(MuiListItemButton)<
    ExtendButtonBase<ListItemButtonTypeMap> & { component: ElementType }
  >({
    '&.active': {
      fontWeight: 'bold',
      backgroundColor: 'rgba(0, 115, 230, 0.08)',
      '.MuiTypography-root': {
        fontWeight: 600,
        color: theme.palette.primary.dark
      },
      '.MuiListItemIcon-root': {
        color: theme.palette.primary.dark
      }
    }
  });
  /**/
  function ListItemLink() {
    return (
      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to={item.route}
          sx={{
            px: 3
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
