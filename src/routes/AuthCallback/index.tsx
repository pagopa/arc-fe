import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ArcErrors, ArcRoutes } from '../routes';
import { Box, CircularProgress } from '@mui/material';
import { getTokenOneidentity } from 'utils/loaders';
import utils from 'utils';

export default function AuthCallback() {
  const result = useLoaderData() as Awaited<ReturnType<typeof getTokenOneidentity>>;

  if (result) {
    utils.storage.user.setToken(result.accessToken);
    window.location.replace(ArcRoutes.DASHBOARD);
  } else {
    window.location.replace(ArcRoutes.COURTESY_PAGE.replace(':error', ArcErrors['408']));
  }

  return (
    <Box width={'100vw'} height={'100vh'} alignContent={'center'} textAlign={'center'}>
      <CircularProgress />
    </Box>
  );
}
