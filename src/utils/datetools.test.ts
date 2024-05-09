import humanDate from './datetools';
import '@testing-library/jest-dom';

describe('toEuro function', () => {
  it('should render correctly a date in a more human way', () => {
    expect(humanDate('it', '01/03/2022')).toBe('1 marzo 2022');
  });
});
