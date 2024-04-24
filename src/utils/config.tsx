import { ProductEntity, RootLinkType } from '@pagopa/mui-italia';
/* Icons */

type Config = {
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
  product,
  pagopaLink
};

export default config;
