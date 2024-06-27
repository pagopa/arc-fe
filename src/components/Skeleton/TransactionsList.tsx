import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  useMediaQuery,
  Theme,
  Skeleton,
  styled,
  Stack,
  Box
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import utils from 'utils';
import { theme } from '@pagopa/mui-italia';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.divider
}));

const TransactionRow = () => {
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const tableCellCssDisplayProperty = mdUp ? 'table-cell' : 'none';

  return (
    <TableRow>
      <StyledTableCell>
        <Stack direction="row" spacing={{ xs: 0, sm: 2 }} alignItems="center">
          {smUp && <Skeleton variant="circular" width={55} height={48} />}
          <Box width="100%">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            {!mdUp && <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />}
          </Box>
        </Stack>
      </StyledTableCell>

      <StyledTableCell sx={{ display: tableCellCssDisplayProperty }}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </StyledTableCell>

      <StyledTableCell align={!mdUp ? 'right' : 'left'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </StyledTableCell>

      {utils.config.showStatusInfo && (
        <StyledTableCell sx={{ display: tableCellCssDisplayProperty }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </StyledTableCell>
      )}

      <StyledTableCell width="56px">
        <Skeleton variant="text" sx={{ fontSize: 'small' }} />
      </StyledTableCell>
    </TableRow>
  );
};

const TransactionsList = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <TableContainer sx={{ bgcolor: 'transparent' }}>
      <Table>
        <TableHead sx={{ display: mdUp ? 'table-head' : 'none' }}>
          <TableRow>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }} width="60%">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
              <Skeleton variant="text" />
            </TableCell>
            {utils.config.showStatusInfo && (
              <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }}>
                <Skeleton variant="text" />
              </TableCell>
            )}
            <TableCell sx={{ paddingTop: 0.75, paddingBottom: 1 }} />
          </TableRow>
        </TableHead>

        <TableBody sx={{ bgcolor: 'background.paper' }}>
          {Array.from({ length: 4 }, (_, i) => (
            <TransactionRow key={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsList;
