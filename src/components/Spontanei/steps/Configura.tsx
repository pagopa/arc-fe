import { Card, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Configura {
  onAmountChange?: (amount: number) => void;
  amount?: number;
  onCausaleChange?: (casuale: string) => void;
}

const ConfiguraPagamento = (props: Configura) => {
  const { onAmountChange, amount = 0, onCausaleChange } = props;
  const { t } = useTranslation();

  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step3.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step3.description')}</Typography>
        <Stack direction="row" justifyContent={'space-between'} spacing={2}>
          <TextField
            label="Importo (€)"
            variant="outlined"
            type="number"
            value={amount}
            disabled={!onAmountChange}
            onChange={(e) => onAmountChange?.(parseInt(e.target.value, 10))}
          />
          <TextField
            label="Causale"
            variant="outlined"
            onChange={(e) => onCausaleChange?.(e.target.value)}
            sx={{ width: '-webkit-fill-available' }}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ConfiguraPagamento;
