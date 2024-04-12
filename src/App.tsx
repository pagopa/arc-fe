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

const customTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    background: {
   /*   paper: '#F5F5F5', // mui-italia paper is defined as #FFFFFF
   Commented this line because while this is true, the footer uses this color, but the footer should be white. Shouldn't we take it to MUI Italia's owner?
   */  
   default: '#FFFFFF' // mui-italia default is defined as '#F2F2F2'
    }
  }
});

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
