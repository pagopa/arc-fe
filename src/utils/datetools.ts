export enum Format {
  LONG = 'long',
  MEDIUM = 'medium'
}

export enum InputFormat {
  IT = 'it-IT',
  US = 'en-US',
  ISO = 'iso8601'
}

interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  withTime?: boolean;
  format?: Format;
  inputFormat?: InputFormat;
  invalidDateOutput?: string;
  locale?: Intl.LocalesArgument;
}

const dateOptions: { [key in Format]: Intl.DateTimeFormatOptions } = {
  long: { day: 'numeric', month: 'long', year: 'numeric' },
  medium: { day: '2-digit', month: '2-digit', year: 'numeric' }
};

const parseItalianDate = (dateStr: string): Date | null => {
  const parts = dateStr.split(/[-/]/);
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const parsed = new Date(`${year}-${month}-${day}T00:00:00`);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
};

const parseDate = (dateStr: string, format: InputFormat): Date | null => {
  switch (format) {
    case InputFormat.IT:
      return parseItalianDate(dateStr);
    case InputFormat.ISO:
    case InputFormat.US:
      return new Date(dateStr);
    default:
      console.warn(`Unsupported date format ${format} for date ${dateStr}`);
      return null;
  }
};

const getFormatOptions = (format: Format, withTime: boolean): Intl.DateTimeFormatOptions =>
  withTime ? { ...dateOptions[format], hour: '2-digit', minute: '2-digit' } : dateOptions[format];

const defaultOptions = {
  format: Format.MEDIUM,
  inputFormat: InputFormat.ISO,
  invalidDateOutput: '',
  locale: navigator.language,
  timeZone: 'Europe/Rome',
  withTime: false
};

const formatDate = (date?: string, options?: FormatDateOptions): string => {
  // This duplication is here so to make the options
  // object argument optional and with default values
  const {
    format = Format.MEDIUM,
    inputFormat = InputFormat.ISO,
    invalidDateOutput = '',
    locale = navigator.language,
    timeZone = 'Europe/Rome',
    withTime = false,
    ...userOptions
  }: FormatDateOptions = options || defaultOptions;

  const parsedDate = date ? parseDate(date, inputFormat) : null;
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    console.warn(`Invalid date provided ${date}`);
    return invalidDateOutput;
  }

  const formatOptions = getFormatOptions(format, withTime);
  const finalOptions: Intl.DateTimeFormatOptions = { ...formatOptions, timeZone, ...userOptions };

  return parsedDate.toLocaleString(locale, finalOptions);
};

export const datetools = { formatDate, parseDate, parseItalianDate };
