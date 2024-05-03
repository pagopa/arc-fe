import { ProductEntity, RootLinkType } from '@pagopa/mui-italia';

/** Useful default values  */
const { APIHOST = 'http://localhost:1234', ENV = 'LOCAL' } = process.env;

/** This works in conjunction with the proxy server. See the .proxyrc file */
const baseURL = `${APIHOST}${ENV === 'LOCAL' ? '/api' : ''}`;

type ENVIRONMENT = 'LOCAL' | 'DEV' | 'UAT' | 'PROD';

type Config = {
  env: ENVIRONMENT;
  baseURL: string;
  product: ProductEntity;
  pagopaLink: RootLinkType;
};

const product: ProductEntity = {
  id: '0',
  title: `Area Riservata Cittadini`,
  productUrl: '#area-riservata-cittadini',
  linkType: 'external'
};

const pagopaLink: RootLinkType = {
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.'
};

const config: Config = {
  env: ENV as ENVIRONMENT,
  baseURL,
  product,
  pagopaLink
};

export default config;
