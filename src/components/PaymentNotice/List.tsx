import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentNotice } from './PaymentNotice';

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.List` for rendering the list .
 *
 * @component
 * @private
 */

export type PaymentNotices = {
  id: number;
  payee: {
    name: string;
    srcImg?: string;
    altImg?: string;
  };
  paymentInfo: string;
  amount: string;
  expiringDate: string;
};

export const _List = ({ paymentNoticesList }: { paymentNoticesList: PaymentNotices[] }) => {
  const { t } = useTranslation();
  const updatedDate = new Date();

  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" component="header">
        <Typography variant="h6" component="h2">
          {`${t('app.paymentNotices.found')} ${paymentNoticesList.length} ${t('app.paymentNotices.notice')}`}
        </Typography>
        <Typography display="flex" variant="body1" component="div" flexDirection="row" gap="5px">
          <Typography color="text.secondary" component="span">
            {t('app.paymentNotices.updated')}
          </Typography>
          <Typography
            sx={{ fontWeight: 600 }}
            component="time"
            dateTime={updatedDate.toISOString()}>
            {updatedDate.toLocaleString(navigator.language, {
              timeStyle: 'short',
              dateStyle: 'medium'
            })}
          </Typography>
        </Typography>
      </Stack>
      <Stack gap={3} component="section">
        {paymentNoticesList.map((paymentNotice) => (
          <PaymentNotice.Card key={paymentNotice.id} {...paymentNotice} />
        ))}
      </Stack>
    </Stack>
  );
};
