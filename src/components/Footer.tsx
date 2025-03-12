import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterPostLogin, FooterLegal } from '@pagopa/mui-italia';
import { ArcRoutes } from 'routes/routes';
import { useLanguage } from 'hooks/useLanguage';

const LINK_PERSONAL_DATA_PROTECTION =
  'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8';

const openExternalLink = (url: string) => window.open(url, '_blank')?.focus();

export const Footer = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <>
      <FooterPostLogin
        companyLink={{ ariaLabel: 'PagoPA SPA' }}
        links={[
          {
            label: t('ui.footer.privacy'),
            ariaLabel: t('ui.footer.privacy'),
            href: ArcRoutes.PRIVACY_POLICY,
            linkType: 'external',
            onClick: () => openExternalLink(ArcRoutes.PRIVACY_POLICY)
          },
          {
            label: t('ui.footer.personalData'),
            ariaLabel: t('ui.footer.personalData'),
            linkType: 'external',
            href: LINK_PERSONAL_DATA_PROTECTION,
            onClick: () => openExternalLink(LINK_PERSONAL_DATA_PROTECTION)
          },
          {
            label: t('ui.footer.termsAndConditions'),
            ariaLabel: t('ui.footer.termsAndConditions'),
            href: ArcRoutes.TOS,
            linkType: 'external',
            onClick: () => window.open(ArcRoutes.TOS, '_blank')?.focus()
          },
          {
            label: t('aria.a11y'),
            ariaLabel: t('aria.a11y'),
            linkType: 'external',
            onClick: () =>
              window
                .open(
                  'https://form.agid.gov.it/view/cbed4100-ff1e-11ef-aef0-65558716aff1',
                  '_blank'
                )
                ?.focus()
          }
        ]}
        currentLangCode={language}
        languages={{
          it: {
            it: 'Italiano',
            en: 'Inglese'
          },
          en: {
            it: 'Italian',
            en: 'English'
          }
        }}
        onLanguageChanged={changeLanguage}
      />
      <FooterLegal
        content={
          <>
            <b>{t('general.PagoPA')}</b> - {t('ui.footer.legalInfo')}
          </>
        }
      />
    </>
  );
};
