import { Footer } from '@pagopa/mui-italia';
import lang from '../translations/lang';
import React from 'react';

export default {
  component: Footer,
  title: 'Footer'
};

export const Default = {
  args: {
    loggedUser: true,
    legalInfo: (
      <>
        <b>PagoPA S.p.A</b> - Società per azioni con socio unico - capitale sociale di euro
        1,000,000 interamente versato - sede legale in Roma, Piazza Colonna 370, CAP 00187 - N. di
        iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
      </>
    ),
    companyLink: { ariaLabel: 'PagoPA SpA' },
    postLoginLinks: [
      {
        label: 'Informativa privacy',
        ariaLabel: 'Informativa privacy',
        linkType: 'internal'
      },
      {
        label: 'Diritto alla protezione dei dati personali',
        ariaLabel: 'Diritto alla protezione dei dati personali',
        linkType: 'internal'
      },
      {
        label: 'Termini e condizioni',
        ariaLabel: 'Termini e condizioni',
        linkType: 'internal'
      },
      { label: 'Accessibilità', ariaLabel: 'Accessibilità', linkType: 'internal' }
    ],
    preLoginLinks: {
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
    },
    currentLangCode: 'it',

    languages: lang,
    productsJsonUrl: 'https://dev.selfcare.pagopa.it/assets/products.json',
    hideProductsColumn: false
  }
};
