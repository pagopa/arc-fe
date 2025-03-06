import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Steps from './steps';
import SelezionaEnte from './steps/Ente';
import SelezionaServizio, { Servizio } from './steps/Servizio';
import ConfiguraPagamento from './steps/Configura';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Spontanei = () => {
  const [step, setStep] = React.useState(0);
  const [ente, setEnte] = React.useState<string | null>(null);
  const [servizio, setServizio] = React.useState<Servizio | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onContinue = () => {
    setStep(step + 1);
  };

  const onBack = () => {
    if (step === 0) return navigate(-1);
    setStep(step - 1);
  };

  useEffect(() => {
    setEnte(null);
    setServizio(null);
  }, [step]);

  return (
    <Stack>
      <Typography variant="h6">{t('spontanei.form.title')}</Typography>
      <Typography>{t('spontanei.form.description')}</Typography>
      <Stack spacing={4} mt={4}>
        <Steps activeStep={step} />
        {step === 0 && <SelezionaEnte setEnte={setEnte} />}
        {step === 1 && <SelezionaServizio setServizio={setServizio} />}
        {step === 2 && <ConfiguraPagamento />}
        <Stack direction="row" justifyContent={'space-between'}>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            {step === 0 ? t('spontanei.form.abort') : t('spontanei.form.back')}
          </Button>
          <Button
            variant="contained"
            onClick={onContinue}
            disabled={(step === 0 && !ente) || (step == 1 && !servizio)}>
            {t('spontanei.form.continue')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Spontanei;
