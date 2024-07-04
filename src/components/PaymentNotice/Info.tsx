import { ErrorOutline } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';

export const _Info = () => {
  const { t } = useTranslation();
  return (
    <Stack
      padding={1.3}
      gap={1}
      justifyContent="flex-start"
      marginTop={{ xs: 10, lg: 0 }}
      component="aside">
      <Typography variant="body1" component="p">
        {t('app.paymentNotices.alert.info')}
      </Typography>
      <Typography color="error" component="div">
        <ButtonNaked
          variant="text"
          size="medium"
          color="inherit"
          startIcon={<ErrorOutline />}
          aria-label={t('app.paymentNotices.alert.action')}>
          {t('app.paymentNotices.alert.action')}
        </ButtonNaked>
      </Typography>
    </Stack>
  );
};
