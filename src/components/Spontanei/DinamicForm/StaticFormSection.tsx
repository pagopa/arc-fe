import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { Payment } from "../Form";

type PersonType = Payment['type'];

const StaticFormSection = (props: {payment: Payment, updatePayment: (field: Partial<Payment>) => void; }) => {
  const { type, payer, payerId, payerEmail } = props.payment;
  const isFisica = type === 'PF';

  return (
    <>
      <Typography variant="h6" mt={2} mb={2}>Dati intestatario</Typography>
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        value={type}
        onChange={(_, value: PersonType) => props.updatePayment({type: value})}>
        <ToggleButton value="PF">Fisica</ToggleButton>
        <ToggleButton value="PG">Giuridica</ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" gap={2} mt={2}>
        <TextField
          label={isFisica ? 'Nome e Cognome' : 'Denominazione'}
          variant="outlined"
          required
          value={payer}
          name={'name'}
          onChange={(e) => props.updatePayment({payer: e.target.value})}
          sx={{ width: '-webkit-fill-available' }}
        />
        <TextField
          label={isFisica ? 'Codice fiscale' : 'Partita IVA'}
          variant="outlined"
          required
          value={payerId}
          onChange={(e) => props.updatePayment({payerId: e.target.value})}
          sx={{ width: '-webkit-fill-available' }} />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={payerEmail}
          onChange={(e) => props.updatePayment({payerEmail: e.target.value})}
          sx={{ width: '-webkit-fill-available' }} />
      </Stack>
    </>
  );
};

export default StaticFormSection
