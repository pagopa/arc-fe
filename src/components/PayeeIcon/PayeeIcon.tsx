import Box from '@mui/material/Box';
import React, { SyntheticEvent } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import style from 'utils/style';

export interface payeeIconProps {
  src?: string;
  alt?: string;
  visible?: boolean;
}

export const PayeeIcon = (props: payeeIconProps) => {
  function onErrorImage(e: SyntheticEvent) {
    (e.target as HTMLImageElement).src = '/images/fallback-ec.png';
    return;
  }

  return (
    <Box
      width={48}
      height={48}
      border={`solid 1px ${style.theme.palette.divider}`}
      borderRadius={6}
      alignItems="center"
      display={props.visible ? 'flex' : 'none'}
      justifyContent="center">
      {props.src ? (
        <img
          src={props.src}
          alt={props?.alt ? props.alt : 'Logo Ente'}
          aria-hidden="true"
          style={{ width: '55%' }}
          onError={(e) => {
            onErrorImage(e);
          }}
        />
      ) : (
        <AccountBalanceIcon sx={{ color: style.theme.palette.grey[400] }} />
      )}
    </Box>
  );
};
