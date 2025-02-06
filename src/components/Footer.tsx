import React from 'react';
import { useTranslation } from 'react-i18next';
import lang from '../translations/lang';
import { Footer as MUIFooter } from '@pagopa/mui-italia';
import { ArcRoutes } from 'routes/routes';
import { useLanguage } from 'hooks/useLanguage';
import './Footer.css';

interface FooterProps {
  loggedUser?: boolean;
}
export const Footer = (props: FooterProps) => {
  const { t } = useTranslation();
  const { loggedUser = true } = props;
  const { language, changeLanguage } = useLanguage();

  return (
    <MUIFooter
      loggedUser={loggedUser}
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
          href: ArcRoutes.PRIVACY_POLICY,
          linkType: 'external'
        },
        {
          label: t('ui.footer.personalData'),
          ariaLabel: t('ui.footer.personalData'),
          linkType: 'external',
          href: 'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8'
        },
        {
          label: t('ui.footer.termsAndConditions'),
          ariaLabel: t('ui.footer.termsAndConditions'),
          href: ArcRoutes.TOS,
          linkType: 'external'
        },
        { label: t('aria.a11y'), ariaLabel: t('aria.a11y'), linkType: 'internal' }
      ]}
      preLoginLinks={{
        aboutUs: {
          links: [
            {
              label: t('ui.footer.who'),
              ariaLabel: t('ui.footer.who'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.pnrr'),
              ariaLabel: t('ui.footer.pnrr'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.media'),
              ariaLabel: t('ui.footer.media'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.products'),
              ariaLabel: t('ui.footer.products'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.workWithUs'),
              ariaLabel: t('ui.footer.workWithUs'),
              linkType: 'internal'
            }
          ]
        },
        resources: {
          title: t('ui.footer.resources'),
          links: [
            {
              label: t('ui.footer.privacy'),
              ariaLabel: t('ui.footer.privacy'),
              href: ArcRoutes.PRIVACY_POLICY,

              linkType: 'external'
            },
            {
              label: t('ui.footer.terms'),
              ariaLabel: t('ui.footer.terms'),
              href: ArcRoutes.TOS,
              linkType: 'external'
            },
            {
              label: t('ui.footer.certifications'),
              ariaLabel: t('ui.footer.certifications'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.security'),
              ariaLabel: t('ui.footer.security'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.dataProtectionRights'),
              ariaLabel: t('ui.footer.dataProtectionRights'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.cookie'),
              ariaLabel: t('ui.footer.cookie'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.transparentCompany'),
              ariaLabel: t('ui.footer.transparentCompany'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.dislosurePolicy'),
              ariaLabel: t('ui.footer.dislosurePolicy'),
              linkType: 'internal'
            },
            {
              label: t('ui.footer.231'),
              ariaLabel: t('ui.footer.231'),
              linkType: 'internal'
            }
          ]
        },
        followUs: {
          title: t('ui.footer.followUs'),
          socialLinks: [
            {
              icon: 'linkedin',
              title: 'Linkedin',
              ariaLabel: 'Linkedin'
            },
            {
              icon: 'instagram',
              title: 'Instagram',
              ariaLabel: 'Instagram'
            },
            {
              icon: 'twitter',
              title: 'Twitter',
              ariaLabel: 'Twitter'
            },
            {
              icon: 'medium',
              title: 'Medium',
              ariaLabel: 'Medium'
            }
          ],
          links: [
            { label: t('ui.footer.a11y'), ariaLabel: t('ui.footer.a11y'), linkType: 'internal' }
          ]
        }
      }}
      currentLangCode={language}
      languages={lang}
      productsJsonUrl="https://selfcare.pagopa.it/assets/products.json"
      hideProductsColumn={false}
      onLanguageChanged={changeLanguage}
    />
  );
};
