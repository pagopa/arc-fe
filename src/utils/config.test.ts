import { renderHook, act } from '@testing-library/react';
import utils from '.';
// import { ZodError } from 'zod';

describe('useLanguage hook', () => {
  it('should return the inital default it language correctly', () => {
    const { result } = renderHook(() => utils.hooks.useLanguage());
    expect(result.current.language).toBe('it');
  });

  it('should change the language to en correctly passing the langCode as argument to changeLanguage', () => {
    const { result } = renderHook(() => utils.hooks.useLanguage());
    act(() => {
      result.current.changeLanguage('en');
    });
    expect(result.current.language).toBe('en');
  });
});

describe('environmental variables SHOW_STATUS_INFO', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('SHOW_STATUS_INFO process.env variables has rigth value (true)', () => {
    // Set the variables
    process.env.SHOW_STATUS_INFO = 'true';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('.').default;
    expect(utils.config.showStatusInfo).toBe(true);
  });

  test('SHOW_STATUS_INFO process.env variables has rigth value (false)', () => {
    // Set the variables
    process.env.SHOW_STATUS_INFO = 'false';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('.').default;
    expect(utils.config.showStatusInfo).toBe(false);
  });

  test('SHOW_STATUS_INFO process.env variables has the rigth default value (false)', () => {
    // Set the variables
    process.env.SHOW_STATUS_INFO = undefined;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('.').default;
    expect(utils.config.showStatusInfo).toBe(false);
  });

  test('type cheks work correclty trying to assing not allowed value to SHOW_STATUS_INFO', () => {
    process.env.SHOW_STATUS_INFO = '0';
    const logSpy = jest.spyOn(global.console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('.').default;
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      'ENV variables validation fails',
      expect.arrayContaining([
        expect.objectContaining({
          message: "Invalid enum value. Expected 'true' | 'false', received '0'"
        })
      ])
    );
  });
});

describe('environmental variables default values', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('APIHOST process.env variables has rigth value', () => {
    // Set the variables
    process.env.APIHOST = 'http://api.dev.test/v1';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('.').default;
    expect(utils.config.baseURL).toBe('http://api.dev.test/v1');
  });

  test('APIHOST process.env variables has rigth default value (http://localhost:1234/api)', () => {
    // Set the variables
    process.env.APIHOST = undefined;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('.').default;
    expect(utils.config.baseURL).toBe('http://localhost:1234/api');
  });

  test('type cheks work correclty trying to assing not allowed value to APIHOST', () => {
    process.env.APIHOST = 'wrong url';
    const logSpy = jest.spyOn(global.console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('.').default;
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      'ENV variables validation fails',
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Invalid url'
        })
      ])
    );
  });

  test('ENV process.env variables has rigth default value ("LOCAL")', () => {
    // Set the variables
    process.env.ENV = undefined;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('.').default;
    expect(utils.config.env).toBe('LOCAL');
  });

  test('PAYMENT_NOTICE_NUMBER_PREFIX has rigth default value ("3")', () => {
    // Set the variables
    process.env.PAYMENT_NOTICE_NUMBER_PREFIX = undefined;
    expect(utils.config.paymentNoticeNumberPrefix).toBe(3);
  });
});
