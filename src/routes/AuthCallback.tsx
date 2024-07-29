import useQueryParams from 'hooks/useQueryParams';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from './routes';
import React from 'react';

export default function AuthCallback() {
  const { code, state } = useQueryParams();
  const navigate = useNavigate();

  if (!code || !state) {
    navigate(ArcRoutes.LOGIN);
  }

  return (
    <>
      <p>{`${code} | ${state}`}</p>
    </>
  );
}
