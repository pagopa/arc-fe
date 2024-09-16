import { renderHook, waitFor } from '@testing-library/react';
import utils from 'utils';
import { useUserEmail } from './useUserEmail';
import { Mock } from 'vitest';

vi.mock('loaders', () => ({
  getUserInfo: vi.fn()
}));

describe('useUserEmail', () => {
  it('should return userEmail', async () => {
    // Arrange
    const mockQueryResult = {
      data: {
        userId: '_476b655b48c6e73bb210666077eba3a9',
        fiscalCode: 'TINIT-PLOMRC01P30L736Y',
        familyName: 'Polo',
        name: 'Marco',
        email: 'ilmilione@virgilio.it'
      }
    };
    const mockEmail = 'ilmilione@virgilio.it';
    (utils.loaders.getUserInfo as Mock).mockReturnValue(mockQueryResult);

    // Act
    const { result } = renderHook(() => useUserEmail());

    // Assert
    expect(utils.loaders.getUserInfo).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current).toEqual(mockEmail);
    });
  });
});
