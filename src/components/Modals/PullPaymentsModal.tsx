import {
  Backdrop,
  Button,
  Card,
  CardActions,
  Modal,
  Stack,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';
import utils from 'utils';

const PullPaymentsModal = (props: { open: boolean }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Modal
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onClose={utils.modal.close}
      open={props.open}>
      <Backdrop
        sx={{ background: alpha(theme.palette.text.primary, 0.7) }}
        open={props.open}
        onClick={utils.modal.close}>
        <Card
          sx={{
            padding: 3,
            width: '50%'
          }}>
          <CardActions>
            <Stack spacing={2} width={'100%'}>
              <Typography variant="h4">{t('app.paymentNotices.optin.title')}</Typography>
              <Typography variant="body1">{t('app.paymentNotices.optin.body')}</Typography>
              <Stack pt={2} direction={'row'} spacing={2} justifyContent={'end'}>
                <Button variant="outlined" size="large" color="primary" onClick={utils.modal.close}>
                  {t('app.routes.cancel')}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    if (utils.storage.pullPaymentsOptIn.set()) {
                      navigate(ArcRoutes.PAYMENT_NOTICES);
                    } else {
                      console.warn('Something went wrong trying to set a session storage item');
                    }
                    utils.modal.close();
                  }}>
                  {t('app.routes.continue')}
                </Button>
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      </Backdrop>
    </Modal>
  );
};

export default PullPaymentsModal;
