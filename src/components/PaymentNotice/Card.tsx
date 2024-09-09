import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { PayeeIcon } from 'components/PayeeIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { IconButton, Paper } from '@mui/material';
import { ArcRoutes } from 'routes/routes';
import { useNavigate } from 'react-router-dom';
import { PaymentNoticeEnum, PaymentNoticeType } from 'models/PaymentNotice';
import { useStore } from 'store/GlobalStore';
import { STATE } from 'store/types';

type InfoProps = { label: string; data: string };

const Info = (props: InfoProps) => (
  <Stack>
    <Typography component="div" variant="body2">
      {props.label}
    </Typography>
    <Typography component="div" variant="subtitle1">
      {props.data}
    </Typography>
  </Stack>
);

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.Card` for rendering the payment notice card.
 *
 * @component
 * @private
 */
export const _Card = (notice: PaymentNoticeType) => {
  const { paymentOptions, paFullName, iupd, type } = notice;
  const { t } = useTranslation();
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const { setState } = useStore();

  function viewDetail() {
    setState(STATE.PAYMENT_NOTICE, notice);
    navigate(`${ArcRoutes.PAYMENT_NOTICES}${iupd}`);
  }

  return (
    <Paper elevation={16}>
      <Stack
        role="listitem"
        component="article"
        onClick={() => viewDetail()}
        borderRadius={1}
        padding={3}
        gap={3}
        direction="row"
        justifyContent="space-between"
        sx={{ cursor: 'pointer' }}>
        <Stack direction="row" alignItems="center" gap={2} component="header">
          <PayeeIcon src={notice.image.src} alt={paFullName} visible={smUp} />
          <Stack maxWidth={{ xs: 110, sm: 150, md: 480, lg: 460, xl: 600 }}>
            <Typography component="h1" variant="subtitle1" noWrap>
              {paFullName}
            </Typography>
            {type === PaymentNoticeEnum.SINGLE && (
              <Typography component="h2">{paymentOptions.description}</Typography>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" component="div">
          <Divider orientation="vertical" flexItem variant="fullWidth" />
          {type === PaymentNoticeEnum.SINGLE && (
            <Stack width="12rem" component="aside">
              <Info label={t('app.paymentNotice.card.amount')} data={paymentOptions.amount} />
              <Info
                label={t('app.paymentNotice.card.expiringDate')}
                data={paymentOptions.dueDate}
              />
            </Stack>
          )}
          <IconButton aria-label={t('app.paymentNotice.card.detail')} onClick={() => viewDetail()}>
            <ArrowForwardIosIcon color="primary" fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
