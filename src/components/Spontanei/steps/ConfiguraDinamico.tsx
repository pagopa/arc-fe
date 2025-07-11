import {
  Button,
  Card,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServizioDinamico } from './Servizio';
import mockServiziDinamiciForm from '../mockServiziDinamici';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';
import * as z from 'zod';

import { type ZodIssues, type FormState, type FieldName } from './config';
import { BuildFormSchema, BuildFormState, BuildForm } from './config';

let schema;
let initialState;
type PersonType = 'fisica' | 'giuridica';

const StaticCommonFormSection = () => {
  const [personType, setPersonType] = useState<PersonType>('fisica');

  const isFisica = personType === 'fisica';
  return (
    <>
      <Typography variant="h6">Dati intestatario</Typography>
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        value={personType}
        onChange={(_, value: PersonType) => setPersonType(value)}>
        <ToggleButton value="fisica">Fisica</ToggleButton>
        <ToggleButton value="giuridica">Giuridica</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label={isFisica ? 'Nome e Cognome' : 'Denominazione'}
        variant="outlined"
        required
        name={'name'}
      />
      <TextField label={isFisica ? 'Codice fiscale' : 'Partita IVA'} variant="outlined" required />
      <TextField label="Email" variant="outlined" type="email" />
    </>
  );
};

const ConfiguraPagamentoDinamico = (props: { servizio: ServizioDinamico }) => {
  const { t } = useTranslation();
  const { servizio } = props;

  const [formState, setFormaState] = useState<FormState>({});
  const [zodIssues, setZodIssues] = useState<ZodIssues>([]);

  const JSONform = mockServiziDinamiciForm[servizio];

  const onChange = (field: FieldName, value: string) => {
    setFormaState({
      ...formState,
      [field]: value
    });
  };

  useEffect(() => {
    initialState = BuildFormState(JSONform.fieldBeans);
    setFormaState(initialState);
    schema = BuildFormSchema(JSONform.fieldBeans);
  }, []);

  const submit = () => {
    const result = (schema as z.ZodObject<any>).safeParse(formState);
    if (result.success) {
      setZodIssues([]);
    } else {
      setZodIssues(result.error.issues);
    }
    console.log(result);
  };

  const reset = () => {
    setFormaState(initialState);
    setZodIssues([]);
  };
  console.log(formState);

  const Form = BuildForm(JSONform.fieldBeans, formState, zodIssues, onChange);

  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step3.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step3.description')}</Typography>
        <Stack direction="column" justifyContent={'space-between'} spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
            {Form}
            <StaticCommonFormSection />
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" gap={2} justifyContent="end">
          <Button variant="outlined" size="large" onClick={reset}>
            Reset
          </Button>
          <Button variant="contained" size="large" onClick={submit}>
            Continua
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ConfiguraPagamentoDinamico;
