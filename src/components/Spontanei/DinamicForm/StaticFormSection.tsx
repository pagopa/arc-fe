import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";

type PersonType = 'fisica' | 'giuridica';

const StaticFormSection = () => {
  const [personType, setPersonType] = useState<PersonType>('fisica');

  const isFisica = personType === 'fisica';
  return (
    <>
      <Typography variant="h6" mt={2} mb={2}>Dati intestatario</Typography>
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        value={personType}
        onChange={(_, value: PersonType) => setPersonType(value)}>
        <ToggleButton value="fisica">Fisica</ToggleButton>
        <ToggleButton value="giuridica">Giuridica</ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" gap={2} mt={2}>
        <TextField
          label={isFisica ? 'Nome e Cognome' : 'Denominazione'}
          variant="outlined"
          required
          name={'name'}
        />
        <TextField label={isFisica ? 'Codice fiscale' : 'Partita IVA'} variant="outlined" required />
        <TextField label="Email" variant="outlined" type="email" />
      </Stack>
    </>
  );
};

export default StaticFormSection
