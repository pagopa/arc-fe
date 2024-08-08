import React from 'react';
import { useTranslation } from 'react-i18next';
import lang from '../translations/lang';
import { Footer as MUIFooter } from '@pagopa/mui-italia';
import utils from 'utils';
import { ArcRoutes } from 'routes/routes';

interface FooterProps {
  loggedUser?: boolean;
}
export const Footer = (props: FooterProps) => {
  const { t } = useTranslation();
  const { loggedUser = true } = props;
  const { language, changeLanguage } = utils.hooks.useLanguage();

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
          href: ArcRoutes.PRIVACY_PAGE,
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
          href: ArcRoutes.TOS_PAGE,
          linkType: 'internal'
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
              label: t('ui.footer.praaaivacy'),
              ariaLabel: t('ui.footer.privacy'),
              href: ArcRoutes.PRIVACY_PAGE,

              linkType: 'internal'
            },
            {
              label: t('ui.footer.terms'),
              ariaLabel: t('ui.footer.terms'),
              href: ArcRoutes.TOS_PAGE,
              linkType: 'internal'
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
      onExit={() => {}}
      productsJsonUrl="https://dev.selfcare.pagopa.it/assets/products.json"
      hideProductsColumn={false}
      onLanguageChanged={changeLanguage}
    />
  );
};
