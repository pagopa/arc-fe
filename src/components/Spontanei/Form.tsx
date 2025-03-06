import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Steps from './steps';
import SelezionaEnte from './steps/Ente';
import SelezionaServizio, { Servizio } from './steps/Servizio';
import ConfiguraPagamento from './steps/Configura';
import { useTranslation } from 'react-i18next';

const Spontanei = () => {
  const [steps, setSteps] = React.useState(0);
  const [ente, setEnte] = React.useState<string | null>(null);
  const [servizio, setServizio] = React.useState<Servizio | null>(null);
  const { t } = useTranslation();

  const onContinue = () => {
    setSteps(steps + 1);
  };

  const onBack = () => {
    if (steps === 0) return;
    setSteps(steps - 1);
  };

  useEffect(() => {
    setEnte(null);
    setServizio(null);
  }, [steps]);

  return (
    <Stack>
      <Typography variant="h6">{t('spontanei.form.title')}</Typography>
      <Typography>{t('spontanei.form.description')}</Typography>
      <Stack spacing={4} mt={4}>
        <Steps activeStep={steps} />
        {steps === 0 && <SelezionaEnte setEnte={setEnte} />}
        {steps === 1 && <SelezionaServizio setServizio={setServizio} />}
        {steps === 2 && <ConfiguraPagamento />}
        <Stack direction="row" justifyContent={'space-between'}>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            {steps === 0 ? t('spontanei.form.abort') : t('spontanei.form.back')}
          </Button>
          <Button
            variant="contained"
            onClick={onContinue}
            disabled={(steps === 0 && !ente) || (steps == 1 && !servizio)}>
            {t('spontanei.form.continue')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Spontanei;
