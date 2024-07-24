import { Backdrop, Box, Grid, IconButton, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import utils from 'utils';
import { alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';

const AssistanceBackModal = (props: { open: boolean }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Modal
      open={props.open}
      disableScrollLock
      onClose={utils.modal.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Backdrop
        sx={{ background: alpha(theme.palette.text.primary, 0.7), justifyContent: 'flex-end' }}
        open={props.open}
        onClick={utils.modal.close}>
        <Box
          sx={{ background: theme.palette.background.default }}
          width={{ xs: '100vw', sm: '69vw', md: '46vw', lg: '35vw', xl: '28vw' }}
          borderRadius={{ xs: 2, sm: 0 }}
          height={{ xs: '75%', sm: '100%' }}
          alignSelf={'end'}>
          <Grid container pl={3}>
            <Grid item xs={12} textAlign={'end'} pr={2} pt={2}>
              <IconButton
                data-testid="collapseModal"
                aria-label={t('app.modal.close')}
                onClick={utils.modal.close}
                size="large">
                <Close />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight={700}>
                {t('app.paymentNoticeDetail.modal.title')}
              </Typography>
              <Typography mt={3} variant="body1">
                {t('app.paymentNoticeDetail.modal.description')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Backdrop>
    </Modal>
  );
};

export default AssistanceBackModal;
