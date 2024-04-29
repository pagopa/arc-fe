import { SvgIconComponent } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISidebarMenuItem } from 'models/SidebarMenuItem';

type Props = {
  collapsed: boolean;
  item: ISidebarMenuItem;
  selected?: boolean;
  changeCurrentIndex: (index: number) => void;
  index: number;
};

function renderIcon(Icon: SvgIconComponent | (() => JSX.Element)) {
  return <Icon></Icon>;
}

export const SidebarMenuItem = ({
  collapsed,
  item,
  selected = false,
  changeCurrentIndex,
  index
}: Props) => {
  const navigate = useNavigate();
  return (
    <ListItem disablePadding>
      <ListItemButton
        id={`side-item-${item.label.toLowerCase()}`}
        onClick={() => {
          navigate(item.route);
          changeCurrentIndex(index);
        }}
        selected={selected}
        sx={{
          px: 3,
          '&.Mui-selected': {
            fontWeight: 600,
            color: 'primary.dark',
            '& .MuiListItemIcon-root': {
              color: 'primary.dark'
            },
      
          }
        }}>
        {item.icon && <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>}
        {!collapsed && (
          <ListItemText
            disableTypography
            id={`menu-item-${item.label.toLowerCase()}`}
            primary={item.label}></ListItemText>
        )}
      </ListItemButton>
    </ListItem>
  );
};
