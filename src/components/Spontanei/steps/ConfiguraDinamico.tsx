import { Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServizioDinamico } from './Servizio';
import mockServiziDinamiciForm from '../DinamicForm/mockServiziDinamici';
import DinamicForm from '../DinamicForm';

const ConfiguraPagamentoDinamico = (props: { servizio: ServizioDinamico }) => {
  const { t } = useTranslation();
  const { servizio } = props;
  const form = mockServiziDinamiciForm[servizio];

  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step3.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step3.description')}</Typography>
        <Stack direction="column" justifyContent={'space-between'} spacing={2}>
          <DinamicForm
            fieldBeans={form.fieldBeans}
            campoTotaleInclusoInXSD={form.campoTotaleInclusoInXSD}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ConfiguraPagamentoDinamico;
