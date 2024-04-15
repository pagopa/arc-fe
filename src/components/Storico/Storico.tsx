import React from 'react';
import { IStoricoItem } from './StoricoItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import StoricoItem from './StoricoItem';

interface IStorico {
  rows: IStoricoItem[];
}

const Storico = (props: IStorico) => (
  <TableContainer sx={{ bgcolor: 'background.paper' }}>
    <Table aria-label="Storico table">
      <TableBody>
        {props.rows.map((row) => (
          <StoricoItem {...row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Storico;
