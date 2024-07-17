import {
  Backdrop,
  Button,
  Card,
  CardActions,
  Modal,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import utils from 'utils';
import { alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AssistanceBackModal = (props: { open: boolean }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Modal
      open={props.open}
      onClose={utils.modal.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
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
              <Typography variant="h4">{t('app.assistance.modalTitle')}</Typography>
              <Typography variant="body1">{t('app.assistance.modalDescription')}</Typography>
              <Stack pt={2} direction={'row'} spacing={2} justifyContent={'end'}>
                <Button variant="outlined" size="large" color="primary" onClick={utils.modal.close}>
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
  );
};

export default AssistanceBackModal;
