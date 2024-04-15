import React from 'react';
import { transactionProps } from './Transaction';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import StoricoItem from './Transaction';

interface TransactionsProps {
  rows: transactionProps[];
}

const Transactions = (props: TransactionsProps) => (
  <TableContainer sx={{ bgcolor: 'background.paper' }}>
    <Table aria-label="Storico table">
      <TableBody>
        {props.rows.map((row) => (
          <StoricoItem {...row} key={row.id} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Transactions;
