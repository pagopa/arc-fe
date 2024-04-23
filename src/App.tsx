import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Theme } from './utils/style';
import { Layout } from './components/Layout';
import { ArcRoutes } from './routes/routes';
import TransactionRoute from './routes/Transaction';
import DashboardRoute from './routes/Dashboard';
import { theme } from '@pagopa/mui-italia';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate replace to={ArcRoutes.DASHBOARD} />
  },

  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ArcRoutes.DASHBOARD,
        element: <DashboardRoute />
      },
      {
        path: ArcRoutes.TRANSACTION,

        element: <TransactionRoute />,
        handle: {
          crumb: {
            backButton: false,
            elements: [
              { name: 'transactions', fontWeight: 600, href: '/transactions' },
              {
                name: 'transactionDetail',
                fontWeight: 400,
                color: theme.palette.text.disabled,
              }
            ]
          }
        }
      }
    ]
  }
]);

export const App = () => (
  <Theme>
    <RouterProvider router={router} />
  </Theme>
);
