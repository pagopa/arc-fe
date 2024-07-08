import { Download } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import MasterCard from '../../assets/creditcard/mastercard.png';
import { TransactionDetail } from '../../models/TransactionDetail';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useReceiptData } from 'hooks/useReceiptData';
import utils from 'utils';

export default function TransactionDetail({
  transactionData
}: {
  transactionData: TransactionDetail;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const receiptData = useReceiptData(transactionData.transactionId);

  return (
    <Grid container>
      <Stack
        direction={{ md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
        width="100%"
        gap={3}>
        <Stack
          direction={{ sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'flex-start', md: 'center' }}
          gap={2}>
          <Typography variant="h2" fontSize={{ xs: 28, md: 32 }}>
            {t('app.transactionDetail.title')}
          </Typography>
          {utils.config.showStatusInfo && <Chip label={transactionData.status} color="success" />}
        </Stack>
        <Button
          data-testid="receipt-download-btn"
          endIcon={<Download />}
          sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          size="large"
          variant="contained"
          disabled={receiptData.isPending || receiptData.error}
          target="_blank"
          href={receiptData.receipt}>
          {t('app.transactionDetail.downloadReceipt')}
        </Button>
      </Stack>

      <Stack spacing={2} mt={3} width={'100%'}>
        <Grid container>
          <Grid container item xs={12} md={7}>
            <Box
              bgcolor={theme.palette.background.paper}
              borderRadius={1.5}
              pt={4}
              pl={3}
              pr={3}
              height={'fit-content'}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" fontSize={{ xs: 22, md: 24 }}>
                    {transactionData.subject}
                  </Typography>

                  <Stack spacing={2} pt={3}>
                    <Grid container item>
                      <Grid item md={5} xs={12}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.partialAmount')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                          {transactionData.partialAmount}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item md={5} xs={12}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.creditorEntity')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                          {transactionData.creditorEntity}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item md={5} xs={12}>
                        <Typography
                          mt={2}
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.debtor')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Stack
                          direction={{ xs: 'column', sm: 'row', md: 'column' }}
                          spacing={{ xs: 0, sm: 1, md: 0 }}>
                          <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                            {transactionData.debtor}
                          </Typography>
                          <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                            ({transactionData.debtorFiscalCode})
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item md={5} xs={12}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.noticeCode')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                          {transactionData.noticeCode}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item md={5} xs={12}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.creditorFiscalCode')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                          {transactionData.creditorFiscalCode}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>

                <Grid item xs={12} pt={3}>
                  <Divider orientation="horizontal" />
                </Grid>
                <Grid item xs={12}>
                  <Stack pt={4.5} pb={4} alignItems={'end'} spacing={2}>
                    <Grid container justifyContent={'space-between'}>
                      <Grid item xs={9}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.total')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          fontSize={{ xs: '22', md: '24' }}
                          variant="h6">
                          <b>{transactionData.total}</b>
                        </Typography>
                      </Grid>
                      <Grid item mt={2}>
                        <Typography
                          fontSize={14}
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          <Trans
                            i18nKey="app.transactionDetail.totalLabel"
                            values={{ fee: transactionData.fee, psp: transactionData.PSP }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container flexDirection={'column'} item xs={12} md={5} mt={{ xs: 3, md: 0 }}>
            <Box
              bgcolor={theme.palette.background.paper}
              borderRadius={1.5}
              pt={4}
              pl={3}
              pb={4}
              ml={{ md: 3 }}
              pr={3}>
              <Stack>
                <Typography fontWeight={700} variant="caption">
                  {t('app.transactionDetail.card2.title').toUpperCase()}
                </Typography>
              </Stack>
              <Grid item xs={12} sm={12} pt={3}>
                <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                  {t('app.transactionDetail.paidBy')}
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row', md: 'column' }}
                  spacing={{ xs: 0, sm: 1, md: 0 }}>
                  <Typography sx={{ wordBreak: 'break-word' }} fontSize={16} fontWeight={600}>
                    {transactionData.payer.name}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontSize={16} fontWeight={600}>
                    ({transactionData.payer.taxCode})
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={2} pt={2}>
                  <Divider />
                  <Grid container>
                    <Grid item xs={1} paddingTop={3.065} pr={2}>
                      <img src={MasterCard} />
                    </Grid>
                    <Grid item xs={10}>
                      <Stack pt={0.75} pl={2}>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.paymentMethod')}
                        </Typography>
                        <Typography sx={{ wordBreak: 'break-word' }} fontSize={16} fontWeight={600}>
                          {`${transactionData.paymentMethod} ${transactionData.cardNumber}`}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Stack>
                    <Typography
                      sx={{ wordBreak: 'break-word' }}
                      color={theme.palette.text.secondary}>
                      {t('app.transactionDetail.accountHolder')}
                    </Typography>
                    <Typography sx={{ wordBreak: 'break-word' }} fontSize={16} fontWeight={600}>
                      {transactionData.accountHolder}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack>
                    <Typography
                      sx={{ wordBreak: 'break-word' }}
                      color={theme.palette.text.secondary}>
                      {t('app.transactionDetail.PSP')}
                    </Typography>
                    <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                      {transactionData.PSP}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack>
                    <Typography
                      sx={{ wordBreak: 'break-word' }}
                      color={theme.palette.text.secondary}>
                      {t('app.transactionDetail.dateAndTime')}
                    </Typography>
                    <Typography sx={{ wordBreak: 'break-word' }} fontSize={16} fontWeight={600}>
                      {transactionData.dateTime}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Grid container>
                    <Grid item xs={10}>
                      <Stack>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          RRN
                        </Typography>
                        <Typography
                          fontWeight={600}
                          color={theme.palette.primary.main}
                          fontSize={16}
                          sx={{ wordBreak: 'break-word' }}>
                          {transactionData.PRN}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} paddingTop={1} textAlign={'end'}>
                      <CopyToClipboardButton
                        value={transactionData.PRN.toString()}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography
                        sx={{ wordBreak: 'break-word' }}
                        color={theme.palette.text.secondary}>
                        {t('app.transactionDetail.authCode')}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        color={theme.palette.primary.main}
                        fontSize={16}
                        sx={{ wordBreak: 'break-word' }}>
                        {transactionData.authCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} paddingTop={1} textAlign={'end'}>
                      <CopyToClipboardButton
                        value={transactionData.authCode.toString()}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container>
                    <Grid item xs={10}>
                      <Stack>
                        <Typography
                          sx={{ wordBreak: 'break-word' }}
                          color={theme.palette.text.secondary}>
                          {t('app.transactionDetail.transactionId')}
                        </Typography>
                        <Typography
                          fontWeight={600}
                          color={theme.palette.primary.main}
                          fontSize={16}
                          sx={{ wordBreak: 'break-word' }}>
                          {transactionData.transactionId.length > 20
                            ? transactionData.transactionId.substring(0, 20) + '…'
                            : transactionData.transactionId}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} paddingTop={1} textAlign={'end'}>
                      <CopyToClipboardButton
                        value={transactionData.transactionId.toString()}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
