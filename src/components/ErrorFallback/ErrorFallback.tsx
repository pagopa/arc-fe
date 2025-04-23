import React from 'react';
import { Navigate } from 'react-router-dom';
import { ArcErrors, ArcRoutes } from 'routes/routes';

export const ErrorFallback = () => (
  <Navigate to={ArcRoutes.COURTESY_PAGE.replace(':error', ArcErrors['400'])} />
);
