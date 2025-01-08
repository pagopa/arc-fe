import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { LogoPagoPAProduct } from '@pagopa/mui-italia';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ArcRoutes } from 'routes/routes';
import Typography from '@mui/material/Typography';
import { toggleCartDrawer } from 'store/CartStore';
import { useTranslation } from 'react-i18next';
import utils from 'utils'; // Adjust the import path as necessary
import { useStore } from 'store/GlobalStore';

export const SubHeader = () => {
  const { spacing } = useTheme();
  const { t } = useTranslation();
  const { state } = useStore();

  const Cart = () => {
    return (
      <Button
        variant="naked"
        sx={{ gap: 1 }}
        onClick={toggleCartDrawer}
        aria-label={t('ui.a11y.cart')}
        name="CartButton">
        <Typography variant="inherit" aria-hidden="true">
          {utils.converters.toEuro(state.cart.amount)}
        </Typography>
        <ShoppingCartIcon fontSize="small" aria-hidden="true" />
      </Button>
    );
  };

  const Product = () => (
    <Button
      href={ArcRoutes.DASHBOARD}
      size="medium"
      target="_self"
      sx={{ borderRadius: 2 }}
      aria-label={t('ui.a11y.home')}>
      <LogoPagoPAProduct color="default" title="PagoPA" aria-hidden="true" />
    </Button>
  );

  return (
    <Box
      display="flex"
      borderBottom={1}
      borderColor="divider"
      minHeight={spacing(10)}
      role="banner">
      <Stack direction="row" justifyContent="space-between" p={3} pl={2} pb={2} width="100%">
        <Product />
        <Cart />
      </Stack>
    </Box>
  );
};
