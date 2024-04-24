import React from 'react';
import { transactionProps } from './Transaction';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Transaction from './Transaction';

interface TransactionsProps {
  rows: transactionProps[];
  extendedButton?: boolean;
}

const Transactions = (props: TransactionsProps) => (
  <TableContainer sx={{ bgcolor: 'background.paper' }}>
    <Table aria-label="Storico table">
      <TableBody>
        {props.rows.map((row) => (
          <Transaction {...row} key={row.id} extendedButton={props.extendedButton} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Transactions;
