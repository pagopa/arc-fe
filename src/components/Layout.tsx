import { Container, Grid, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import style from 'src/utils/style';
import { Footer, LangCode } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import lang from '../translations/lang';

interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
  currentLanguage: LangCode;
  changeLanguage(langCode: LangCode): void;
}

export function Layout({ children, currentLanguage, changeLanguage }: LayoutProps) {
  const { t } = useTranslation();

  

  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: theme.palette.background.default
      }}>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={3} height={`calc(100vh - (${style.header.height + style.footer.height}px))`}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer
            loggedUser
            companyLink={{ ariaLabel: 'PagoPA SPA' }}
            legalInfo={
              <>
                <b>{t('general.PagoPA')}</b> - {t('ui.footer.legalInfo')}
              </>
            }
            postLoginLinks={[
              {
                label: t('ui.footer.privacy'),
                ariaLabel: t('ui.footer.privacy'),
                linkType: 'internal'
              },
              {
                label: t('ui.footer.personalData'),
                ariaLabel: t('ui.footer.personalData'),
                linkType: 'internal'
              },
              {
                label: t('ui.footer.termsAndConditions'),
                ariaLabel: t('ui.footer.termsAndConditions'),
                linkType: 'internal'
              },
              { label: t('aria.a11y'), ariaLabel: t('aria.a11y'), linkType: 'internal' }
            ]}
            preLoginLinks={{
              aboutUs: {
                links: [
                  {
                    label: 'string',
                    /** the url to witch the user will be redirect */
                    ariaLabel: 'string',
                    linkType: 'internal'
                  }
                ]
              },
              resources: {
                links: [
                  {
                    label: 'string',
                    /** the url to witch the user will be redirect */
                    ariaLabel: 'string',
                    linkType: 'internal'
                  }
                ]
              },
              followUs: {
                title: 'string',
                socialLinks: [
                  {
                    icon: 'string',
                    /** the url to witch the user will be redirect */
                    title: 'string',
                    ariaLabel: 'string'
                  }
                ],
                links: [{ label: 'string', ariaLabel: 'string', linkType: 'internal' }]
              }
            }}
            currentLangCode={currentLanguage}
            languages={lang}
            onExit={() => {}}
            productsJsonUrl="https://dev.selfcare.pagopa.it/assets/products.json"
            hideProductsColumn={false}
            onLanguageChanged={changeLanguage}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
