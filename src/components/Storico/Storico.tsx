import React from 'react';
import { IStoricoItem } from './StoricoItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import StoricoItem from './StoricoItem';

interface IStorico {
  rows: IStoricoItem[];
}

const Storico = (props: IStorico) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableBody>
        {props.rows.map((row) => (
          <StoricoItem {...row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Storico;
