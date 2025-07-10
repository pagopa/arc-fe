import React from 'react';
import { Autocomplete, Card, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type Servizio = 'Iscrizione Scuola Materna' | 'Rinnovo Licenza Caccia' | 'Bollo Auto';
export type ServizioDinamico = 'Documento da pagare';
interface SelezionaServzioProps {
  setServizio: (servizio: Servizio | null) => void;
  enteConServiziDinamici?: boolean;
}

const SelezionaServizio = (props: SelezionaServzioProps) => {
  const servizi: Servizio[] = ['Iscrizione Scuola Materna', 'Rinnovo Licenza Caccia', 'Bollo Auto'];
  const serviziDinamici: ServizioDinamico[] = ['Documento da pagare'];

  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step2.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step2.description')}</Typography>
        <Autocomplete
          onChange={(_, opt) => props.setServizio((opt as Servizio | null) || null)}
          freeSolo
          options={props.enteConServiziDinamici ? serviziDinamici : servizi}
          renderInput={(params) => <TextField {...params} label="Cerca per nome del servizio" />}
        />
      </Stack>
    </Card>
  );
};

export default SelezionaServizio;
