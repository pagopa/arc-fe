import React from 'react';
import Box from '@mui/material/Box';
import { Card, Stack, Typography, useTheme } from '@mui/material';
import { togglePaymentTypeDrawerVisibility } from 'store/PaymentTypeDrawerVisibilityStore';
import { ButtonNaked } from '@pagopa/mui-italia';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import utils from 'utils';
import { useTranslation } from 'react-i18next';
import { Styles } from './styles';
import { NavLink } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

const PaymentTypeDrawer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = Styles(theme);

  return (
    <>
      <Box component="aside" sx={styles.container}>
        <Stack spacing={4} direction="column">
          <Stack direction="row" justifyContent="space-between">
            <Typography component="span" variant="h6">
              {t('spontanei.drawer.title')}
            </Typography>
            <ButtonNaked onClick={togglePaymentTypeDrawerVisibility}>
              <CloseIcon />
            </ButtonNaked>
          </Stack>
          <Card variant="outlined">
            <Stack
              spacing={2}
              padding={2}
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}>
              <Typography variant="h6" fontWeight={700}>
                {t('spontanei.drawer.card1.title')}
              </Typography>
              <Typography>{t('spontanei.drawer.card1.description')}</Typography>
              <Button variant="naked" href={utils.config.checkoutHost} target="_blank">
                <Typography color={'primary'} fontWeight={700}>
                  {t('spontanei.drawer.card1.cta')}
                </Typography>
                <ArrowForwardIcon />
              </Button>
            </Stack>
          </Card>

          <Card variant="outlined">
            <Stack
              spacing={2}
              padding={2}
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}>
              <Typography variant="h6" fontWeight={700}>
                {t('spontanei.drawer.card2.title')}
              </Typography>
              <Typography>{t('spontanei.drawer.card2.description')}</Typography>
              <NavLink to={ArcRoutes.SPONTANEI} onClick={togglePaymentTypeDrawerVisibility}>
                <Button variant="naked">
                  <Typography color={'primary'} fontWeight={700}>
                    {t('spontanei.drawer.card2.cta')}
                  </Typography>
                  <ArrowForwardIcon />
                </Button>
              </NavLink>
            </Stack>
          </Card>
        </Stack>
      </Box>

      {/* Overlay */}
      <Box
        sx={styles.overlay}
        aria-hidden="true"
        role="presentation"
        onClick={togglePaymentTypeDrawerVisibility}
      />
    </>
  );
};

export default PaymentTypeDrawer;
