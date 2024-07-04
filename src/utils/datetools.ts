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

  const parsedDate = date ? new Date(date) : null;
  if (!parsedDate || isNaN(parsedDate.getTime())) {
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
