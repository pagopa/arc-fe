import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LangCode, theme } from '@pagopa/mui-italia';
import { Layout } from './components/Layout';
import { useTranslation } from 'react-i18next';

import './translations/i18n';
import { ArcRoutes } from './routes/routes';
import Transaction from './routes/Transaction';
import i18n from './translations/i18n';

const customTheme = createTheme(theme);

export const App = () => {
  const { t } = useTranslation();
  document.title = t('app.title');
  const [currentLanguage, setCurrentLanguage] = useState<LangCode>('it');

  const changeLanguage = (langCode: LangCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout currentLanguage={currentLanguage} changeLanguage={changeLanguage}>
          <Routes>
            <Route path={'/'} element={<>{t('app.title')}</>} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path={`/${ArcRoutes.TRANSACTION}/:ID`} element={<Transaction />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
