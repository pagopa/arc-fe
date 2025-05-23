import { AccountBalance, DateRange, Euro, InfoOutlined, ReceiptLong } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import React from 'react';
import { useTranslation } from 'react-i18next';
import utils from 'utils';
import {
  PaymentNoticeDetailsType,
  PaymentNoticeEnum,
  PaymentOptionsDetailsType
} from 'models/PaymentNotice';
import { addItem, deleteItem, toggleCartDrawer, isItemInCart } from 'store/CartStore';
import { useStore } from 'store/GlobalStore';
import notify from 'utils/notify';
/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.Card` for rendering the payment notice card.
 *
 * @component
 * @private
 */
export const _Detail = ({ paymentNotice }: { paymentNotice: PaymentNoticeDetailsType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const open = () => utils.modal.open(utils.modal.ModalId.PAYMENT_NOTICE_MODAL);
  const {
    state: { cart }
  } = useStore();

  const handleClick = () => {
    const { paTaxCode, paFullName } = paymentNotice;
    // assumig that we have only one payment option
    // this is not a problem, because we not manage multiple payment options in any case
    const paymentNoticeSigleOption = paymentNotice.paymentOptions as PaymentOptionsDetailsType;
    const { iuv, amountValue: amount, nav, description } = paymentNoticeSigleOption;
    if (isItemInCart(iuv)) return deleteItem(iuv);
    if (cart.items.length >= 5) return notify.emit(t('app.cart.items.full'), 'error');
    addItem({
      amount,
      paTaxCode,
      paFullName,
      iuv,
      nav,
      description
    });
    toggleCartDrawer();
  };

  return paymentNotice?.type === PaymentNoticeEnum.SINGLE ? (
    <>
      <Grid container>
        <Stack width={'100%'} spacing={3}>
          <Typography variant="h4" component={'h1'}>
            {t('app.paymentNoticeDetail.title')}
          </Typography>
          <Grid container rowGap={3}>
            <Grid item xs={12} md={7}>
              <Card>
                <CardActions
                  sx={{
                    padding: 3
                  }}>
                  <Stack spacing={2} width={'100%'} alignContent={'center'}>
                    <Typography variant="body1" component={'h2'} fontWeight={700}>
                      {t('app.paymentNoticeDetail.card1.title').toUpperCase()}
                    </Typography>
                    <Grid container item justifyContent={'space-between'}>
                      <Grid container item xs={9}>
                        <Grid item alignContent={'center'}>
                          <Euro htmlColor={theme.palette.grey[700]} />
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sm={2}
                          ml={2}
                          component={'dl'}
                          display={'flex'}
                          flexDirection={'column'}
                          data-testid="app.paymentNoticeDetail.amount">
                          <Typography
                            component="dt"
                            order="2"
                            color={theme.palette.text.secondary}
                            variant="body1"
                            fontSize={15}>
                            {t('app.paymentNoticeDetail.card1.amount')}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            order="1"
                            component="dd"
                            fontWeight={700}>
                            {paymentNotice?.paymentOptions.amount}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <IconButton
                          data-testid="infoButton"
                          aria-label={t('app.info')}
                          onClick={open}
                          size="small">
                          <InfoOutlined color="primary" sx={{ fontSize: 24, marginRight: 1 }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container item columnGap={2} justifyContent={'space-between'}>
                      <Grid container item xs={9}>
                        <Grid item alignContent={'center'}>
                          <AccountBalance htmlColor={theme.palette.grey[700]} />
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          ml={2}
                          component={'dl'}
                          data-testid="app.paymentNoticeDetail.paFullname">
                          <Typography
                            color={theme.palette.text.secondary}
                            variant="body1"
                            component="dt"
                            fontSize={15}>
                            {t('app.paymentNoticeDetail.card1.paFullname')}
                          </Typography>
                          <Typography variant="body1" component="dd" fontSize={16} fontWeight={700}>
                            {paymentNotice.paFullName}
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
                        <Grid
                          item
                          xs={9}
                          ml={2}
                          component={'dl'}
                          data-testid="app.paymentNoticeDetail.subject">
                          <Typography
                            component="dt"
                            color={theme.palette.text.secondary}
                            variant="body1"
                            fontSize={15}>
                            {t('app.paymentNoticeDetail.card1.subject')}
                          </Typography>
                          <Typography variant="body1" fontSize={16} component="dd" fontWeight={700}>
                            {paymentNotice.type === PaymentNoticeEnum.SINGLE &&
                              paymentNotice.paymentOptions.description}
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
                        <Grid
                          item
                          xs={9}
                          ml={2}
                          component={'dl'}
                          data-testid="app.paymentNoticeDetail.dueDate">
                          <Typography
                            color={theme.palette.text.secondary}
                            variant="body1"
                            component="dt"
                            fontSize={15}>
                            {t('app.paymentNoticeDetail.card1.dueDate')}
                          </Typography>
                          <Typography variant="body1" fontSize={16} component="dd" fontWeight={700}>
                            {paymentNotice.paymentOptions.dueDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container justifyContent={'space-between'}>
                      <Grid
                        item
                        component={'dl'}
                        data-testid="app.paymentNoticeDetail.iuv"
                        alignItems={'center'}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          component="dt"
                          color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.iuv')}
                        </Typography>
                        <Typography
                          component="dd"
                          fontWeight={600}
                          color={theme.palette.primary.main}
                          sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                          {paymentNotice.paymentOptions.iuv}
                        </Typography>
                      </Grid>
                      <CopyToClipboardButton value={paymentNotice.paymentOptions.iuv} />
                    </Grid>
                    <Divider />

                    <Grid
                      container
                      justifyContent={'space-between'}
                      data-testid="app.paymentNoticeDetail.paTaxCode">
                      <Grid item component={'dl'}>
                        <Typography
                          component="dt"
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.paTaxCode')}
                        </Typography>
                        <Typography
                          component="dd"
                          fontWeight={600}
                          color={theme.palette.primary.main}
                          sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                          {paymentNotice.paTaxCode}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CopyToClipboardButton value={paymentNotice.paTaxCode} />
                      </Grid>
                    </Grid>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={5} paddingLeft={{ xs: 0, md: 3 }}>
              <Card component="aside">
                <CardActions sx={{ padding: 3 }}>
                  <Stack spacing={3} width={'100%'} alignContent={'center'}>
                    <Typography variant="body1" fontSize={14} fontWeight={700} component={'h2'}>
                      {t('app.paymentNoticeDetail.card2.title').toUpperCase()}
                    </Typography>
                    <Grid
                      container
                      component={'dl'}
                      data-testid="app.paymentNoticeDetail.firstInstallmentDate">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1" fontSize={16} component="dt">
                          {t('app.paymentNoticeDetail.card2.firstInstallmentDate')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} textAlign={{ sm: 'right' }}>
                        <Typography variant="body1" fontSize={16} fontWeight={700} component="dd">
                          {paymentNotice.paymentOptions.dueDate}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      component={'dl'}
                      data-testid="app.paymentNoticeDetail.firstInstallmentAmount">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1" fontSize={16} component="dt">
                          {t('app.paymentNoticeDetail.card2.firstInstallmentAmount')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} textAlign={{ sm: 'right' }}>
                        <Typography variant="body1" fontSize={24} fontWeight={700} component="dd">
                          {paymentNotice.paymentOptions.amount}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                      <Grid item xs={12}>
                        <Button
                          id="payment-notice-add-button"
                          variant={
                            isItemInCart(paymentNotice.paymentOptions.iuv)
                              ? 'outlined'
                              : 'contained'
                          }
                          color={
                            isItemInCart(paymentNotice.paymentOptions.iuv) ? 'error' : 'primary'
                          }
                          fullWidth
                          size="medium"
                          onClick={handleClick}>
                          <Typography
                            sx={{
                              fontWeight: 'fontWeightMedium',
                              textAlign: 'center',
                              color: 'inherit'
                            }}>
                            {isItemInCart(paymentNotice.paymentOptions.iuv)
                              ? t('app.paymentNoticeDetail.card2.removeItemFromCart')
                              : t('app.paymentNoticeDetail.card2.addItemToCart')}
                          </Typography>
                        </Button>
                      </Grid>
                      <Typography variant="body1" fontSize={16} mt={2}>
                        {t('app.cart.items.info')}
                      </Typography>
                    </Grid>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </>
  ) : (
    <div>Multiple PaymentNotice type is not supported</div>
  );
};
