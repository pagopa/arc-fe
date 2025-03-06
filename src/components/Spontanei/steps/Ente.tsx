import React from 'react';
import { Autocomplete, Card, Stack, TextField, Typography } from '@mui/material';
import utils from 'utils';
import { useTranslation } from 'react-i18next';

interface SelezionaEnteProps {
  setEnte: (ente: string | null) => void;
}

interface EnteOption {
  label: string;
  value: string;
}
const SelezionaEnte = (props: SelezionaEnteProps) => {
  const { data } = utils.loaders.getOrganizations();
  const { t } = useTranslation();

  const options: EnteOption[] =
    data?.organizations?.map((org) => ({ label: org.paFullName, value: org.paTaxCode })) || [];

  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step1.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step1.description')}</Typography>
        <Autocomplete
          onChange={(_, opt) => props.setEnte((opt as EnteOption | null)?.value || null)}
          id="free-solo-demo"
          freeSolo
          options={options}
          renderInput={(params) => <TextField {...params} label="Cerca per nome dell'ente" />}
        />
      </Stack>
    </Card>
  );
};

export default SelezionaEnte;
