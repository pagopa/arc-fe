import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, ChipOwnProps, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { theme } from '@pagopa/mui-italia';
import { ArcRoutes } from 'routes/routes';
import { PayeeIcon } from 'components/PayeeIcon';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.divider,
  cursor: 'pointer'
}));

const Transaction = (props: TransactionProps) => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const { payee, amount, id, date } = props;
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const tableCellCssDisplayProperty = mdUp ? 'table-cell' : 'none';

  return (
    <TableRow
      hover
      role="button"
      data-testid="transaction-details-button"
      onClick={() => navigate(`${ArcRoutes.TRANSACTIONS}${id}`)}>
      <StyledTableCell>
        <Stack direction="row" spacing={{ xs: 0, sm: 2 }} alignItems="center">
          <PayeeIcon src={payee.srcImg} alt={payee.altImg} visible={smUp} />
          <Box sx={{ maxWidth: '30vw' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}>
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

      {sm && (
        <StyledTableCell width="56px">
          <ArrowForwardIosIcon color="primary" fontSize="small" />
        </StyledTableCell>
      )}
    </TableRow>
  );
};

export default Transaction;
