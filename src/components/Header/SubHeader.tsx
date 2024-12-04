import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { LogoPagoPAProduct } from '@pagopa/mui-italia';
import React from 'react';
import { ArcRoutes } from 'routes/routes';

export const SubHeader = () => {
  const { spacing } = useTheme();

  return (
    <Box display="flex" borderBottom={1} borderColor="divider" minHeight={spacing(10)}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pt={3}
        px={2}
        pb={2}
        width="100%">
        <Button href={ArcRoutes.DASHBOARD} size="medium" target="_self" sx={{ borderRadius: 2 }}>
          <LogoPagoPAProduct color="default" title="PagoPA" />
        </Button>
      </Stack>
    </Box>
  );
};
