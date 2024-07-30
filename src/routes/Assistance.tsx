import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  Stack,
  TextField,
  Typography,
  useTheme,
  Link
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';
import utils from 'utils';

const Assistance = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailConfirmError, setEmailConfirmError] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState('');
  const reg = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

  return (
    <>
      <Stack spacing={3}>
        <Stack
          flex={1}
          direction={{ xs: 'column', sm: 'column' }}
          justifyContent={'space-between'}
          gap={2}
          mb={5}>
          <Typography variant="h3">{t('app.assistance.title')}</Typography>

          <Typography variant="body1">{t('app.assistance.description')}</Typography>
        </Stack>
        <Card
          sx={{
            padding: 2,
            width: '100%'
          }}>
          <CardActions>
            <Stack spacing={2} width={'100%'}>
              <Typography variant="h4">{t('app.assistance.cardTitle')}</Typography>
              <Typography variant="body1">{t('app.assistance.cardDescription')}</Typography>
              <Stack spacing={3}>
                <TextField
                  role="textbox"
                  aria-required="false"
                  value={email}
                  aria-label={t('app.assistance.input1Placeholder')}
                  size="small"
                  error={emailError}
                  helperText={emailError && t('app.assistance.input1Helper')}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={() => {
                    setEmailError(!reg.test(email) && email.length > 0);
                  }}
                  sx={{ maxWidth: { lg: '20vw', md: '25vw', sm: '35vw', xs: '100%' } }}
                  label={t('app.assistance.input1Placeholder')}
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.secondary,
                      fontWeight: 600
                    }
                  }}
                />
                <TextField
                  role="textbox"
                  aria-required="false"
                  value={emailConfirm}
                  error={emailConfirmError}
                  aria-label={t('app.assistance.input2Placeholder')}
                  onChange={(e) => {
                    setEmailConfirm(e.target.value);
                  }}
                  onBlur={() => {
                    setEmailConfirmError(email !== emailConfirm);
                  }}
                  size="small"
                  sx={{ maxWidth: { lg: '20vw', md: '25vw', sm: '35vw', xs: '100%' } }}
                  label={t('app.assistance.input2Placeholder')}
                  helperText={emailConfirmError && t('app.assistance.input2Helper')}
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.secondary,
                      fontWeight: 600
                    }
                  }}
                />
              </Stack>
            </Stack>
          </CardActions>
        </Card>
        <Typography variant="body1">
          <Trans
            i18nKey={t('app.assistance.privacy')}
            components={{
              link1: <Link href="#" fontWeight={800} />
            }}
          />
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => utils.modal.open(utils.modal.ModalId.ASSISTANCEBACK)}>
            {t('app.routes.exit')}
          </Button>
          <Button variant="contained" size="large" href={utils.config.assistanceLink}>
            {t('app.assistance.confirm')}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Assistance;
