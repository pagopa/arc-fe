import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Chip, ChipOwnProps, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import style from 'utils/style';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface transactionProps {
  payee: {
    name: string;
    srcImg?: string;
    altImg?: string;
  };
  date: string;
  status: {
    label: ChipOwnProps['label'];
    color: ChipOwnProps['color'];
  };
  amount: string;
  id: string;
}

interface payeeIconProps {
  src?: string;
  alt?: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.divider
}));

const PayeeIcon = (props: payeeIconProps) => (
  <Box
    width={48}
    height={48}
    border={`solid 1px ${style.theme.palette.divider}`}
    borderRadius={6}
    alignItems="center"
    display="flex"
    justifyContent="center">
    {props.src ? (
      <img src={props.src} alt={props.alt} style={{ width: 'inherit' }} />
    ) : (
      <AccountBalanceIcon sx={{ color: style.theme.palette.grey[400] }} />
    )}
  </Box>
);

const Transaction = (props: transactionProps) => {
  const { t } = useTranslation();

  const { payee, status, amount, id, date } = props;
  return (
    <TableRow>
      <StyledTableCell width={'60%'}>
        <Link
          aria-label={t('app.routes.transactionDetail')}
          role="link"
          style={{ textDecoration: 'none' }}
          to={`/transaction/${id}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <PayeeIcon src={payee.srcImg} alt={payee.altImg} />
            <Typography variant="body2" fontWeight={600}>
              {payee.name}
            </Typography>
          </Stack>
        </Link>
      </StyledTableCell>

      <StyledTableCell align="center" width={'12%'}>
        <Link
          aria-label={t('app.routes.transactionDetail')}
          role="link"
          style={{ textDecoration: 'none' }}
          to={`/transaction/${id}`}>
          <Chip label={status.label} color={status.color} />
        </Link>
      </StyledTableCell>
      <StyledTableCell align="center" width={'12%'}>
        <Link
          aria-label={t('app.routes.transactionDetail')}
          role="link"
          style={{ textDecoration: 'none' }}
          to={`/transaction/${id}`}>
          <Typography variant="body2">{date}</Typography>
        </Link>
      </StyledTableCell>

      <StyledTableCell align="center" width={'12%'}>
        <Link
          aria-label={t('app.routes.transactionDetail')}
          role="link"
          style={{ textDecoration: 'none' }}
          to={`/transaction/${id}`}>
          <Typography variant="body2" fontWeight={600}>
            {amount}
          </Typography>
        </Link>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Link
          aria-label={t('app.routes.transactionDetail')}
          role="link"
          style={{ textDecoration: 'none' }}
          to={`/transaction/${id}`}>
          <Button variant="naked" endIcon={<ArrowForwardIosIcon color="primary" />} />
        </Link>
      </StyledTableCell>
    </TableRow>
  );
};

export default Transaction;
