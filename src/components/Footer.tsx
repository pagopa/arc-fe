import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import lang from '../translations/lang';
import { LangCode, Footer as MUIFooter } from '@pagopa/mui-italia';
import i18n from 'src/translations/i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LangCode>('it');

  const changeLanguage = (langCode: LangCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
  };
  return (
    <MUIFooter
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
  );
};
