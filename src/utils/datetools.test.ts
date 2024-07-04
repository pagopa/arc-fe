import '@testing-library/jest-dom';
import { DateFormat, DateInputFormat, datetools } from './datetools';

const { formatDate, parseItalianDate } = datetools;

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

  it('should format a date string in Italian format with medium format and without time', () => {
    const dateStr = '01-06-2024';
    const formattedDate = formatDate(dateStr, {
      inputFormat: DateInputFormat.IT,
      format: DateFormat.MEDIUM,
      locale: 'it-IT'
    });

    expect(formattedDate).toBe('01/06/2024');
  });

  it('should format a date string in Italian format with long format and time', () => {
    const dateStr = '2023-06-01T12:34:56';
    const formattedDate = formatDate(dateStr, {
      format: DateFormat.LONG,
      withTime: true,
      locale: 'it-IT'
    });

    expect(formattedDate).toContain('1 giugno 2023');
    expect(formattedDate).toContain('12:34');
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

  it('should warn and return empty string for unsupported inputFormat', () => {
    const dateStr = '2023-06-01';
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {}); // Mock console.warn

    const formattedDate = formatDate(dateStr, {
      // @ts-expect-error testing
      inputFormat: 'unsupported-format'
    });

    expect(formattedDate).toBe('');
    expect(spyWarn).toHaveBeenCalledWith(
      'Unsupported date format unsupported-format for date 2023-06-01'
    );

    spyWarn.mockRestore(); // Restore console.warn
  });
});

describe('parseItalianDate function', () => {
  it('should parse valid DD/MM/YYYY date format', () => {
    const dateStr = '01/05/2023';
    const parsedDate = parseItalianDate(dateStr);
    expect(parsedDate).toEqual(new Date('2023-05-01T00:00:00'));
  });

  it('should return null for invalid date format', () => {
    const dateStr = '2023/05/01';
    const parsedDate = parseItalianDate(dateStr);
    expect(parsedDate).toBeNull();
  });

  it('should return null for empty date string', () => {
    const dateStr = '';
    const parsedDate = parseItalianDate(dateStr);
    expect(parsedDate).toBeNull();
  });

  it('should return null for invalid date values', () => {
    const dateStr = '99/99/9999'; // Invalid day/month/year
    const parsedDate = parseItalianDate(dateStr);
    expect(parsedDate).toBeNull();
  });
});
