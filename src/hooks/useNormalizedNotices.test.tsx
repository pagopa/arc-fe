import { renderHook } from '@testing-library/react';
import utils from 'utils';
import converters from 'utils/converters';
import { useNormalizedNotices } from './useNormalizedNotices';

jest.mock('utils', () => ({
  loaders: {
    getPaymentNotices: jest.fn()
  }
}));

jest.mock('utils/converters', () => ({
  prepareNoticesData: jest.fn()
}));

describe('useNormalizedNotices', () => {
  beforeEach(() => {
    (utils.loaders.getPaymentNotices as jest.Mock).mockClear();
    (converters.prepareNoticesData as jest.Mock).mockClear();
  });

  it('should return normalized notices', () => {
    // Arrange
    const mockQueryResult = {
      data: [
        { id: 1, notice: 'Notice 1' },
        { id: 2, notice: 'Notice 2' }
      ]
    };
    const mockNormalizedData = [
      { id: 1, normalizedNotice: 'Normalized Notice 1' },
      { id: 2, normalizedNotice: 'Normalized Notice 2' }
    ];

    (utils.loaders.getPaymentNotices as jest.Mock).mockReturnValue(mockQueryResult);
    (converters.prepareNoticesData as jest.Mock).mockReturnValue(mockNormalizedData);

    // Act
    const { result } = renderHook(() => useNormalizedNotices());

    // Assert
    expect(utils.loaders.getPaymentNotices).toHaveBeenCalledTimes(1);
    expect(converters.prepareNoticesData).toHaveBeenCalledWith(mockQueryResult.data);
    expect(result.current).toEqual({ ...mockQueryResult, data: mockNormalizedData });
  });
});
