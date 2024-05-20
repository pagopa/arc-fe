import humanDate from './datetools';

describe('humanDate function', () => {
  it('formats the date correctly with default language', () => {
    const unformattedDate = '31/12/2023';

    const result = humanDate(undefined, unformattedDate);

    expect(result).toEqual('December 31, 2023');
  });

  it('formats the date correctly with specified language', () => {
    const unformattedDate = '31/12/2023';
    const lang = 'en-GB'; // British English

    const result = humanDate(lang, unformattedDate);

    expect(result).toEqual('31 December 2023');
  });

  it('handles invalid date format', () => {
    const unformattedDate = 'Invalid Date';

    const result = humanDate(undefined, unformattedDate);

    // Expect the function to return 'Invalid Date'
    expect(result).toEqual('Invalid Date');
  });
});
