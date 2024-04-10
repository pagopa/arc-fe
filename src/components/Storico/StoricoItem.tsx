import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, ChipOwnProps } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface IStoricoItem {
  ente: string
  date: string
  status: {
    label: ChipOwnProps["label"]
    color: ChipOwnProps["color"]
  }
  amount: string
  id: string
  detailsButton: {
    text: string
    action: (id: string) => void
  }
}

const StoricoItem = (props: IStoricoItem) => {
  const { ente, status, amount, id, date, detailsButton } = props;
  return (<TableRow>
    <TableCell>
      {ente}
    </TableCell>
    <TableCell>{date}</TableCell>
    <TableCell align="right"><Chip label={status.label} color={status.color} /></TableCell>
    <TableCell align="right">{amount}</TableCell>
    <TableCell align="right">
      <Button
        variant="text"
        onClick={ () => detailsButton.action(id)}
        endIcon={<ArrowForwardIosIcon />}  >
         { detailsButton.text }
      </Button>
    </TableCell>
  </TableRow>)
  }

export default StoricoItem
