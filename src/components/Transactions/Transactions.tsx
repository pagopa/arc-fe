import React from 'react';
import { TransactionProps } from './Transaction';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Transaction from './Transaction';
import { TableHead, TableRow, TableCell, useMediaQuery, Theme, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export interface TransactionsProps {
  rows?: TransactionProps[];
  dateOrdering?: 'ASC' | 'DESC';
  onDateOrderClick?: () => void;
  hideDateOrdering?: boolean;
}

const Transactions = (props: TransactionsProps) => {
  const { hideDateOrdering = false } = props;
  const { t } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <TableContainer sx={{ bgcolor: 'transparent', height: 'fit-content' }}>
      <Table aria-label="Storico table">
        <TableHead sx={{ display: mdUp ? 'table-head' : 'none' }}>
          <TableRow>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }} width="60%">
              {t('app.transactions.payee')}
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }} onClick={props.onDateOrderClick}>
              <Stack direction="row" sx={{ cursor: 'pointer' }}>
                <span>{t('app.transactions.date')}</span>
                {!hideDateOrdering ? (
                  props.dateOrdering === 'DESC' ? (
                    <ArrowDownwardIcon sx={{ width: '18px' }} />
                  ) : (
                    <ArrowUpwardIcon sx={{ width: '18px' }} />
                  )
                ) : null}
              </Stack>
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              {t('app.transactions.amount')}
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }} />
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: 'background.paper' }}>
          {props?.rows && props.rows.map((row) => <Transaction {...row} key={row.id} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Transactions;
