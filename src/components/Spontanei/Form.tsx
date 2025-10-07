import React, { useEffect, useRef } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Steps from './steps';
import SelezionaEnte from './steps/Ente';
import SelezionaServizio, { Servizio, ServizioDinamico } from './steps/Servizio';
import ConfiguraPagamento from './steps/Configura';
import Riepilogo from './steps/Riepilogo';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { PaymentNoticeDetailsDTO } from '../../../generated/apiClient';
import ConfiguraPagamentoDinamico from './steps/ConfiguraDinamico';
import { useUserEmail } from 'hooks/useUserEmail';
import { useUserInfo } from 'hooks/useUserInfo';
import { Formik, useFormik } from 'formik';
import utils from 'utils';

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
  payerEmail: string;
};

const Spontanei = () => {
  const [step, setStep] = React.useState(0);
  const [ente, setEnte] = React.useState<{ paFullName: string; paTaxCode: string } | null>(null);
  const [servizio, setServizio] = React.useState<Servizio | ServizioDinamico | null>(null);
  const [spontaneo, setSpontaneo] = React.useState<PaymentNoticeDetailsDTO | null>(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const formikRef = useRef<ReturnType<typeof useFormik<Payment>>>(null);

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

  const paymentSchema = z.object({
    causale: z.string().min(2, 'Causale troppo corta').max(50, 'Causale troppo corta'),
    amount: z.number().min(1, 'Importo non valido'),
    payee: z.string().min(1, 'campo obbligatorio'),
    payeeId: z
      .string()
      .regex(
        /(^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$)|(^[0-9]{11}$)/,
        'Codice Fiscale o Partita IVA errato'
      ),
    payer: z.string().min(1, 'campo obbligatorio'),
    payerId: z
      .string()
      .regex(
        /(^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$)|(^[0-9]{11}$)/,
        'Codice Fiscale o Partita IVA errato'
      ),
    payerEmail: z.string().email('Email non valida')
  });

  const onContinue = async () => {
    if (step === 2 && formikRef.current?.values) {
      const { amount, payee, payeeId, causale } = formikRef.current.values;
      const { data } = await utils.loaders.generateNotice({
        paFullName: ente?.paFullName || '',
        paTaxCode: ente?.paTaxCode || '',
        amount: amount * 100,
        description: `${payee}#${payeeId}#${causale}`
      });
      setSpontaneo(data);
    }
    if (step === 1 && servizio === 'Bollo Auto') {
      window.open('https://www.tributi.regione.lombardia.it/PagoBollo/#/', '');
      return;
    }
    setStep(step + 1);
  };

  const onBack = () => {
    if (step === 0) return navigate(-1);
    setStep(step - 1);
  };

  useEffect(() => {
    if (step == 1) formikRef.current?.resetForm();
    if (step === 2 && servizio === 'Rinnovo Licenza Caccia')
      formikRef.current?.setFieldValue('amount', 200);
  }, [step]);

  const validate = (values: Payment) => {
    const errors = {};
    const result = paymentSchema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => (errors[issue.path[0]] = issue.message));
    }
    return errors;
  };

  return (
    <Formik
      initialValues={defaultPayment}
      onSubmit={console.log}
      validate={validate}
      innerRef={formikRef}>
      {(formState) => (
        <Stack>
          <Typography variant="h6" mb={1}>
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
              <ConfiguraPagamento servizio={servizio} />
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
                    (step == 2 && !formState.dirty) ||
                    !formState.isValid
                  }>
                  {t('spontanei.form.continue')}
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};

export default Spontanei;
