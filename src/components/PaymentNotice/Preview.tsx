import { Box, Button, Theme, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IllusSharingInfo } from '@pagopa/mui-italia';
import React from 'react';
import { useTranslation } from 'react-i18next';
import utils from 'utils';

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.Preview` for rendering the payment notice preview.
 *
 * @component
 * @private
 */
export const _Preview = () => {
  const { t } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const open = () => utils.modal.open(utils.modal.ModalId.OPTIN);

  return (
    <Stack
      sx={{ backgroundColor: 'background.paper' }}
      justifyContent="space-between"
      direction="row"
      borderRadius={4}
      gap={3}
      padding={3}>
      <Stack spacing={3}>
        <Stack gap={1}>
          <Typography variant="h6">{t('app.paymentNotice.preview.title')}</Typography>
          <Typography>{t('app.paymentNotice.preview.description')}</Typography>
        </Stack>
        <Box display="flex" justifyContent={{ xs: 'stretch', sm: 'flex-start' }}>
          <Button size="large" variant="contained" onClick={open} id="searchButtonPaymentNotices">
            {t('app.paymentNotice.preview.action')}
          </Button>
        </Box>
      </Stack>
      {mdUp && <IllusSharingInfo size={120} />}
    </Stack>
  );
};
