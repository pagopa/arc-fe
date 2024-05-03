import { ProductEntity, RootLinkType } from '@pagopa/mui-italia';

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
  baseURL: APIHOST,
  product,
  pagopaLink
};

export default config;
