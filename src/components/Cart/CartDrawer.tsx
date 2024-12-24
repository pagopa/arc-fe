import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import { toggleCartDrawer, cartState } from 'store/CartStore';
import { ButtonNaked } from '@pagopa/mui-italia/dist/components/ButtonNaked';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';
import { cartDrawerStyles } from './CartDrawer.styles';

export const CartDrawer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = cartDrawerStyles(theme);
  const navigate = useNavigate();

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
                {cartState.value.amount}
              </Typography>
            </Stack>
          </Box>

          {/* Empty Cart Message */}
          <Box sx={styles.emptyCartMessage}>
            <Typography variant="subtitle1">{t('app.cart.empty.title')}</Typography>
            <Typography variant="body2">{t('app.cart.empty.description')}</Typography>
          </Box>

          {/* Action Button */}
          <Stack justifyContent="center" sx={styles.actionButton}>
            <Button variant="outlined" size="large" onClick={onEmptyButtonClick}>
              {t('app.cart.empty.button')}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Overlay */}
      {cartState.value.isOpen && (
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
