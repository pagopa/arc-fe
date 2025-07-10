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

const Spontanei = () => {
  const [step, setStep] = React.useState(0);
  const [ente, setEnte] = React.useState<{ paFullName: string; paTaxCode: string } | null>(null);
  const [servizio, setServizio] = React.useState<Servizio | ServizioDinamico | null>(null);
  const [amount, setAmount] = React.useState<number>(0);
  const [causale, setCausale] = React.useState('');
  const [spontaneo, setSpontaneo] = React.useState<PaymentNoticeDetailsDTO | null>(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onContinue = async () => {
    if (step === 2) {
      const { data } = await utils.loaders.generateNotice({
        paFullName: ente?.paFullName || '',
        paTaxCode: ente?.paTaxCode || '',
        amount: amount * 100,
        description: causale
      });
      setSpontaneo(data);
    }
    if (step === 1 && servizio === 'Bollo Auto') {
      window.open('https://www.tributi.regione.lombardia.it/PagoBollo/#/', '');
      return;
    }
    if (step === 2 && (!causale || !amount)) {
      return;
    }
    setStep(step + 1);
  };

  const onBack = () => {
    if (step === 0) return navigate(-1);
    setStep(step - 1);
  };

  useEffect(() => {
    if (servizio === 'Rinnovo Licenza Caccia') return setAmount(200);
    setAmount(0);
  }, [servizio]);

  useEffect(() => {
    if (step == 1) setCausale('');
  }, [step]);

  const OnAmountChange =
    servizio !== 'Rinnovo Licenza Caccia' ? (amount: number) => setAmount(amount) : undefined;

  console.log(ente);

  return (
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
          <ConfiguraPagamento
            onCausaleChange={setCausale}
            amount={amount}
            onAmountChange={OnAmountChange}
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
                (step == 2 && (!causale || !amount))
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
