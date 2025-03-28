import { RootLinkType } from '@pagopa/mui-italia';
import { z, ZodError } from 'zod';

/** Useful default values  */
/** APIHOST default value works in conjunction with the proxy server. See the .proxyrc file */
const {
  ENV = 'LOCAL',
  APIHOST = 'http://localhost:1234/api',
  API_TIMEOUT = '10000',
  CHECKOUT_HOST = 'https://dev.checkout.pagopa.it',
  CHECKOUT_PLATFORM_URL = 'https://api.dev.platform.pagopa.it/checkout/ec/v1',
  DEPLOY_PATH = '/pagamenti',
  ENTITIES_LOGO_CDN,
  LOGIN_URL = 'https://api.dev.cittadini-p4pa.pagopa.it/arc/v1/login/oneidentity',
  VERSION = '',
  SHOW_NOTICES = '1'
} = process.env;

const PARSED_API_TIMEOUT = Number.parseInt(API_TIMEOUT, 10);
const PARSED_SHOW_NOTICES = Boolean(Number.parseInt(SHOW_NOTICES, 10));

export type ENVIRONMENT = 'LOCAL' | 'DEV' | 'UAT' | 'PROD';

// ENV variables validation
const ENV_Schema: z.ZodType<ENVIRONMENT> = z.enum(['LOCAL', 'DEV', 'UAT', 'PROD']);
const APIHOST_schema = z.string().url();
const API_TIMEOUT_schema = z.number();
const CHECKOUT_HOST_schema = z.string().url();
const CHECKOUT_PLATFORM_URL_schema = z.string().url();
const DEPLOY_PATH_schema = z.string();
const ENTITIES_LOGO_CDN_schema = z.string().url();
const LOGIN_URL_schema = z.string().url();
const VERSION_schema = z.string();
const SHOW_NOTICES_schema = z.enum(['0', '1']);
try {
  ENV_Schema.parse(process.env.ENV);
  APIHOST_schema.parse(process.env.APIHOST);
  API_TIMEOUT_schema.parse(PARSED_API_TIMEOUT);
  CHECKOUT_HOST_schema.parse(process.env.CHECKOUT_HOST);
  CHECKOUT_PLATFORM_URL_schema.parse(process.env.CHECKOUT_PLATFORM_URL);
  DEPLOY_PATH_schema.parse(process.env.DEPLOY_PATH);
  ENTITIES_LOGO_CDN_schema.parse(process.env.ENTITIES_LOGO_CDN);
  LOGIN_URL_schema.parse(process.env.LOGIN_URL);
  VERSION_schema.parse(process.env.VERSION);
  SHOW_NOTICES_schema.parse(process.env.SHOW_NOTICES);
} catch (e) {
  console.error('ENV variables validation failed', (e as ZodError).issues);
}

type Config = {
  env: ENVIRONMENT;
  assistanceLink: string;
  apiTimeout: number;
  baseURL: string;
  checkoutHost: string;
  checkoutPlatformUrl: string;
  deployPath: string;
  entitiesLogoCdn?: string;
  loginUrl: string;
  missingValue: string;
  pagopaLink: RootLinkType;
  tokenHeaderExcludePaths: string[];
  version: string;
  showNotices: boolean;
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
  assistanceLink,
  /** after timeout api call is aborted
   * if settet to 0 will wait indefinitely
   **/
  apiTimeout: PARSED_API_TIMEOUT,
  /** the prefix of all api calls works
   * in conunction with the auto generated
   * API client see the command generate
   * in the package.json file
   **/
  baseURL: APIHOST,
  checkoutHost: CHECKOUT_HOST,
  checkoutPlatformUrl: CHECKOUT_PLATFORM_URL,
  deployPath: DEPLOY_PATH,
  entitiesLogoCdn: ENTITIES_LOGO_CDN,
  loginUrl: LOGIN_URL,
  /** a global character to be shown when
   * a info is missing
   **/
  missingValue: '-',
  pagopaLink,
  /** This array is populated by paths that
   * don't need a auth token
   * */
  tokenHeaderExcludePaths: ['/token/oneidentity'],
  /** Running version, usually valued by pipelines */
  version: VERSION,
  showNotices: PARSED_SHOW_NOTICES
};

export default config;
