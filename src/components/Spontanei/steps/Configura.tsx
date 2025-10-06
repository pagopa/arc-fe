import { Card, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import StaticFormSection from '../DinamicForm/StaticFormSection';
import { Payment } from '../Form';
import { Servizio, ServizioDinamico } from './Servizio';

interface Configura {
  updatePayment: (field: Partial<Payment>) => void;
  payment: Payment;
  servizio: Servizio | ServizioDinamico | null;
}

const ConfiguraPagamento = (props: Configura) => {
  const { payment, updatePayment, servizio } = props;
  const { t } = useTranslation();

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
            value={payment.payee}
            onChange={(e) => updatePayment({ payee: e.target.value})}
            sx={{ width: '-webkit-fill-available' }}
          />
          <TextField
            label="Codice Fiscale / Partita IVA"
            variant="outlined"
            required
            value={payment.payeeId}
            onChange={(e) => updatePayment({payeeId: e.target.value})}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
        <Stack direction="row" justifyContent={'space-between'} spacing={2}>
          <TextField
            label="Importo (€)"
            variant="outlined"
            type="number"
            value={payment.amount}
            disabled={servizio === 'Rinnovo Licenza Caccia'}
            onChange={(e) => updatePayment({ amount: parseInt(e.target.value, 10)})}
          />
          <TextField
            label="Causale"
            variant="outlined"
            required
            value={payment.causale}
            onChange={(e) => updatePayment({causale: e.target.value})}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
        <StaticFormSection payment={payment} updatePayment={updatePayment}/>
      </Stack>
    </Card>
  );
};

export default ConfiguraPagamento;
