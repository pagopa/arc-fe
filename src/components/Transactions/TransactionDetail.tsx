import { Download } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import MasterCard from '../../assets/creditcard/mastercard.png';
import { TransactionDetail } from '../../models/TransactionDetail';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReceiptData } from 'hooks/useReceiptData';
import humanDate from '../../utils/datetools';
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
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        width="100%"
        gap={3}>
        <Stack direction={{ sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
          <Typography variant="h4">{transactionData.subject}</Typography>
          {utils.config.showStatusInfo && <Chip label={transactionData.status} color="success" />}
        </Stack>
        <Button
          data-testid="receipt-download-btn"
          endIcon={<Download />}
          size="large"
          variant="contained"
          disabled={receiptData.isPending || receiptData.error}
          target="_blank"
          href={receiptData.receipt}>
          {t('app.transactionDetail.downloadReceipt')}
        </Button>
      </Stack>

      <Stack spacing={2} mt={3} width={'100%'}>
        <Box display={'flex'}>
          <Typography sx={{ wordBreak: 'break-word' }}>
            {t('app.transactionDetail.createdOn')}
          </Typography>
          <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
            &nbsp;{humanDate(navigator.language, transactionData.dateTime)}
          </Typography>
        </Box>
        <Box bgcolor={theme.palette.background.paper} borderRadius={1.5} pt={4} pl={3} pr={3}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2} pt={1}>
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.paidBy')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.paidBy}
                  </Typography>
                </Stack>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography
                      sx={{ wordBreak: 'break-word' }}
                      color={theme.palette.text.secondary}>
                      {t('app.transactionDetail.authCode')}
                    </Typography>
                    <Typography
                      fontWeight={600}
                      color={theme.palette.primary.main}
                      sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                      {transactionData.authCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} paddingTop={1}>
                    <CopyToClipboardButton
                      value={transactionData.authCode.toString()}
                      color="primary"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={9}>
                    <Stack>
                      <Typography
                        sx={{ wordBreak: 'break-word' }}
                        color={theme.palette.text.secondary}>
                        {t('app.transactionDetail.transactionId')}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        color={theme.palette.primary.main}
                        sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                        {transactionData.transactionId.length > 20
                          ? transactionData.transactionId.substring(0, 20) + '…'
                          : transactionData.transactionId}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2} paddingTop={1}>
                    <CopyToClipboardButton
                      value={transactionData.transactionId.toString()}
                      color="primary"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={9}>
                    <Stack>
                      <Typography
                        sx={{ wordBreak: 'break-word' }}
                        color={theme.palette.text.secondary}>
                        PRN
                      </Typography>
                      <Typography
                        fontWeight={600}
                        color={theme.palette.primary.main}
                        sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                        {transactionData.PRN}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2} paddingTop={1}>
                    <CopyToClipboardButton value={transactionData.PRN.toString()} color="primary" />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2} pt={1}>
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.noticeOwner')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.owedBy}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    ({transactionData.owedByFiscalCode})
                  </Typography>
                </Stack>
                <Grid container pt={1}>
                  <Grid item xs={1} paddingTop={3.065} pr={2}>
                    <img src={MasterCard} />
                  </Grid>
                  <Grid item xs={10}>
                    <Stack pt={0.75} pb={0.75} pl={2}>
                      <Typography
                        sx={{ wordBreak: 'break-word' }}
                        color={theme.palette.text.secondary}>
                        {t('app.transactionDetail.paymentMethod')}
                      </Typography>
                      <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                        {`${transactionData.paymentMethod} ${transactionData.cardNumber}`}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.PSP')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.PSP}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.dateAndTime')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {humanDate(navigator.language, transactionData.dateTime)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={4.5}>
              <Divider orientation="horizontal" />
            </Grid>

            <Grid item xs={12} sm={6} pt={4}>
              <Stack spacing={4}>
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.subject')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.subject}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.debtor')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.owedBy}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    ({transactionData.owedByFiscalCode})
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack pt={4}>
                <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                  {t('app.transactionDetail.creditorEntity')}
                </Typography>
                <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                  {transactionData.creditorEntity}
                </Typography>
                <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                  {transactionData.creditorFiscalCode}
                </Typography>
              </Stack>
              <Stack pt={2}>
                <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                  {t('app.transactionDetail.noticeCode')}
                </Typography>
                <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                  {transactionData.noticeCode}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={3}>
              <Divider orientation="horizontal" />
            </Grid>
            <Grid item xs={12}>
              <Stack pt={4} pb={4} alignItems={'end'} spacing={2}>
                <Stack alignItems={'end'}>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.partialAmount')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.partialAmount}
                  </Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {`${t('app.transactionDetail.commission')} (${t(
                      'app.transactionDetail.appliedBy'
                    )} ${transactionData.PSP})`}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} fontWeight={600}>
                    {transactionData.fee}
                  </Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography sx={{ wordBreak: 'break-word' }} color={theme.palette.text.secondary}>
                    {t('app.transactionDetail.total')}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }} variant="h6">
                    <b>{transactionData.total}</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Stack>
          <Typography sx={{ wordBreak: 'break-word' }} variant="body2" fontWeight={600}>
            {t('app.transactionDetail.somethingDoesntAddUp')}
          </Typography>
          <Typography
            sx={{ wordBreak: 'break-word' }}
            variant="body2"
            fontWeight={600}
            color="primary">
            <b>{t('app.transactionDetail.contactSupport')}</b>
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}
