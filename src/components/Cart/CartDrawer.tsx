import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Divider, useTheme } from '@mui/material';
import { toggleCartDrawer, deleteItem } from 'store/CartStore';
import { ButtonNaked } from '@pagopa/mui-italia/dist/components/ButtonNaked';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';
import { cartDrawerStyles } from './CartDrawer.styles';
import { useStore } from 'store/GlobalStore';
import { toEuroOrMissingValue } from 'utils/converters';

interface CartItem {
  title: string;
  description: string;
  amount: number;
  id: string;
}

const CartItem = (props: CartItem) => {
  const theme = useTheme();
  const styles = cartDrawerStyles(theme);
  const { t } = useTranslation();
  const { title, description, amount, id } = props;

  return (
    <Stack sx={styles.item}>
      <Stack>
        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="caption">{description}</Typography>
      </Stack>
      <Stack sx={{ ...styles.item, marginTop: 0, marginBottom: 0 }}>
        <Typography variant="body1" fontWeight={600} mr={2}>
          {toEuroOrMissingValue(amount)}
        </Typography>
        <ButtonNaked
          color="error"
          onClick={() => deleteItem(id)}
          aria-label={t('ui.a11y.removeCartItem')}
          name="removeCartItemButton">
          <DeleteIcon />
        </ButtonNaked>
      </Stack>
    </Stack>
  );
};

export const CartDrawer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = cartDrawerStyles(theme);
  const navigate = useNavigate();

  const {
    state: { cart }
  } = useStore();

  const onEmptyButtonClick = () => {
    toggleCartDrawer();
    navigate(ArcRoutes.PAYMENT_NOTICES);
  };

  return (
    <>
      <Box sx={styles.container} component="aside" aria-label={t('app.cart.header.title')}>
        <Stack justifyContent="space-between" height="100%">
          {/* Header Section */}
          <Box>
            <Stack direction="row" sx={styles.header}>
              <ButtonNaked onClick={toggleCartDrawer} aria-label={t('app.cart.header.close')}>
                <CloseIcon />
              </ButtonNaked>
            </Stack>
            <Stack sx={styles.cartSummary}>
              <Typography component="span" variant="h6">
                {t('app.cart.header.amount')}
              </Typography>
              <Typography component="span" variant="h6">
                {toEuroOrMissingValue(cart.amount)}
              </Typography>
            </Stack>
          </Box>

          {/* Empty Cart Message */}
          {cart.items.length === 0 && (
            <Box sx={styles.emptyCartMessage}>
              <Typography variant="subtitle1">{t('app.cart.empty.title')}</Typography>
              <Typography variant="body2">{t('app.cart.empty.description')}</Typography>
            </Box>
          )}

          {/* Cart Content */}
          {cart.items.length > 0 && (
            <Stack sx={styles.items}>
              <Alert severity="info">{t('app.cart.items.alert')}</Alert>
              <Stack mt={2} divider={<Divider orientation="horizontal" flexItem />}>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.iuv}
                    id={item.iuv}
                    title={item.paFullName}
                    description={item.description}
                    amount={item.amount}
                  />
                ))}
              </Stack>
            </Stack>
          )}

          {/* Action Button */}
          <Stack justifyContent="center" sx={styles.actionButton} spacing={2}>
            <Button variant="outlined" size="large" onClick={onEmptyButtonClick}>
              {t('app.cart.items.back')}
            </Button>
            <Button variant="contained" size="large">
              {t('app.cart.items.pay')}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Overlay */}
      {cart.isOpen && (
        <Box
          sx={styles.overlay}
          aria-hidden="true"
          role="presentation"
          onClick={toggleCartDrawer}
        />
      )}
    </>
  );
};
