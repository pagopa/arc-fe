import React, { Fragment } from 'react';
import { Grid, Card, CardContent, Skeleton, Stack, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PaymentNoticeDetails = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        variant="h2"
        fontSize={{ xs: 28, md: 32 }}
        sx={{ wordBreak: 'break-word' }}
        mb={3}>
        {t('app.paymentNoticeDetail.title')}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ padding: 4 }}>
              <Skeleton variant="rounded" sx={{ marginBottom: 4 }} width={'50%'} height={30} />
              <Stack spacing={4} mb={4}>
                {Array.from({ length: 7 }, (_, i) => (
                  <Box key={i}>
                    <Skeleton
                      variant="rounded"
                      height={12}
                      width={'50%'}
                      sx={{ marginBottom: 2 }}
                    />
                    <Skeleton variant="rounded" height={21} width={'75%'} />
                  </Box>
                ))}
              </Stack>
              <Skeleton variant="rounded" width={'25%'} height={21} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ padding: 4 }}>
              <Skeleton variant="rounded" sx={{ marginBottom: 4 }} width={'50%'} height={30} />
              <Stack spacing={2} mb={4}>
                {Array.from({ length: 2 }, (_, i) => (
                  <Fragment key={i}>
                    <Skeleton variant="rounded" height={12} />
                    <Skeleton variant="rounded" height={12} />
                    <Skeleton variant="rounded" height={12} width={'75%'} />
                  </Fragment>
                ))}
              </Stack>
              <Skeleton variant="rounded" width={'25%'} height={21} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentNoticeDetails;
