import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ArcRoutes } from '../routes';
import { TokenResponse } from '../../../generated/data-contracts';
import { Box, CircularProgress } from '@mui/material';

export default function AuthCallback() {
  const result = useLoaderData() as TokenResponse | null;
  if (result) {
    window.localStorage.setItem('accessToken', (result as TokenResponse).accessToken);
    window.location.replace(ArcRoutes.DASHBOARD);
  } else {
    window.location.replace(ArcRoutes.LOGIN);
  }

  return (
    <Box width={'100vw'} height={'100vh'} alignContent={'center'} textAlign={'center'}>
      <CircularProgress />
    </Box>
  );
}
