export enum DateFormat {
  LONG = 'long',
  MEDIUM = 'medium'
}

interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  withTime?: boolean;
  format?: DateFormat;
  invalidDateOutput?: string;
  locale?: Intl.LocalesArgument;
}

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const defaultLocale = navigator.language;

const dateOptions: { [key in DateFormat]: Intl.DateTimeFormatOptions } = {
  long: { day: 'numeric', month: 'short', year: 'numeric' },
  medium: { day: '2-digit', month: '2-digit', year: 'numeric' }
};

const getFormatOptions = (format: DateFormat, withTime: boolean): Intl.DateTimeFormatOptions =>
  withTime ? { ...dateOptions[format], hour: '2-digit', minute: '2-digit' } : dateOptions[format];

const defaultOptions = {
  format: DateFormat.MEDIUM,
  invalidDateOutput: '',
  locale: defaultLocale,
  timeZone: 'Europe/Rome',
  withTime: false
};

/**
 * Formats a given date string according to specified options.
 *
 * @param {string} [date] - The date string to format. If not provided, the function will return the `invalidDateOutput`.
 * @param {FormatDateOptions} [options] - An object containing optional formatting settings.
 * @param {DateFormat} [options.format=DateFormat.MEDIUM] - The date format, either `long` or `medium`.
 * @param {string} [options.invalidDateOutput=''] - The output string if the provided date is invalid.
 * @param {Intl.LocalesArgument} [options.locale=defaultLocale] - The locale for the date formatting.
 * @param {string} [options.timeZone='Europe/Rome'] - The time zone to use for formatting the date.
 * @param {boolean} [options.withTime=false] - Whether to include time in the formatted output.
 *
 * @returns {string} The formatted date string.
 *
 * @example
 * // returns '01/06/2024'
 * formatDate('2024-06-01T00:00:00');
 *
 * @example
 * // returns 'July 4, 2024'
 * formatDate('2024-07-04', { format: DateFormat.LONG });
 *
 * @example
 * // returns 'Invalid date'
 * formatDate('invalid-date', { invalidDateOutput: 'Invalid date' });
 */
const formatDate = (date?: string, options?: FormatDateOptions): string => {
  // This duplication is here so to make the options
  // object argument optional and with default values
  const {
    format = DateFormat.MEDIUM,
    invalidDateOutput = '',
    locale = defaultLocale,
    timeZone = 'Europe/Rome',
    withTime = false,
    ...userOptions
  }: FormatDateOptions = options || defaultOptions;

  const parsedDate = date ? new Date(date) : NaN;
  if (isNaN(parsedDate as number)) {
    console.warn(`Invalid date provided ${date}`);
    return invalidDateOutput;
  }

  const formatOptions = getFormatOptions(format, withTime);
  const finalOptions: Intl.DateTimeFormatOptions = { ...formatOptions, timeZone, ...userOptions };

  return parsedDate.toLocaleString(locale, finalOptions);
};

export const datetools = {
  defaultLocale,
  formatDate,
  localTimeZone
};
