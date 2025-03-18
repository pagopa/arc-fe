import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PaymentNoticeDetailsDTO } from '../../../../generated/apiClient';
import { PaymentNotice } from 'components/PaymentNotice';
import { PaymentNoticeEnum } from 'models/PaymentNotice';
import utils from 'utils';
export type Servizio = 'Iscrizione Scuola Materna' | 'Rinnovo Licenza Caccia' | 'Bollo Auto';

interface SelezionaServzioProps {
  spontaneo: PaymentNoticeDetailsDTO;
}

const Riepilogo = (props: SelezionaServzioProps) => {
  const { t } = useTranslation();
  const { paFullName = '', paTaxCode = '', iupd = '', paymentOptions = [] } = props.spontaneo;
  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step4.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step4.description')}</Typography>
        <PaymentNotice.Detail
          paymentNotice={{
            type: PaymentNoticeEnum.SINGLE,
            paTaxCode,
            paFullName,
            iupd,
            paymentOptions: {
              amount: utils.converters.toEuro(paymentOptions[0].amount || 0),
              amountValue: paymentOptions[0].amount || 0,
              nav: paymentOptions[0].nav || '',
              iuv: paymentOptions[0].iuv || '',
              description: paymentOptions[0].description || '',
              dueDate: utils.datetools.formatDate(paymentOptions[0].dueDate)
            }
          }}
        />
      </Stack>
    </Card>
  );
};

export default Riepilogo;
