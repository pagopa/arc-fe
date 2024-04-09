import React from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { theme } from '@pagopa/mui-italia';
import { Layout } from './components/Layout';
import { useTranslation } from 'react-i18next';

import './translations/i18n';
import { ArcRoutes } from './routes/routes';
import Transactions from './routes/Transactions';

export const App = () => {
  const { t } = useTranslation();
  document.title = t('app.title');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={'/'} element={<>{t('app.title')}</>} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path={`/${ArcRoutes.TRANSACTION}/:ID`} element={<Transactions />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
