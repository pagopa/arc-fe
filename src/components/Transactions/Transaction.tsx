import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import style from 'utils/style';
import { Box, Chip, ChipOwnProps, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { theme } from '@pagopa/mui-italia';
import { ArcRoutes } from 'routes/routes';

export interface TransactionProps {
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
  visible?: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.divider,
  cursor: 'pointer'
}));

const PayeeIcon = (props: payeeIconProps) => (
  <Box
    width={48}
    height={48}
    border={`solid 1px ${style.theme.palette.divider}`}
    borderRadius={6}
    alignItems="center"
    display={props.visible ? 'flex' : 'none'}
    justifyContent="center">
    {props.src ? (
      <img
        src={props.src}
        alt={props?.alt ? props.alt : 'Logo Ente'}
        aria-hidden="true"
        style={{ width: '55%' }}
      />
    ) : (
      <AccountBalanceIcon sx={{ color: style.theme.palette.grey[400] }} />
    )}
  </Box>
);

const Transaction = (props: TransactionProps) => {
  const navigate = useNavigate();
  const { payee, status, amount, id, date } = props;
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const tableCellCssDisplayProperty = mdUp ? 'table-cell' : 'none';

  return (
    <TableRow
      role="button"
      data-testid="transaction-details-button"
      onClick={() => navigate(`${ArcRoutes.TRANSACTIONS}${id}`)}>
      <StyledTableCell>
        <Stack direction="row" spacing={{ xs: 0, sm: 2 }} alignItems="center">
          <PayeeIcon src={payee.srcImg} alt={payee.altImg} visible={smUp} />
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {payee.name}
            </Typography>
            {!mdUp && (
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
            )}
          </Box>
        </Stack>
      </StyledTableCell>

      <StyledTableCell sx={{ display: tableCellCssDisplayProperty }}>
        <Typography variant="body2">{date}</Typography>
      </StyledTableCell>

      <StyledTableCell align={!mdUp ? 'right' : 'left'}>
        <Typography variant="body2" fontWeight={600} whiteSpace="nowrap">
          {amount}
        </Typography>
      </StyledTableCell>

      <StyledTableCell sx={{ display: tableCellCssDisplayProperty }}>
        <Chip label={status.label} color={status.color} />
      </StyledTableCell>

      <StyledTableCell width="30px">
        <ArrowForwardIosIcon color="primary" fontSize="small" />
      </StyledTableCell>
    </TableRow>
  );
};

export default Transaction;
