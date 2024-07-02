import { datetools } from './datetools';

describe('humanDate function', () => {
  it('formats the date correctly with default language', () => {
    const unformattedDate = '31/12/2023';

    const result = datetools.humanDate(undefined, unformattedDate);

    expect(result).toEqual('December 31, 2023');
  });

  it('formats the date correctly with specified language', () => {
    const unformattedDate = '31/12/2023';
    const lang = 'en-GB'; // British English

    const result = datetools.humanDate(lang, unformattedDate);

    expect(result).toEqual('31 December 2023');
  });

  it('handles invalid date format', () => {
    const unformattedDate = 'Invalid Date';

    const result = datetools.humanDate(undefined, unformattedDate);

    // Expect the function to return 'Invalid Date'
    expect(result).toEqual('Invalid Date');
  });
});

describe('isoToHumanDateRome', () => {
  const { isoToHumanDateRome } = datetools;

  it('should format a valid ISO date string to a human-readable date in Rome timezone', () => {
    const isoDateString = '2023-05-29T12:34:56Z';
    const formattedDate = isoToHumanDateRome(isoDateString, 'it-IT');

    const expectedDate = '29/05/2023'; // 'dd/mm/yyyy' format

    expect(formattedDate).toBe(expectedDate);
  });

  it('should format a date to the rome timezone', () => {
    const isoDateString = '2023-06-01T23:00:00Z';
    const formattedDate = isoToHumanDateRome(isoDateString, 'it-IT');

    const expectedDate = '02/06/2023'; // 'dd/mm/yyyy' format

    expect(formattedDate).toBe(expectedDate);
  });

  it('should return an empty string for an undefined input', () => {
    const formattedDate = isoToHumanDateRome(undefined);
    expect(formattedDate).toBe('');
  });

  it('should return an empty string for an invalid ISO date string', () => {
    const invalidIsoDateString = 'invalid-date';
    const formattedDate = isoToHumanDateRome(invalidIsoDateString);
    expect(formattedDate).toBe('');
  });

  it('should return an empty string for an empty string input', () => {
    const formattedDate = isoToHumanDateRome('');
    expect(formattedDate).toBe('');
  });
});
