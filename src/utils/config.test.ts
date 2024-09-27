describe('Configuration Tests', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Save original environment variables
    process.env = { ...originalEnv };
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should load configuration with valid environment variables', async () => {
    process.env.APIHOST = 'http://localhost:1234/api';
    process.env.ENV = 'DEV';
    process.env.CHECKOUT_HOST = 'https://dev.checkout.pagopa.it';
    process.env.LOGIN_URL = 'https://api.dev.cittadini-p4pa.pagopa.it/arc/v1/login/oneidentity';
    process.env.CHECKOUT_PLATFORM_URL = 'https://api.dev.platform.pagopa.it/checkout/ec/v1';
    process.env.PAYMENT_RETURN_URL = 'http://localhost:1234';
    process.env.DEPLOY_PATH = '/pagamenti';
    process.env.VERSION = '1.0.0';

    // Reload the config module to apply changes
    const reloadedConfig = (await import('./config')).default;

    // Assertions to ensure the config values are correctly loaded
    expect(reloadedConfig.env).toBe('DEV');
    expect(reloadedConfig.baseURL).toBe(process.env.APIHOST);
    expect(reloadedConfig.checkoutHost).toBe(process.env.CHECKOUT_HOST);
    expect(reloadedConfig.loginUrl).toBe(process.env.LOGIN_URL);
    expect(reloadedConfig.checkoutPlatformUrl).toBe(process.env.CHECKOUT_PLATFORM_URL);
    expect(reloadedConfig.paymentReturnUrl).toBe(process.env.PAYMENT_RETURN_URL);
    expect(reloadedConfig.deployPath).toBe(process.env.DEPLOY_PATH);
    expect(reloadedConfig.version).toBe('1.0.0');
  });

  it('should throw validation error for invalid URL in APIHOST', async () => {
    process.env.APIHOST = 'invalid-url'; // Invalid URL
    process.env.ENV = 'DEV';

    const logSpy = vi.spyOn(console, 'error');
    await import('./config'); // Use dynamic import
    expect(logSpy).toHaveBeenCalledWith(
      'ENV variables validation fails',
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Invalid url'
        })
      ])
    );
  });

  it('should fail when missing required environment variables', async () => {
    delete process.env.APIHOST; // Missing required variable

    const logSpy = vi.spyOn(console, 'error');
    await import('./config'); // Use dynamic import
    expect(logSpy).toHaveBeenCalledWith(
      'ENV variables validation fails',
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Required'
        })
      ])
    );
  });
});
