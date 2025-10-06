import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Steps from './steps';
import SelezionaEnte from './steps/Ente';
import SelezionaServizio, { Servizio, ServizioDinamico } from './steps/Servizio';
import ConfiguraPagamento from './steps/Configura';
import Riepilogo from './steps/Riepilogo';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import utils from 'utils';
import { PaymentNoticeDetailsDTO } from '../../../generated/apiClient';
import ConfiguraPagamentoDinamico from './steps/ConfiguraDinamico';
import { useUserEmail } from 'hooks/useUserEmail';
import { useUserInfo } from 'hooks/useUserInfo';

export type Payment = {
  causale: string;
  amount: number;
  payee: string;
  payeeId: string;
  /** PERSONA FISICA - PERSONA GIURIDICA */
  type: 'PF' | 'PG';
  /** NOME E COGNOME - RAGIONE SOCIALE */
  payer: string;
  /** CODICE FISCALE - PARTITA IVA */
  payerId: string;
  payerEmail: string
}

const Spontanei = () => {
  const [step, setStep] = React.useState(0);
  const [ente, setEnte] = React.useState<{ paFullName: string; paTaxCode: string } | null>(null);
  const [servizio, setServizio] = React.useState<Servizio | ServizioDinamico | null>(null);
  const payerEmail = useUserEmail() || '';
  const { userInfo } = useUserInfo();
  const name = userInfo?.name || '';
  const surname = userInfo?.familyName || '';
  const payer = `${name} ${surname}`;
  const payerId = userInfo?.fiscalCode || '';

  const defaultPayment: Payment = {
    causale: '',
    amount: 0,
    payee: '',
    payeeId: '',
    type: 'PF',
    payer,
    payerId,
    payerEmail
  };

  const [payment, setPayment] = React.useState<Payment>(defaultPayment);
  const [spontaneo, setSpontaneo] = React.useState<PaymentNoticeDetailsDTO | null>(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const updatePayment = (field: Partial<Payment>) => {
    setPayment((prev) => ({ ...prev, ...field }));
  }

  const onContinue = async () => {
    if (step === 2) {
      const { data } = await utils.loaders.generateNotice({
        paFullName: ente?.paFullName || '',
        paTaxCode: ente?.paTaxCode || '',
        amount: payment.amount * 100,
        description: `${payment.payee}#${payment.payeeId}#${payment.causale}`,
      });
      setSpontaneo(data);
    }
    if (step === 1 && servizio === 'Bollo Auto') {
      window.open('https://www.tributi.regione.lombardia.it/PagoBollo/#/', '');
      return;
    }
    if (step === 2 && (!payment.causale || !payment.amount)) {
      return;
    }
    setStep(step + 1);
  };

  const onBack = () => {
    if (step === 0) return navigate(-1);
    setStep(step - 1);
  };

  useEffect(() => {
    if (servizio === 'Rinnovo Licenza Caccia') return updatePayment({amount: 200});
    updatePayment({amount: 0});
  }, [servizio]);

  useEffect(() => {
    if (step == 1)setPayment(defaultPayment);
  }, [step]);

    return (
    <Stack>
      <Typography variant="h6" 
      mb={1}>
        {t('spontanei.form.title')}
      </Typography>
      <Typography>{t('spontanei.form.description')}</Typography>
      <Stack spacing={4} mt={4}>
        <Steps activeStep={step} />
        {step === 0 && <SelezionaEnte setEnte={setEnte} />}
        {step === 1 && (
          <SelezionaServizio
            setServizio={setServizio}
            enteConServiziDinamici={ente?.paTaxCode === 'VENETO'}
          />
        )}
        {step === 2 && ente?.paTaxCode !== 'VENETO' && (
          <ConfiguraPagamento
            servizio={servizio}
            payment={payment}
            updatePayment={updatePayment}
          />
        )}
        {step === 2 && ente?.paTaxCode === 'VENETO' && (
          <ConfiguraPagamentoDinamico servizio={servizio as ServizioDinamico} />
        )}
        {step === 3 && spontaneo && <Riepilogo spontaneo={spontaneo} />}
        {step !== 3 && (
          <Stack direction="row" justifyContent={'space-between'}>
            <Button size="large" variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
              {step === 0 ? t('spontanei.form.abort') : t('spontanei.form.back')}
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={onContinue}
              disabled={
                (step === 0 && !ente) ||
                (step == 1 && !servizio) ||
                (step == 2 && (!payment.causale || !payment.amount || !payment.payee || !payment.payeeId || !payment.payer || !payment.payerId))
              }>
              {t('spontanei.form.continue')}
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Spontanei;
