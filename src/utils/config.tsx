import { LogoPagoPAProduct, ProductEntity, RootLinkType } from '@pagopa/mui-italia';
import React from 'react';
import { z, ZodError } from 'zod';

/** Useful default values  */
/** APIHOST default value works in conjunction with the proxy server. See the .proxyrc file */
const {
  APIHOST = 'http://localhost:1234/api',
  ENV = 'LOCAL',
  SHOW_STATUS_INFO = false,
  ENTITIES_LOGO_CDN
} = process.env;

type ENVIRONMENT = 'LOCAL' | 'DEV' | 'UAT' | 'PROD';
type BOOLISH = 'true' | 'false';

// ENV variables validation
const ENV_Schema: z.ZodType<ENVIRONMENT> = z.enum(['LOCAL', 'DEV', 'UAT', 'PROD']);
const APIHOST_schema = z.string().url();
const SHOW_STATUS_INFO_schema: z.ZodType<BOOLISH> = z.enum(['true', 'false']);
const ENTITIES_LOGO_CDN_schema = z.string().url();

try {
  ENV_Schema.parse(process.env.ENV);
  APIHOST_schema.parse(process.env.APIHOST);
  SHOW_STATUS_INFO_schema.parse(process.env.SHOW_STATUS_INFO);
  ENTITIES_LOGO_CDN_schema.parse(process.env.ENTITIES_LOGO_CDN);
} catch (e) {
  console.error('ENV variables validation fails', (e as ZodError).issues);
}

type Config = {
  env: ENVIRONMENT;
  baseURL: string;
  product: ProductEntity;
  pagopaLink: RootLinkType;
  showStatusInfo: boolean;
  entitiesLogoCdn: string;
  assistanceLink: string;
};

const product: ProductEntity = {
  id: '0',
  title: ``,
  productUrl: '#no-title',
  linkType: 'external',
  icon: <LogoPagoPAProduct color="default" title="PagoPA" />
};

const assistanceLink: string = 'nomeprodotto@assistenza.pagopa.it';

const pagopaLink: RootLinkType = {
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.'
};

const config: Config = {
  /** Running environment, usually valued by pipelines */
  env: ENV as ENVIRONMENT,
  /** the prefix of all api calls
   *  works in conjunction with the autogenrated API client
   *  see the command generate in the package.json file
   */
  baseURL: APIHOST,
  product,
  pagopaLink,
  /** Self explanatory, hide or show the status info (regarding transactions) in the whole application
   * the ternary means: if SHOW_STATUS_INFO isn't default (false, missing in the .env) then the value is
   * true when the string is 'true' (remember that env variables are always strings)
   * Type checking with Zod ensure that the values are the expected one ('true', 'false')
   */
  showStatusInfo: SHOW_STATUS_INFO !== false && SHOW_STATUS_INFO === 'true',
  entitiesLogoCdn: ENTITIES_LOGO_CDN as string,
  assistanceLink
};

export default config;
