import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { Payment } from '../Form';
import { useField } from 'formik';

type PersonType = Payment['type'];

const StaticFormSection = () => {
  const [payer, payerMeta] = useField<Payment['payer']>('payer');
  const [payerId, payerIdMeta] = useField<Payment['payerId']>('payerId');
  const [payerEmail, payerEmailMeta] = useField<Payment['payerEmail']>('payerEmail');
  const [type, , meta] = useField<Payment['type']>('type');
  const isFisica = type.value === 'PF';

  return (
    <>
      <Typography variant="h6" mt={2} mb={2}>
        Dati intestatario
      </Typography>
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        value={type.value}
        onChange={(_, value: PersonType) => meta.setValue(value)}>
        <ToggleButton value="PF" name={type.name}>
          Fisica
        </ToggleButton>
        <ToggleButton value="PG" name={type.name}>
          Giuridica
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" gap={2} mt={2}>
        <TextField
          label={isFisica ? 'Nome e Cognome' : 'Denominazione'}
          variant="outlined"
          required
          {...payer}
          error={payerMeta.touched && Boolean(payerMeta.error)}
          helperText={payerMeta.touched && payerMeta.error}
          sx={{ width: '-webkit-fill-available' }}
        />
        <TextField
          label={isFisica ? 'Codice fiscale' : 'Partita IVA'}
          variant="outlined"
          required
          {...payerId}
          error={payerIdMeta.touched && Boolean(payerIdMeta.error)}
          helperText={payerIdMeta.touched && payerIdMeta.error}
          sx={{ width: '-webkit-fill-available' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          {...payerEmail}
          error={payerEmailMeta.touched && Boolean(payerEmailMeta.error)}
          helperText={payerEmailMeta.touched && payerEmailMeta.error}
          sx={{ width: '-webkit-fill-available' }}
        />
      </Stack>
    </>
  );
};

export default StaticFormSection;
