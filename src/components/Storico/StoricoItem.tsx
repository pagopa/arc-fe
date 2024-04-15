import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Chip, ChipOwnProps, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import style from '../../utils/style';

export interface storicoItemProps {
  payee: {
    name: string;
    srcImg?: string;
    altImg?: string;
  };
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

interface enteIconProps {
  src?: string;
  alt?: string;
}

const EnteIcon = (props: enteIconProps) => (
  <Box
    width={48}
    height={48}
    border={`solid 1px ${style.theme.palette.divider}`}
    borderRadius={6}
    alignItems="center"
    display="flex"
    justifyContent="center">
    {props.src ? (
      <img src={props.src} alt={props.alt} />
    ) : (
      <AccountBalanceIcon sx={{ color: style.theme.palette.grey[400] }} />
    )}
  </Box>
);

const StoricoItem = (props: storicoItemProps) => {
  const { payee, status, amount, id, date, detailsButton } = props;
  return (
    <TableRow>
      <StyledTableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <EnteIcon src={payee.srcImg} alt={payee.altImg} />
          <Typography variant="body2">{payee.name}</Typography>
        </Stack>
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
