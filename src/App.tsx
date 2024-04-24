import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Theme } from './utils/style';
import { Layout } from './components/Layout';
import { ArcRoutes } from './routes/routes';
import TransactionRoute from './routes/Transaction';
import DashboardRoute from './routes/Dashboard';
import Transactions from 'routes/Transactions';

export const App = () => (
  <Theme>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ArcRoutes.DASHBOARD} element={<DashboardRoute />} />
          <Route path={ArcRoutes.TRANSACTION} element={<TransactionRoute />} />
          <Route path={ArcRoutes.TRANSACTIONS} element={<Transactions />} />
          <Route path="*" element={<Navigate replace to={ArcRoutes.DASHBOARD} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Theme>
);
