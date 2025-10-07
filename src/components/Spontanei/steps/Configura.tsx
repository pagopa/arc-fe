import { Card, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import StaticFormSection from '../DinamicForm/StaticFormSection';
import { Payment } from '../Form';
import { Servizio, ServizioDinamico } from './Servizio';
import { useField } from 'formik';
interface Configura {
  servizio: Servizio | ServizioDinamico | null;
}

const ConfiguraPagamento = (props: Configura) => {
  const { servizio } = props;
  const { t } = useTranslation();
  const [payee, payeeMeta] = useField<Payment['payee']>('payee');
  const [payeeId, payeeIdMeta] = useField<Payment['payeeId']>('payeeId');
  const [amount, amountMeta] = useField<Payment['amount']>('amount');
  const [causale, causaleMeta] = useField<Payment['causale']>('causale');

  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step3.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step3.description')}</Typography>
        <Stack direction="row" justifyContent={'space-between'} spacing={2}>
          <TextField
            label="Nome Cognome / Ragione Sociale"
            variant="outlined"
            required
            {...payee}
            error={payeeMeta.touched && Boolean(payeeMeta.error)}
            helperText={payeeMeta.touched && payeeMeta.error}
            sx={{ width: '-webkit-fill-available' }}
          />
          <TextField
            label="Codice Fiscale / Partita IVA"
            variant="outlined"
            required
            {...payeeId}
            error={payeeIdMeta.touched && Boolean(payeeIdMeta.error)}
            helperText={payeeIdMeta.touched && payeeIdMeta.error}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
        <Stack direction="row" justifyContent={'space-between'} spacing={2}>
          <TextField
            label="Importo (€)"
            variant="outlined"
            type="number"
            required
            {...amount}
            error={amountMeta.touched && Boolean(amountMeta.error)}
            helperText={amountMeta.touched && amountMeta.error}
            disabled={servizio === 'Rinnovo Licenza Caccia'}
          />
          <TextField
            label="Causale"
            variant="outlined"
            required
            {...causale}
            error={causaleMeta.touched && Boolean(causaleMeta.error)}
            helperText={causaleMeta.touched && causaleMeta.error}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
        <StaticFormSection />
      </Stack>
    </Card>
  );
};

export default ConfiguraPagamento;
