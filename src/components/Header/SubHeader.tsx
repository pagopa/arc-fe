import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { LogoPagoPAProduct } from '@pagopa/mui-italia';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ArcRoutes } from 'routes/routes';
import Typography from '@mui/material/Typography';

export const SubHeader = () => {
  const { spacing } = useTheme();

  const Cart = () => {
    return (
      <Button variant="naked" sx={{ gap: 1 }}>
        <Typography variant="inherit">0,00 €</Typography>
        <ShoppingCartIcon fontSize="small" />
      </Button>
    );
  };

  const Product = () => (
    <Button href={ArcRoutes.DASHBOARD} size="medium" target="_self" sx={{ borderRadius: 2 }}>
      <LogoPagoPAProduct color="default" title="PagoPA" />
    </Button>
  );

  return (
    <Box display="flex" borderBottom={1} borderColor="divider" minHeight={spacing(10)}>
      <Stack direction="row" justifyContent="space-between" p={3} pl={2} pb={2} width="100%">
        <Product />
        <Cart />
      </Stack>
    </Box>
  );
};
