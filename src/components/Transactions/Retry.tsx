import React from 'react';
import { Paper, Typography, Stack, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Icon } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface RetryProps {
  action: () => void;
}

const Retry = (props: RetryProps) => {
  const { t } = useTranslation();
  const { action } = props;
  return (
    <Paper sx={{ padding: 4 }}>
      <Stack alignItems="center" spacing={2}>
        <Icon color="error" component={ErrorOutlineIcon} />
        <Typography variant="body2">{t('app.transactions.error.title')}</Typography>
        <Button onClick={action}>{t('app.transactions.error.retry')}</Button>
      </Stack>
    </Paper>
  );
};

export default Retry;
