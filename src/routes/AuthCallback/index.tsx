import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ArcRoutes } from '../routes';
import { TokenResponse } from '../../../generated/data-contracts';
import { Box, CircularProgress } from '@mui/material';
import { tokenResponseSchema } from '../../../generated/zod-schema';

export default function AuthCallback() {
  const result = useLoaderData() as TokenResponse | number;
  const checkToken = tokenResponseSchema.safeParse(result);

  if (checkToken.success) {
    // if we have a formal token
    window.localStorage.setItem('accessToken', (result as TokenResponse).accessToken);
    window.location.replace(ArcRoutes.DASHBOARD);
  } else if (typeof result === 'number') {
    // if we have an error code
    window.location.replace(`${ArcRoutes.COURTESY_PAGE}?errorcode=${result}`);
  } else {
    // otherwhise
    window.location.replace(ArcRoutes.LOGIN);
  }

  return (
    <Box width={'100vw'} height={'100vh'} alignContent={'center'} textAlign={'center'}>
      <CircularProgress />
    </Box>
  );
}
