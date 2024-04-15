import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Theme } from './utils/style';
import { Layout } from './components/Layout';
import { useTranslation } from 'react-i18next';
import { ArcRoutes } from './routes/routes';
import Transaction from './routes/Transaction';
import './translations/i18n';

export const App = () => {
  const { t } = useTranslation();
  document.title = t('app.title');

  return (
    <Theme>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={'/'} element={<>{t('app.title')}</>} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path={`/${ArcRoutes.TRANSACTION}/:ID`} element={<Transaction />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Theme>
  );
};
