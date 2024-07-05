import '@testing-library/jest-dom';
import { DateFormat, datetools } from './datetools';

const { formatDate } = datetools;

describe('formatDate', () => {
  const originalNavigatorLanguage = navigator.language;
  beforeAll(() => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true
    });
  });

  afterAll(() => {
    Object.defineProperty(navigator, 'language', {
      value: originalNavigatorLanguage,
      configurable: true
    });
  });

  it('should use default options when options is undefined', () => {
    const formattedDate = formatDate('2024-04-06T09:48:17.080Z');
    expect(formattedDate).toEqual('04/06/2024');
  });

  it('should format a date string in Italian format with long format and time', () => {
    const dateStr = '2024-06-01T12:30:00Z';
    const formattedDate = formatDate(dateStr, {
      format: DateFormat.LONG,
      withTime: true,
      locale: 'it-IT'
    });

    expect(formattedDate).toContain('1 giu 2024');
    expect(formattedDate).toContain('14:30');
  });

  it('Should converts time correctly', () => {
    const dateStr = '2024-06-01T12:30:00Z';
    const formattedDate = formatDate(dateStr, {
      withTime: true,
      timeZone: 'utc',
      locale: 'en-US'
    });

    expect(formattedDate).toContain('06/01/2024');
    expect(formattedDate).toContain('12:30');
  });

  it('should return invalidDateOutput for an invalid date', () => {
    const dateStr = 'invalid-date';
    const formattedDate = formatDate(dateStr, {
      invalidDateOutput: 'Invalid Date',
      locale: 'it-IT'
    });

    expect(formattedDate).toBe('Invalid Date');
  });

  it('should return invalidDateOutput for missing date', () => {
    const dateStr = '';
    const formattedDate = formatDate(dateStr, {
      invalidDateOutput: 'Invalid Date'
    });

    expect(formattedDate).toBe('Invalid Date');
  });
});
