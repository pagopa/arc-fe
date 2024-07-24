import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardActions } from '@mui/material';
import PaymentButton from 'components/PaymentButton';

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.Empty` for rendering the empty card.
 *
 * @component
 * @private
 */
export const _Empty = () => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        padding: 2,
        width: '100%'
      }}>
      <CardActions>
        <Stack spacing={2} width={'100%'} textAlign={'center'} alignItems={'center'}>
          <Typography variant="body1" fontWeight={700}>
            {t('app.paymentNotice.empty.title')}
          </Typography>
          <Typography variant="body1">{t('app.paymentNotice.empty.description')}</Typography>
          <Box mt={3} width={'100%'}>
          <PaymentButton />
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
