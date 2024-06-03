import { LogoPagoPAProduct, ProductEntity, RootLinkType } from '@pagopa/mui-italia';
import React from 'react';

/** Useful default values  */
/** APIHOST default value works in conjunction with the proxy server. See the .proxyrc file */
const { APIHOST = 'http://localhost:1234/api', ENV = 'LOCAL' } = process.env;

type ENVIRONMENT = 'LOCAL' | 'DEV' | 'UAT' | 'PROD';

type Config = {
  env: ENVIRONMENT;
  baseURL: string;
  product: ProductEntity;
  pagopaLink: RootLinkType;
};

const product: ProductEntity = {
  id: '0',
  title: ``,
  productUrl: '#no-title',
  linkType: 'external',
  icon: <LogoPagoPAProduct color="default" title="PagoPA" />
};

const pagopaLink: RootLinkType = {
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.'
};

const config: Config = {
  env: ENV as ENVIRONMENT,
  baseURL: APIHOST,
  product,
  pagopaLink
};

export default config;
