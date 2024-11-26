import { RootLinkType } from '@pagopa/mui-italia';
import { z, ZodError } from 'zod';

/** Useful default values  */
/** APIHOST default value works in conjunction with the proxy server. See the .proxyrc file */
const {
  APIHOST = 'http://localhost:1234/api',
  API_TIMEOUT = '10000',
  CHECKOUT_HOST = 'https://dev.checkout.pagopa.it',
  CHECKOUT_PLATFORM_URL = 'https://api.dev.platform.pagopa.it/checkout/ec/v1',
  DEPLOY_PATH = '/pagamenti',
  ENTITIES_LOGO_CDN,
  LOGIN_URL = 'https://api.dev.cittadini-p4pa.pagopa.it/arc/v1/login/oneidentity',
  PAYMENT_RETURN_URL = 'http://localhost:1234',
  VERSION = ''
} = process.env;

// ENV variables validation
const APIHOST_schema = z.string().url();
const API_TIMEOUT_schema = z.number();
const CHECKOUT_HOST_schema = z.string().url();
const CHECKOUT_PLATFORM_URL_schema = z.string().url();
const DEPLOY_PATH_schema = z.string();
const ENTITIES_LOGO_CDN_schema = z.string().url();
const LOGIN_URL_schema = z.string().url();
const PAYMENT_RETURN_URL_schema = z.string().url();
const VERSION_schema = z.string();
try {
  APIHOST_schema.parse(process.env.APIHOST);
  API_TIMEOUT_schema.parse(process.env.API_TIMEOUT);
  CHECKOUT_HOST_schema.parse(process.env.CHECKOUT_HOST);
  CHECKOUT_PLATFORM_URL_schema.parse(process.env.CHECKOUT_PLATFORM_URL);
  DEPLOY_PATH_schema.parse(process.env.DEPLOY_PATH);
  ENTITIES_LOGO_CDN_schema.parse(process.env.ENTITIES_LOGO_CDN);
  LOGIN_URL_schema.parse(process.env.LOGIN_URL);
  PAYMENT_RETURN_URL_schema.parse(process.env.PAYMENT_RETURN_URL);
  VERSION_schema.parse(process.env.VERSION);
} catch (e) {
  console.error('ENV variables validation fails', (e as ZodError).issues);
}

type Config = {
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
  paymentReturnUrl: string;
  tokenHeaderExcludePaths: string[];
  version: string;
};

const assistanceLink: string = 'nomeprodotto@assistenza.pagopa.it';

const pagopaLink: RootLinkType = {
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.'
};

const config: Config = {
  assistanceLink,
  /** after timeout api call is aborted
   * if settet to 0 will wait indefinitely
   **/
  apiTimeout: Number.parseInt(API_TIMEOUT, 10),
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
  paymentReturnUrl: PAYMENT_RETURN_URL,
  /** This array is populated by paths that
   * don't need a auth token
   * */
  tokenHeaderExcludePaths: ['/token/oneidentity'],
  /** Running version, usually valued by pipelines */
  version: VERSION
};

export default config;
