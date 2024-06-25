import { ErrorOutline } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ButtonNaked } from '@pagopa/mui-italia';
import { PaymentNotice } from 'components/PaymentNotice';
import QueryLoader from 'components/QueryLoader';
import React from 'react';
import { useTranslation } from 'react-i18next';
import utils from 'utils';

const updatedDate = new Date();

export const PaymentNotices = () => {
  const { t } = useTranslation();
  const { data, isError } = utils.loaders.getPaymentNotices();

  return (
    <Stack height="100%" justifyContent={{ lg: 'space-between' }} component="main">
      <QueryLoader
        // TODO: fallback component of behavior be defined
        fallback={isError && <PaymentNotice.Error />}
        queryKey="paymentNotices">
        <Stack gap={5} component="section">
          <Typography paddingTop={3} variant="h4" component="h1">
            {t('app.paymentNotices.title')}
          </Typography>
          {data.length > 0 ? (
            <Stack gap={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                component="header">
                <Typography variant="h6" component="h2">
                  {`${t('app.paymentNotices.found')} ${data.length} ${t('app.paymentNotices.notice')}`}
                </Typography>
                <Typography
                  display="flex"
                  variant="body1"
                  component="div"
                  flexDirection="row"
                  gap="5px">
                  <Typography color="text.secondary" component="span">
                    {t('app.paymentNotices.updated')}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 600 }}
                    component="time"
                    dateTime={updatedDate.toISOString()}>
                    {updatedDate.toLocaleString(navigator.language, {
                      timeStyle: 'short',
                      dateStyle: 'medium'
                    })}
                  </Typography>
                </Typography>
              </Stack>
              <Stack gap={3} component="section">
                {data.map((paymentNotice) => (
                  <PaymentNotice.Card key={paymentNotice.id} {...paymentNotice} />
                ))}
              </Stack>
            </Stack>
          ) : (
            <PaymentNotice.Empty />
          )}
        </Stack>
        {data?.length && data?.length > 0 && (
          <Stack
            padding={1.3}
            gap={1}
            justifyContent="flex-start"
            marginTop={{ xs: 10, lg: 0 }}
            component="aside">
            <Typography variant="body1" component="p">
              {t('app.paymentNotices.alert.info')}
            </Typography>
            <Typography color="error" component="div">
              <ButtonNaked
                variant="text"
                size="medium"
                color="inherit"
                startIcon={<ErrorOutline />}
                aria-label={t('app.paymentNotices.alert.action')}>
                {t('app.paymentNotices.alert.action')}
              </ButtonNaked>
            </Typography>
          </Stack>
        )}
      </QueryLoader>
    </Stack>
  );
};
