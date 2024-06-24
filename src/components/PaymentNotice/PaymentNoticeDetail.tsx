import {
  AccountBalance,
  Close,
  DateRange,
  Download,
  Euro,
  InfoOutlined,
  ReceiptLong
} from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentNoticeDetail } from 'models/PaymentNoticeDetail';

export default function PaymentNoticeDetail({
  paymentNoticeDetail
}: {
  paymentNoticeDetail: PaymentNoticeDetail;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Backdrop
          sx={{ background: alpha(theme.palette.text.primary, 0.7), justifyContent: 'flex-end' }}
          open={open}
          onClick={handleClose}>
          <Box
            sx={{ background: theme.palette.background.default }}
            width={{ xs: '100%', sm: '50%' }}
            height={'100%'}
            alignSelf={'end'}>
            <Grid container pl={3}>
              <Grid item xs={12} textAlign={'end'} pr={2} pt={2}>
                <IconButton
                  data-testid="collapseModal"
                  aria-label={t('app.modal.close')}
                  onClick={() => handleClose()}
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
      <Stack width={'100%'} spacing={3}>
        <Typography variant="h4">{t('app.paymentNoticeDetail.title')}</Typography>
        <Grid container rowGap={3}>
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                padding: 2
              }}>
              <CardActions>
                <Stack spacing={2} width={'100%'} alignContent={'center'}>
                  <Typography variant="body1" fontWeight={700}>
                    {t('app.paymentNoticeDetail.card1.title').toUpperCase()}
                  </Typography>
                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9}>
                      <Grid item alignContent={'center'}>
                        <Euro htmlColor={theme.palette.grey[700]} />
                      </Grid>
                      <Grid item xs={8} sm={2} ml={2}>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          {paymentNoticeDetail.amount}
                        </Typography>
                        <Typography
                          color={theme.palette.text.secondary}
                          variant="body1"
                          fontSize={15}>
                          {t('app.paymentNoticeDetail.card1.field1')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <IconButton
                        data-testid="infoButton"
                        aria-label={t('app.info')}
                        onClick={() => {
                          openModal(true);
                        }}
                        size="small">
                        <InfoOutlined color="primary" sx={{ fontSize: 24 }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9}>
                      <Grid item alignContent={'center'}>
                        <AccountBalance htmlColor={theme.palette.grey[700]} />
                      </Grid>
                      <Grid item xs={8} ml={2}>
                        <Typography
                          color={theme.palette.text.secondary}
                          variant="body1"
                          fontSize={15}>
                          {t('app.paymentNoticeDetail.card1.field2')}
                        </Typography>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          {paymentNoticeDetail.paFullName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9} flexGrow={1} maxWidth={'100%'}>
                      <Grid item alignContent={'center'}>
                        <ReceiptLong htmlColor={theme.palette.grey[700]} />
                      </Grid>
                      <Grid item xs={9} ml={2}>
                        <Typography
                          color={theme.palette.text.secondary}
                          variant="body1"
                          fontSize={15}>
                          {t('app.paymentNoticeDetail.card1.field3')}
                        </Typography>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          {paymentNoticeDetail.subject}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9} flexGrow={1} maxWidth={'100%'}>
                      <Grid item alignContent={'center'}>
                        <DateRange htmlColor={theme.palette.grey[700]} />
                      </Grid>
                      <Grid item xs={9} ml={2}>
                        <Typography
                          color={theme.palette.text.secondary}
                          variant="body1"
                          fontSize={15}>
                          {t('app.paymentNoticeDetail.card1.field4')}
                        </Typography>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          {paymentNoticeDetail.dueDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9}>
                      <Stack>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.field5')}
                        </Typography>
                        <Typography
                          fontWeight={600}
                          color={theme.palette.primary.main}
                          sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                          {paymentNoticeDetail.iupd}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <CopyToClipboardButton
                        value={paymentNoticeDetail.iupd}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9}>
                      <Stack>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.field6')}
                        </Typography>
                        <Typography
                          fontWeight={600}
                          color={theme.palette.primary.main}
                          sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                          {paymentNoticeDetail.paTaxCode}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <CopyToClipboardButton
                        value={paymentNoticeDetail.paTaxCode}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={5} paddingLeft={{ xs: 0, md: 3 }}>
            <Card
              sx={{
                padding: 2
              }}>
              <CardActions>
                <Stack spacing={2} width={'100%'} alignContent={'center'}>
                  <Typography variant="body1" fontWeight={700}>
                    {t('app.paymentNoticeDetail.card2.title').toUpperCase()}
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        {t('app.paymentNoticeDetail.card2.field1')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} textAlign={{ sm: 'right' }}>
                      <Typography variant="body1" fontWeight={700}>
                        {paymentNoticeDetail.firstInstallmentDate}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        {t('app.paymentNoticeDetail.card2.field2')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} textAlign={{ sm: 'right' }}>
                      <Typography variant="body1" fontWeight={700}>
                        {paymentNoticeDetail.firstInstallmentAmount}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Button variant="contained" fullWidth>
                        <Typography
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            textAlign: 'center',
                            color: theme.palette.primary.contrastText
                          }}>
                          {t('app.paymentNoticeDetail.card2.button1')}
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={12} mt={3}>
                      <Divider>
                        <Typography variant="caption" color="GrayText">
                          {t('app.paymentNoticeDetail.card2.label1')}
                        </Typography>
                      </Divider>
                    </Grid>
                    <Grid item mt={2} xs={12}>
                      <Button startIcon={<Download />} fullWidth>
                        <Typography variant="body1" fontWeight={700} color="primary">
                          {t('app.paymentNoticeDetail.card2.button2')}
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
