import { Settings } from '@mui/icons-material';
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

export const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <Box
      sx={{
        height: '1255px',
        maxWidth: 360,
        display:'inline-block',
        backgroundColor: 'background.paper'
      }}>
      <List component="nav" aria-label="main piattaforma-notifiche sender">
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemIcon>
            <Settings fontSize="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  );
};
