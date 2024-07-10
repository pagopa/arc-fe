import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  Stack,
  TextField,
  Typography,
  useTheme,
  Link,
  Modal,
  Backdrop
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { alpha } from '@mui/material';
import utils from 'utils';

const Assistance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const reg = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  const emailError = !reg.test(email) && email.length > 0;
  const emailConfirmError = email !== emailConfirm;

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Backdrop
          sx={{ background: alpha(theme.palette.text.primary, 0.7) }}
          open={open}
          onClick={handleClose}>
          <Card
            sx={{
              padding: 3,
              width: '50%'
            }}>
            <CardActions>
              <Stack spacing={2} width={'100%'}>
                <Typography variant="h4">{t('app.assistance.modalTitle')}</Typography>
                <Typography variant="body1">{t('app.assistance.modalDescription')}</Typography>
                <Stack pt={2} direction={'row'} spacing={2} justifyContent={'end'}>
                  <Button variant="outlined" size="large" color="primary" onClick={handleClose}>
                    {t('app.routes.cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      navigate(-1);
                    }}>
                    {t('app.routes.exit')}
                  </Button>
                </Stack>
              </Stack>
            </CardActions>
          </Card>
        </Backdrop>
      </Modal>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  size="small"
                  sx={{ maxWidth: { lg: '20vw', md: '25vw', sm: '35vw', xs: '100%' } }}
                  label={t('app.assistance.input2Placeholder')}
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
            onClick={openModal}>
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
