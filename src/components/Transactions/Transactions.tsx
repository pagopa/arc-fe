import React from 'react';
import { TransactionProps } from './Transaction';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Transaction from './Transaction';
import { TableHead, TableRow, TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface TransactionsProps {
  rows: TransactionProps[];
}

const Transactions = (props: TransactionsProps) => {
  const { t } = useTranslation();

  return (
    <TableContainer sx={{ bgcolor: 'transparent' }}>
      <Table aria-label="Storico table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              {t('app.transactions.entityName')}
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              {t('app.transactions.status')}
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              {t('app.transactions.date')}
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              {t('app.transactions.amount')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: 'background.paper' }}>
          {props.rows.map((row) => (
            <Transaction {...row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Transactions;
