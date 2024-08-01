import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentNotice } from './PaymentNotice';
import { DateFormat, datetools } from 'utils/datetools';

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.List` for rendering the list .
 *
 * @component
 * @private
 */

export type PaymentNotices = {
  id: string;
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
  const updatedDate = new Date().toISOString();

  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" component="header">
        <Typography variant="h6" component="h2">
          {`${t('app.paymentNotices.found', { count: paymentNoticesList.length })}`}
        </Typography>
        <Typography display="flex" variant="body1" component="div" flexDirection="row" gap="5px">
          <Typography color="text.secondary" component="span">
            {t('app.paymentNotices.updated')}
          </Typography>
          <Typography sx={{ fontWeight: 600 }} component="time" dateTime={updatedDate}>
            {datetools.formatDate(updatedDate, {
              format: DateFormat.LONG,
              withTime: true,
              timeZone: datetools.localTimeZone
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
