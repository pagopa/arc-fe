import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, ChipOwnProps, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';

export interface IStoricoItem {
  ente: string;
  date: string;
  status: {
    label: ChipOwnProps['label'];
    color: ChipOwnProps['color'];
  };
  amount: string;
  id: string;
  detailsButton: {
    text: string;
    action: (id: string) => void;
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.divider
}));

const StoricoItem = (props: IStoricoItem) => {
  const { ente, status, amount, id, date, detailsButton } = props;
  return (
    <TableRow>
      <StyledTableCell>
        <Typography variant="body2">{ente}</Typography>
      </StyledTableCell>
      <StyledTableCell>{date}</StyledTableCell>
      <StyledTableCell align="center">
        <Chip label={status.label} color={status.color} />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{amount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Button
          variant="text"
          onClick={() => detailsButton.action(id)}
          endIcon={<ArrowForwardIosIcon />}>
          {detailsButton.text}
        </Button>
      </StyledTableCell>
    </TableRow>
  );
};

export default StoricoItem;
