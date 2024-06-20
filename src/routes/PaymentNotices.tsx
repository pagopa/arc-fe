import { ErrorOutline } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ButtonNaked } from '@pagopa/mui-italia';
import { PaymentNotice } from 'components/PaymentNotice';
import { CardProps } from 'components/PaymentNotice/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';

const paymentNoticesMock: Array<CardProps & { id: number }> = [
  {
    payee: {
      name: 'Politecnico di Milano'
    },
    id: 1,
    paymentInfo: 'RATA 1 - Anno Accademico 2023/2024',
    amount: '171,00 €',
    expiringDate: '31/01/2099'
  },
  {
    payee: {
      name: 'Comune di Milano'
    },
    id: 2,
    paymentInfo: 'TARI 2024',
    amount: '171,00 €',
    multiPayment: true
  },
  {
    payee: {
      name: 'Comune di Milano'
    },
    id: 3,
    paymentInfo: 'Violazione CDS Verbale 0123456',
    amount: '28,70 €',
    multiPayment: true
  },
  {
    payee: {
      name: 'Istituto d’Istruzione Superiore con un nome Molto Lungo che può andare su più righe'
    },
    id: 4,
    paymentInfo: 'Iscrizione Anno Accademico 2023/2024',
    amount: '171,00 €',
    expiringDate: '31/01/2099'
  }
];

const updatedDate = new Date();

export const PaymentNotices = () => {
  const { t } = useTranslation();

  return (
    <Stack height="100%" justifyContent={{ lg: 'space-between' }} component="main">
      <Stack gap={5} component="section">
        <Typography paddingTop={3} variant="h4" component="h1">
          {t('app.paymentNotices.title')}
        </Typography>
        <Stack gap={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            component="header">
            <Typography variant="h6" component="h2">
              {`${t('app.paymentNotices.found')} ${paymentNoticesMock.length} ${t('app.paymentNotices.notice')}`}
            </Typography>
            <Typography
              display="flex"
              variant="body1"
              component="div"
              flexDirection="row"
              gap="5px">
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
            {paymentNoticesMock.map((paymentNotice) => (
              <PaymentNotice.Card key={paymentNotice.id} {...paymentNotice} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack
        padding={1.3}
        gap={1}
        justifyContent="flex-start"
        marginTop={{ xs: 10, lg: 0 }}
        component="aside">
        <Typography variant="body1" component="p">
          {t('app.paymentNotices.alert.info')}
        </Typography>
        <Typography color="error" component="div">
          <ButtonNaked
            variant="text"
            size="medium"
            color="inherit"
            startIcon={<ErrorOutline />}
            aria-label={t('app.paymentNotices.alert.action')}>
            {t('app.paymentNotices.alert.action')}
          </ButtonNaked>
        </Typography>
      </Stack>
    </Stack>
  );
};
