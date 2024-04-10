import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export interface IStoricoItem {
  ente: string
  date: string
  status: string
  amount: string
  id: string
}

const StoricoItem = (props: IStoricoItem) => {
  const { ente, status, amount, id, date } = props;
  return (<TableRow>
    <TableCell>
      {ente}
    </TableCell>
    <TableCell>{date}</TableCell>
    <TableCell align="right">{status}</TableCell>
    <TableCell align="right">{amount}</TableCell>
    <TableCell align="right">{id}</TableCell>
  </TableRow>)
  }

export default StoricoItem
