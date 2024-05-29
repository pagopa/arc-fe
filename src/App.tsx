import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { Theme } from './utils/style';
import { Layout } from './components/Layout';
import { ArcRoutes } from './routes/routes';
import TransactionRoute from './routes/Transaction';
import DashboardRoute from './routes/Dashboard';
import { theme } from '@pagopa/mui-italia';
import UserRoute from 'routes/User';
import { RouteHandleObject } from 'models/Breadcrumbs';
import TransactionsList from 'routes/TransactionsList';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ErrorFallback } from 'components/ErrorFallback';
import { HealthCheck } from 'components/HealthCheck';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate replace to={ArcRoutes.DASHBOARD} />,
    ErrorBoundary: () => {
      throw useRouteError();
    }
  },
  {
    path: '/',
    element: <Layout />,
    ErrorBoundary: () => {
      throw useRouteError();
    },
    children: [
      {
        path: ArcRoutes.USER,
        element: <UserRoute />,
        errorElement: <ErrorFallback />,
        handle: {
          backButton: true,
          sidebar: {
            visibile: false
          }
        } as RouteHandleObject
      },
      {
        path: ArcRoutes.DASHBOARD,
        element: <DashboardRoute />,
        // TEMPORARY ERROR ELEMENT
        errorElement: <ErrorFallback />
      },
      {
        path: ArcRoutes.TRANSACTION,
        element: <TransactionRoute />,
        loader: ({ params }) => Promise.resolve(params.id),
        // TEMPORARY ERROR ELEMENT
        errorElement: <ErrorFallback />,
        handle: {
          crumbs: {
            elements: [
              { name: 'transactions', fontWeight: 600, href: ArcRoutes.TRANSACTIONS },
              {
                name: 'transactionDetail',
                fontWeight: 400,
                color: theme.palette.grey[700]
              }
            ]
          }
        } as RouteHandleObject
      },
      {
        path: ArcRoutes.TRANSACTIONS,
        element: <TransactionsList />,
        // TEMPORARY ERROR ELEMENT
        errorElement: <ErrorFallback />
      }
    ]
  }
]);

export const App = () => (
  <ErrorBoundary fallback={<ErrorFallback onReset={() => window.location.replace('/')} />}>
    <HealthCheck />
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </ErrorBoundary>
);
