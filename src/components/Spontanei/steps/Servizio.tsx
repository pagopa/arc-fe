import React from 'react';
import { Autocomplete, Card, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type Servizio = 'Iscrizione Scuola Materna' | 'Rinnovo Licenza Caccia' | 'Bollo Auto';

interface SelezionaServzioProps {
  setServizio: (servizio: Servizio | null) => void;
}

const SelezionaServizio = (props: SelezionaServzioProps) => {
  const servizi: Servizio[] = ['Iscrizione Scuola Materna', 'Rinnovo Licenza Caccia', 'Bollo Auto'];
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step2.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step2.description')}</Typography>
        <Autocomplete
          onChange={(_, opt) => props.setServizio((opt as Servizio | null) || null)}
          freeSolo
          options={servizi}
          renderInput={(params) => <TextField {...params} label="Cerca per nome del servizio" />}
        />
      </Stack>
    </Card>
  );
};

export default SelezionaServizio;
