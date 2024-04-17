import { Download } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import MasterCard from '../assets/creditcard/mastercard.png';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface TransactionDetail {
  paidBy: string;
  authCode: number;
  transactionId: number;
  PRN: number;
  owedBy: string;
  owedByFiscalCode: string;
  paymentMethod: string;
  cardNumber: string;
  PSP: string;
  dateTime: Date;
  subject: string;
  debtor: string;
  debtorFiscalCode: string;
  creditorEntity: string;
  creditorFiscalCode: string;
  noticeCode: string;
  partialAmount: number;
  commission: number;
  total: number;
  status: string;
}
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
          <Button endIcon={<Download />} size="medium" variant="outlined">
            {t('app.transactionDetail.downloadQuiettance')}
          </Button>
          <Button endIcon={<Download />} size="medium" variant="contained">
            {t('app.transactionDetail.downloadReceipt')}
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={1.41} mt={1} width={'100%'}>
        <Box>
          <Typography variant="caption">
            {t('app.transactionDetail.createdOn')}
            {transactionData.dateTime.toISOString()}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: theme.palette.background.paper }} borderRadius={1.5} padding={2}>
          <Grid container>
            <Grid item xs={6}>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.paidBy')}
                </Typography>
                <Typography variant="caption-semibold">Matteo Rossi</Typography>
              </Stack>
              <Grid container>
                <Grid item xs={5}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      {t('app.transactionDetail.authCode')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      <b>
                        <u>0000000000</u>
                      </b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      {t('app.transactionDetail.transactionId')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      <b>
                        <u>0000000000</u>
                      </b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      PRN{' '}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      <b>
                        <u>0000000000</u>
                      </b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.noticeOwner')}
                </Typography>
                <Typography variant="caption-semibold">Matteo Rossi</Typography>
                <Typography variant="caption-semibold">(MTTRSS74B23F205K)</Typography>
              </Stack>
              <Grid container mt={1.13}>
                <Grid item xs={1} paddingTop={1.54} pl={0.66}>
                  <img src={MasterCard} />
                </Grid>
                <Grid item xs={10}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      {t('app.transactionDetail.paymentMethod')}
                    </Typography>
                    <Typography variant="caption-semibold">Master card ****1234</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.PSP')}
                </Typography>
                <Typography variant="caption-semibold">Nexi</Typography>
              </Stack>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.dateAndTime')}
                </Typography>
                <Typography variant="caption-semibold">
                  {transactionData.dateTime.toString()}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={4}>
              <Divider orientation="horizontal" />
            </Grid>

            <Grid item xs={6}>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.subject')}
                </Typography>
                <Typography variant="caption-semibold">Bollo auto</Typography>
              </Stack>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.debtor')}
                </Typography>
                <Typography variant="caption-semibold">Matteo Rossi</Typography>
                <Typography variant="caption-semibold">CF</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.creditorEntity')}
                </Typography>
                <Typography variant="caption-semibold">ACI</Typography>
                <Typography variant="caption-semibold">0000</Typography>
              </Stack>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {t('app.transactionDetail.noticeCode')}
                </Typography>
                <Typography variant="caption-semibold">00000</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={4}>
              <Divider orientation="horizontal" />
            </Grid>
            <Grid item xs={12}>
              <Stack pl={0.66} pt={2.66} alignItems={'end'} spacing={1.333}>
                <Stack alignItems={'end'}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.partialAmount')}
                  </Typography>
                  <Typography variant="caption-semibold">250.00 €</Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.commission') +
                      ' ' +
                      t('app.transactionDetail.appliedBy') +
                      ' Nexi'}
                  </Typography>
                  <Typography variant="caption-semibold">1.00 €</Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {t('app.transactionDetail.total')}
                  </Typography>
                  <Typography variant="h6">
                    <b>251.00 €</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Grid>
  );
}
