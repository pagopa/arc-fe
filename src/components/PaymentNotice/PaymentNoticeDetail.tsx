import {
  AccountBalance,
  CalendarMonth,
  CalendarToday,
  DateRange,
  Euro,
  InfoOutlined,
  Receipt,
  ReceiptLong
} from '@mui/icons-material';
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

export default function PaymentNoticeDetail() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container>
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
                      <Grid item xs={1} ml={2}>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          800€
                        </Typography>
                        <Typography color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.field1')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <IconButton
                        data-testid="infoButton"
                        aria-label={t('app.info')}
                        onClick={() => {}}
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
                        <Typography color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.field2')}
                        </Typography>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          800€
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9} flexGrow={1} maxWidth={'100%'}>
                      <Grid item alignContent={'center'} xs={2}>
                        <ReceiptLong htmlColor={theme.palette.grey[700]} />
                      </Grid>
                      <Grid item xs={9} ml={2}>
                        <Typography color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.field3')}
                        </Typography>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          800€
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid container item xs={9}>
                      <Grid item alignContent={'center'}>
                        <DateRange htmlColor={theme.palette.grey[700]} />
                      </Grid>
                      <Divider />

                      <Grid item xs={10} ml={2}>
                        <Typography color={theme.palette.text.secondary}>
                          {t('app.paymentNoticeDetail.card1.field4')}
                        </Typography>
                        <Typography variant="body1" fontSize={'16px'} fontWeight={700}>
                          800€
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid item xs={10}>
                      <Typography
                        sx={{ wordBreak: 'break-word' }}
                        color={theme.palette.text.secondary}>
                        {t('app.paymentNoticeDetail.card1.field5')}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        color={theme.palette.primary.main}
                        sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                        {'transactionData.authCode'}
                      </Typography>
                    </Grid>
                    <Grid item paddingTop={1}>
                      <CopyToClipboardButton
                        value={'transactionData.authCode.toString()'}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container item columnGap={2} justifyContent={'space-between'}>
                    <Grid item xs={10}>
                      <Typography
                        sx={{ wordBreak: 'break-word' }}
                        color={theme.palette.text.secondary}>
                        {t('app.paymentNoticeDetail.card1.field6')}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        color={theme.palette.primary.main}
                        sx={{ textDecoration: 'underline', wordBreak: 'break-word' }}>
                        {'transactionData.authCode'}
                      </Typography>
                    </Grid>
                    <Grid item paddingTop={1}>
                      <CopyToClipboardButton
                        value={'transactionData.authCode.toString()'}
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
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="body1">
                      {t('app.paymentNoticeDetail.card2.field1')}
                    </Typography>
                    <Typography variant="body1" fontWeight={700}>
                      31/01/1999
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="body1">
                      {t('app.paymentNoticeDetail.card2.field2')}
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      900
                    </Typography>
                  </Stack>
                  <Button variant="contained">
                    <Typography
                      sx={{
                        fontWeight: 'fontWeightMedium',
                        textAlign: 'center',
                        color: theme.palette.primary.contrastText
                      }}>
                      {t('app.paymentNoticeDetail.card2.button1')}
                    </Typography>{' '}
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
