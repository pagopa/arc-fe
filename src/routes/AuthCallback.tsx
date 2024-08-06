import React from 'react';
import { useLoaderData } from 'react-router-dom';
import utils from 'utils';
import { ArcRoutes } from './routes';
import { TokenResponse } from '../../generated/data-contracts';

export default function AuthCallback() {
  const result = useLoaderData();

  try {
    utils.zodSchema.tokenResponseSchema.parse(result);
    window.localStorage.setItem('accessToken', (result as TokenResponse).access_token);
    window.location.replace(ArcRoutes.DASHBOARD);
  } catch {
    window.location.replace(ArcRoutes.LOGIN);
  }

  return <></>;
}
