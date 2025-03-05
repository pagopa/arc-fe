import React from 'react';
import {
  Autocomplete,
  Button,
  Card,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import utils from 'utils';

const steps = ['Seleziona l’ente', 'Seleziona il servizio', 'Configura il pagamento'];

const Steps = (props: { activeStep: number }) => (
  <Stepper activeStep={props.activeStep} alternativeLabel>
    {steps.map((label) => {
      return (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      );
    })}
  </Stepper>
);

interface SelezionaEnteProps {
  setEnte: (ente: string | null) => void;
}

interface Option {
  label: string;
  value: string;
}

const SelezionaEnte = (props: SelezionaEnteProps) => {
  const { data } = utils.loaders.getOrganizations();

  const options: Option[] =
    data?.organizations?.map((org) => ({ label: org.paFullName, value: org.paTaxCode })) || [];

  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography>Seleziona l’ente beneficiario</Typography>
        <Typography>
          Inizia a digitare il nome dell’ente beneficiario del pagamento e selezionalo dalla lista.
        </Typography>
        <Autocomplete
          onChange={(_, opt) => props.setEnte((opt as Option | null)?.value || null)}
          id="free-solo-demo"
          freeSolo
          options={options}
          renderInput={(params) => <TextField {...params} label="Cerca per nome dell'ente" />}
        />
      </Stack>
    </Card>
  );
};

const SelezionaServizio = () => 'Seleziona servizio';
const ConfiguraPagamento = () => 'ConfiguraPagamento';

const Spontanei = () => {
  const [steps, setSteps] = React.useState(0);
  const [ente, setEnte] = React.useState<string | null>(null);

  const onContinue = () => {
    setSteps(steps + 1);
  };

  return (
    <Stack>
      <Typography variant="h6">Configura pagamento spontaneo</Typography>
      <Typography>Compila i campi richiesti e procedi col pagamento.</Typography>
      <Stack spacing={4} mt={4}>
        <Steps activeStep={steps} />
        {steps === 0 && <SelezionaEnte setEnte={setEnte} />}
        {steps === 1 && <SelezionaServizio />}
        {steps === 2 && <ConfiguraPagamento />}
        <Stack direction="row" justifyContent={'space-between'}>
          <Button variant="outlined" startIcon={<ArrowBack />}>
            Esci
          </Button>
          <Button variant="contained" onClick={onContinue} disabled={steps === 0 && !ente}>
            Continua
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Spontanei;
