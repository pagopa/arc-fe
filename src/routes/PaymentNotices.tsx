import { ErrorOutline } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ButtonNaked } from '@pagopa/mui-italia';
import { PaymentNotice } from 'components/PaymentNotice';
import { CardProps } from 'components/PaymentNotice/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';

const paymentNoticesMock: CardProps[] = [
  {
    payee: {
      name: 'Politecnico di Milano'
    },
    paymentInfo: 'RATA 1 - Anno Accademico 2023/2024',
    amount: '171,00 €',
    expiringDate: '31/01/2099'
  },
  {
    payee: {
      name: 'Comune di Milano'
    },
    paymentInfo: 'TARI 2024',
    amount: '171,00 €',
    multiPayment: true
  },
  {
    payee: {
      name: 'Comune di Milano'
    },
    paymentInfo: 'Violazione CDS Verbale 0123456',
    amount: '28,70 €',
    multiPayment: true
  },
  {
    payee: {
      name: 'Istituto d’Istruzione Superiore con un nome Molto Lungo che può andare su più righe'
    },
    paymentInfo: 'Iscrizione Anno Accademico 2023/2024',
    amount: '171,00 €',
    expiringDate: '31/01/2099'
  }
];

export const PaymentNotices = () => {
  const { t } = useTranslation();

  return (
    <Stack height="100%" justifyContent="space-between">
      <Stack gap={5}>
        <Typography paddingTop={3} variant="h4">
          {t('app.paymentNotices.title')}
        </Typography>
        <Stack gap={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {t('app.paymentNotices.found')} 12 {t('app.paymentNotices.notice')}
            </Typography>
            <Typography display="flex" variant="body1" flexDirection="row" gap="5px">
              <Typography color="text.secondary">{t('app.paymentNotices.updated')}</Typography>
              <Typography sx={{ fontWeight: 600 }}>14 giugno 2020, 15:50</Typography>
            </Typography>
          </Stack>
          <Stack gap={3}>
            {paymentNoticesMock.map((paymentNotice) => (
              <PaymentNotice.Card {...paymentNotice} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack padding={1.3} gap={1} justifyContent="flex-start">
        <Typography variant="body1">{t('app.paymentNotices.alert.info')}</Typography>
        <Typography color="error">
          <ButtonNaked variant="text" size="medium" color="inherit" startIcon={<ErrorOutline />}>
            {t('app.paymentNotices.alert.action')}
          </ButtonNaked>
        </Typography>
      </Stack>
    </Stack>
  );
};
