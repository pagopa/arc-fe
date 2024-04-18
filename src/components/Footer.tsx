import React from 'react';
import { useTranslation } from 'react-i18next';
import lang from '../translations/lang';
import { Footer as MUIFooter } from '@pagopa/mui-italia';
import utils from 'src/utils';

export const Footer = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = utils.hooks.useLanguage();

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
      currentLangCode={language}
      languages={lang}
      onExit={() => {}}
      productsJsonUrl="https://dev.selfcare.pagopa.it/assets/products.json"
      hideProductsColumn={false}
      onLanguageChanged={changeLanguage}
    />
  );
};
