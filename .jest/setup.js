// jest environments variables
process.env.APIHOST = 'http://localhost:1234/api';
process.env.ENV = 'LOCAL';
process.env.ENTITIES_LOGO_CDN = 'https://assets.cdn.io.italia.it/logos/organizations';
process.env.ASSISTANCE_LINK = 'https://pagopa.gov.it';
process.env.SHOW_STATUS_INFO = 'true';
process.env.CHECKOUT_HOST = 'https://dev.checkout.pagopa.it';
process.env.LOGIN_URL = 'https://api.dev.cittadini-p4pa.pagopa.it/arc/v1/login/oneidentity';
process.env.VERSION = 'TEST';

// global mocks
jest.mock('@preact/signals-react', () => {
  return {
    __esModule: true,
    signal: jest.fn().mockImplementation(() => {
      return {};
    })
  };
});
