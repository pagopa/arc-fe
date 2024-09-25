import utils from 'utils';

describe('environmental variables default values', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('APIHOST process.env variables has right value', () => {
    // Set the variables
    process.env.APIHOST = 'http://api.dev.test/v1';
    expect(utils.config.baseURL).toBe('http://api.dev.test/v1');
  });

  test('APIHOST process.env variables has right default value (http://localhost:1234/api)', () => {
    // Set the variables
    process.env.APIHOST = undefined;
    expect(utils.config.baseURL).toBe('http://localhost:1234/api');
  });

  test('type checks work correctly trying to assign not allowed value to APIHOST', () => {
    process.env.APIHOST = 'wrong url';
    const logSpy = vi.spyOn(global.console, 'error');
    expect(logSpy).toHaveBeenCalledWith(
      'ENV variables validation fails',
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Invalid url'
        })
      ])
    );
  });

  test('ENV process.env variables has right default value ("LOCAL")', () => {
    // Set the variables
    process.env.ENV = undefined;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(utils.config.env).toBe('LOCAL');
  });
});
