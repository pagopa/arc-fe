import React from 'react';
import { Navigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

export type RouteGuardProps = {
  redirectTo?: string;
  itemKeys: string[];
  storage?: Storage;
  children: React.ReactNode;
};

export const RouteGuard = ({
  redirectTo = ArcRoutes.COURTESY_PAGE,
  storage = sessionStorage,
  itemKeys,
  children
}: RouteGuardProps) => {
  const isAuthorized = itemKeys.every((key) => storage.getItem(key));

  return isAuthorized ? children : <Navigate to={redirectTo} />;
};
