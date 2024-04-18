import { Download } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import MasterCard from '../assets/creditcard/mastercard.png';
import { TransactionDetail } from 'src/models/TransactionDetail';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TransactionDetail({
  transactionData
}: {
  transactionData: TransactionDetail;
}) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item>
        <Chip label={transactionData.status} color="success" />
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}>
        <Typography variant="h4">{transactionData.subject}</Typography>
        <Stack direction="row" spacing={0.6}>
          <Button endIcon={<Download />} size="large" variant="outlined">
            {t('app.transactionDetail.downloadQuiettance')}
          </Button>
          <Button endIcon={<Download />} size="large" variant="contained">
            {t('app.transactionDetail.downloadReceipt')}
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} mt={3} width={'100%'}>
        <Box>
          <Typography>
            {t('app.transactionDetail.createdOn') + ' ' + transactionData.dateTime.toDateString()}
          </Typography>
        </Box>
        <Box
          sx={{ bgcolor: theme.palette.background.paper }}
          borderRadius={1.5}
          pt={4}
          pl={3}
          pr={3}>
          <Grid container>
            <Grid item xs={6}>
              <Stack spacing={2} pt={1}>
                <Stack>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.paidBy')}
                  </Typography>
                  <Typography fontWeight={600}>{transactionData.paidBy}</Typography>
                </Stack>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography sx={{ color: theme.palette.text.secondary }}>
                      {t('app.transactionDetail.authCode')}
                    </Typography>
                    <Typography fontWeight={600} color={theme.palette.primary.main}>
                      <u>{transactionData.authCode}</u>
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
                      <Typography sx={{ color: theme.palette.text.secondary }}>
                        {t('app.transactionDetail.transactionId')}
                      </Typography>
                      <Typography fontWeight={600} color={theme.palette.primary.main}>
                        <u>{transactionData.transactionId.substring(0, 20)}...</u>
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
                      <Typography sx={{ color: theme.palette.text.secondary }}>PRN</Typography>
                      <Typography fontWeight={600} color={theme.palette.primary.main}>
                        <u>{transactionData.PRN}</u>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2} paddingTop={1}>
                    <CopyToClipboardButton value={transactionData.PRN.toString()} color="primary" />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2} pt={1}>
                <Stack>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.noticeOwner')}
                  </Typography>
                  <Typography fontWeight={600}>{transactionData.owedBy}</Typography>
                  <Typography fontWeight={600}>({transactionData.owedByFiscalCode})</Typography>
                </Stack>
                <Grid container pt={1}>
                  <Grid item xs={1} paddingTop={3.065} pr={2}>
                    <img src={MasterCard} />
                  </Grid>
                  <Grid item xs={10}>
                    <Stack pt={0.75} pb={0.75} pl={2}>
                      <Typography sx={{ color: theme.palette.text.secondary }}>
                        {t('app.transactionDetail.paymentMethod')}
                      </Typography>
                      <Typography fontWeight={600}>
                        {transactionData.paymentMethod + ' ' + transactionData.cardNumber}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Stack>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.PSP')}
                  </Typography>
                  <Typography fontWeight={600}>{transactionData.PSP}</Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.dateAndTime')}
                  </Typography>
                  <Typography fontWeight={600}>
                    {transactionData.dateTime.toDateString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={4.5}>
              <Divider orientation="horizontal" />
            </Grid>

            <Grid item xs={6} pt={4}>
              <Stack spacing={4}>
                <Stack>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.subject')}
                  </Typography>
                  <Typography fontWeight={600}>{transactionData.subject}</Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.debtor')}
                  </Typography>
                  <Typography fontWeight={600}>{transactionData.owedBy}</Typography>
                  <Typography fontWeight={600}>({transactionData.owedByFiscalCode})</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack pt={4}>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.creditorEntity')}
                </Typography>
                <Typography fontWeight={600}>{transactionData.creditorEntity}</Typography>
                <Typography fontWeight={600}>{transactionData.creditorFiscalCode}</Typography>
              </Stack>
              <Stack pt={2}>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.noticeCode')}
                </Typography>
                <Typography fontWeight={600}>{transactionData.noticeCode}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={3}>
              <Divider orientation="horizontal" />
            </Grid>
            <Grid item xs={12}>
              <Stack pt={4} pb={4} alignItems={'end'} spacing={2}>
                <Stack alignItems={'end'}>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.partialAmount')}
                  </Typography>
                  <Typography fontWeight={600}>
                    {transactionData.partialAmount.toFixed(2)} €
                  </Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.commission') +
                      ' (' +
                      t('app.transactionDetail.appliedBy') +
                      ' ' +
                      transactionData.PSP +
                      ')'}
                  </Typography>
                  <Typography fontWeight={600}>{transactionData.fee.toFixed(2)} €</Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.total')}
                  </Typography>
                  <Typography variant="h6">
                    <b>{transactionData.total.toFixed(2)} €</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Stack>
          <Typography fontSize={16} fontWeight={600}>
            {t('app.transactionDetail.somethingDoesntAddUp')}
          </Typography>
          <Typography fontSize={16} fontWeight={600} color="primary">
            <b>{t('app.transactionDetail.contactSupport')}</b>
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}
