import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Theme } from './utils/style';
import { Layout } from './components/Layout';
import { ArcRoutes } from './routes/routes';
import TransactionRoute from './routes/Transaction';
import DashboardRoute from './routes/Dashboard';
import { theme } from '@pagopa/mui-italia';
import UserRoute from 'routes/User';
import { RouteHandleObject } from 'models/Breadcrumbs';
import TransactionsList from 'routes/TransactionsList';
import utils from 'utils';

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
        path: ArcRoutes.USER,
        element: <UserRoute />,
        handle: {
          sidebar: {
            visibile: false
          },
          crumbs: {
            backButton: true,
            elements: [
              { name: 'home', fontWeight: 600, href: ArcRoutes.DASHBOARD },
              {
                name: 'user',
                fontWeight: 400,
                color: theme.palette.text.disabled
              }
            ]
          }
        } as RouteHandleObject
      },
      {
        path: ArcRoutes.DASHBOARD,
        element: <DashboardRoute />,
        loader: () => {
          try {
            return utils.apiClient.transactions.getTransactionList({ size: 10 });
          } catch (e) {
            console.error(e);
            return [];
          }
        },
        // TEMPORARY ERRORELEMENT
        errorElement: <p>Ops!... somethig went wrong</p>
      },
      {
        path: ArcRoutes.TRANSACTION,
        element: <TransactionRoute />,
        handle: {
          crumbs: {
            backButton: false,
            elements: [
              { name: 'transactions', fontWeight: 600, href: ArcRoutes.TRANSACTIONS },
              {
                name: 'transactionDetail',
                fontWeight: 400,
                color: theme.palette.text.disabled
              }
            ]
          }
        } as RouteHandleObject
      },
      {
        path: ArcRoutes.TRANSACTIONS,
        element: <TransactionsList />
      }
    ]
  }
]);

// INSTANT FEEDBACK WHEN DEVELOPING LOCALLY
utils.config.env === 'LOCAL' &&
  (async () => {
    try {
      await utils.apiClient.info.healthCheck();
    } catch (e) {
      console.error(e, 'Mock not avaible or /info not reachable');
    }
  })();

export const App = () => (
  <Theme>
    <RouterProvider router={router} />
  </Theme>
);
