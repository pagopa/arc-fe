import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Chip, ChipOwnProps, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import style from 'utils/style';

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
  action: (id: string) => void;
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
      <img src={props.src} alt={props.alt} />
    ) : (
      <AccountBalanceIcon sx={{ color: style.theme.palette.grey[400] }} />
    )}
  </Box>
);

const Transaction = (props: transactionProps) => {
  const { payee, status, amount, id, date, action } = props;
  return (
    <TableRow>
      <StyledTableCell width={'60%'}>
        <Stack direction="row" spacing={2} alignItems="center">
          <PayeeIcon src={payee.srcImg} alt={payee.altImg} />
          <Typography variant="body2" fontWeight={600}>
            {payee.name}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="center" width={'12%'}>
        <Chip label={status.label} color={status.color} />
      </StyledTableCell>
      <StyledTableCell align="center" width={'12%'}>
        {date}
      </StyledTableCell>

      <StyledTableCell align="center" width={'12%'}>
        <Typography variant="body2" fontWeight={600}>
          {amount}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Button
          variant="naked"
          onClick={() => action(id)}
          endIcon={<ArrowForwardIosIcon color="primary" />}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default Transaction;
