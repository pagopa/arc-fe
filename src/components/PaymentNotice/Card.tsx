import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { PayeeIcon } from 'components/PayeeIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

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

type CardPropsOption = { expiringDate: string } | { multiPayment: boolean };
export type CardProps = {
  payee: {
    name: string;
    srcImg?: string;
    altImg?: string;
  };
  paymentInfo: string;
  amount: string;
} & CardPropsOption;

const isMultiPayment = (option: CardPropsOption): option is { multiPayment: boolean } =>
  'multiPayment' in option && option.multiPayment === true;

const hasDate = (option: CardPropsOption): option is { expiringDate: string } =>
  'expiringDate' in option && !!option.expiringDate;

export const _Card = ({ payee, amount, paymentInfo, ...rest }: CardProps) => {
  const { t } = useTranslation();
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  return (
    <Stack
      borderRadius={1}
      padding={3}
      gap={3}
      direction="row"
      justifyContent="space-between"
      sx={{
        backgroundColor: 'background.paper',
        boxShadow:
          '0px 6px 30px 5px #002B551A, 0px 16px 24px 2px #002B550D, 0px 8px 10px -5px #002B551A'
      }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <PayeeIcon src={payee.srcImg} alt={payee.altImg} visible={smUp} />
        <Stack maxWidth={{ xs: 100, sm: 150, md: 480, lg: 900 }}>
          <Typography component="div" variant="subtitle1" noWrap>
            {payee.name}
          </Typography>
          <Typography>{paymentInfo}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <Divider orientation="vertical" flexItem variant="fullWidth" />
        <Stack width="12rem">
          <Info label={t('app.paymentNotice.card.amount')} data={amount} />
          {isMultiPayment(rest) && (
            <Stack borderRadius="4px" alignItems="center" sx={{ backgroundColor: '#E1F5FE' }}>
              <Typography padding="3px" variant="subtitle2" lineHeight="18px">
                {t('app.paymentNotice.card.multiPayment')}
              </Typography>
            </Stack>
          )}
          {hasDate(rest) && (
            <Info label={t('app.paymentNotice.card.expiring')} data={rest.expiringDate} />
          )}
        </Stack>
        <ArrowForwardIosIcon color="primary" fontSize="small" />
      </Stack>
    </Stack>
  );
};
