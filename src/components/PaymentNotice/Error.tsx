import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardActions } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.Error` for rendering the card.
 *
 * @component
 * @private
 */
export const _Error = () => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        padding: 2,
        width: '100%'
      }}>
      <CardActions>
        <Stack spacing={2} width={'100%'} textAlign={'center'} alignItems={'center'}>
          <ErrorOutline color="error" />
          <Typography variant="body1">{t('app.paymentNotice.error.description')}</Typography>
          <Box mt={3} width={'100%'}>
            <Button
              variant="text"
              aria-label={t('app.paymentNotice.error.button')}
              role="button"
              sx={{ maxWidth: '60%' }}
              size="large">
              {t('app.paymentNotice.error.button')}
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
