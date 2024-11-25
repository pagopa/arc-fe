import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { PropsWithChildren } from 'react';

interface TabPanelProps extends PropsWithChildren {
  value: number;
  activeValue: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, activeValue } = props;
  return (
    <Box role="tabpanel" hidden={value !== activeValue} padding={1.5} bgcolor={grey['A200']}>
      {children}
    </Box>
  );
};

export default TabPanel;
