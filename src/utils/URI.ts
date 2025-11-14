import { formatDate, parse, endOfDay  } from 'date-fns';
import { unflatten, flatten } from 'flat';
import queryString from 'query-string';

function sanitizeKeyChars(input: string): string {
  // Allows letters, digits and literal dot and _
  return input.replace(/[^a-zA-Z0-9._]/g, '');
}

const toDate = (value: string): Date => {
  return parse(value, 'dd-MM-yyyy', new Date());
};

function isDateString(value: string): boolean {
  const isDate = /^(\d{2})-(\d{2})-(\d{4})$/;
  return isDate.test(value);
}

function encodeValue(value: unknown): string {
  return value instanceof Date
    ? formatDate(value, 'dd-MM-yyyy')
    : String(value);
}

function decode(fragment: string): Record<string, string | Date> {
  const parsed = queryString.parse(fragment) as Record<string, string>;
  const flatObj: Record<string, string | Date> = {};

  Object.entries(parsed).forEach(([key, value]) => {
    const sanitizedKey = sanitizeKeyChars(key);
    if (isDateString(value)) {
      if (/to$/i.test(sanitizedKey)) {
        flatObj[sanitizedKey] = endOfDay(toDate(value));
      } else {
        flatObj[sanitizedKey] = toDate(value);
      }
    } else {
      flatObj[sanitizedKey] = value;
    }
  });

  return unflatten(flatObj);
}

export function encode<T extends Record<string, unknown>>(obj: T): string {
  // Flatten the object to dot-notation keys
  const flattened = flatten(obj) as Record<string, unknown>;
  const flatStrings: Record<string, string> = {};
  // Convert all values to strings, formatting dates
  Object.entries(flattened).forEach(([key, value]) => {
    if (value && key) {
      flatStrings[key] = encodeValue(value);
    }
  });
  return queryString.stringify(flatStrings);
}

/**
 * Set or update the window's URL fragment parameters without reload.
 */
const set = (params: string, opts?: { replace?: boolean }) => {
  if (opts?.replace) {
    window.history.replaceState({}, '', `#${params}`);
  } else {
    window.history.pushState({}, '', `#${params}`);
  }
  window.dispatchEvent(new Event('hashchangeCustom'));
};

type ResetUrlParamsOptions = {
  excludeKeys: Array<string>;
  defaults?: Record<string, unknown>;
  sourceParams?: Record<string, unknown>;
};

/**
 * Reset URL hash parameters by filtering out specified keys and applying defaults.
 */
const resetUrlParams = (options: ResetUrlParamsOptions): string => {
  const { excludeKeys, defaults = {}, sourceParams } = options;

  const currentParams = sourceParams || decode(window.location.hash);

  const filteredParams = Object.fromEntries(
    Object.entries(currentParams).filter(([key]) => !excludeKeys.includes(key))
  );

  const finalParams = {
    ...filteredParams,
    ...defaults
  };

  const encoded = encode(finalParams);
  set(encoded);

  return encoded;
};

export default {
  decode,
  encode,
  set,
  resetUrlParams
};
