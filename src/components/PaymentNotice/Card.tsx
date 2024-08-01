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

export type CardProps = {
  payee: {
    name: string;
    srcImg?: string;
    altImg?: string;
  };
  paymentInfo: string;
  expiringDate: string;
  amount: string;
  id: string;
};

/**
 * This component is considered private and should not be used directly.
 * Instead, use `PaymentNotice.Card` for rendering the payment notice card.
 *
 * @component
 * @private
 */
export const _Card = ({ payee, amount, paymentInfo, expiringDate, id }: CardProps) => {
  const { t } = useTranslation();
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  console.log(payee.srcImage);
  return (
    <Paper elevation={16}>
      <Stack
        component="article"
        borderRadius={1}
        padding={3}
        gap={3}
        direction="row"
        height="152px"
        justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={2} component="header">
          <PayeeIcon src={payee.srcImg} alt={payee.altImg} visible={smUp} />
          <Stack maxWidth={{ xs: 110, sm: 150, md: 480, lg: 460, xl: 600 }}>
            <Typography component="h1" variant="subtitle1" noWrap>
              {payee.name}
            </Typography>
            <Typography component="h2">{paymentInfo}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" component="div">
          <Divider orientation="vertical" flexItem variant="fullWidth" />
          <Stack width="12rem" component="aside">
            <Info label={t('app.paymentNotice.card.amount')} data={amount} />
            <Info label={t('app.paymentNotice.card.expiringDate')} data={expiringDate} />
          </Stack>
          <IconButton onClick={() => navigate(`${ArcRoutes.PAYMENT_NOTICES}${id}`)}>
            <ArrowForwardIosIcon color="primary" fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
