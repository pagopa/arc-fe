import React from 'react';
import { Autocomplete, Card, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PaymentNoticeDetailsDTO } from '../../../../generated/apiClient';

export type Servizio = 'Iscrizione Scuola Materna' | 'Rinnovo Licenza Caccia' | 'Bollo Auto';

interface SelezionaServzioProps {
  spontaneo: PaymentNoticeDetailsDTO;
}

const Riepilogo = (props: SelezionaServzioProps) => {
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step4.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step4.description')}</Typography>
        {JSON.stringify(props.spontaneo)}
      </Stack>
    </Card>
  );
};

export default Riepilogo;
