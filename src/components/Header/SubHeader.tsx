import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { LogoPagoPAProduct } from '@pagopa/mui-italia';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ArcRoutes } from 'routes/routes';
import Typography from '@mui/material/Typography';
import { useStore } from 'store/GlobalStore';
import { useCartActions } from 'store/CartStore';

export const SubHeader = () => {
  const { spacing } = useTheme();

  const {
    state: { cart }
  } = useStore();

  const { toggleCartDrawer } = useCartActions();

  const Cart = () => {
    return (
      <Button variant="naked" sx={{ gap: 1 }} onClick={toggleCartDrawer} name="CartButton">
        <Typography variant="inherit">{cart.amount}</Typography>
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
