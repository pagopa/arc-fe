import utils from 'utils';
import { useNavigate } from 'react-router-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useUserInfo } from './useUserInfo';

jest.mock('utils', () => ({
  loaders: {
    getUserInfoHeader: jest.fn()
  }
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('useUserInfo', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('returns userInfo', async () => {
    const userMock = {
      userId: '_476b655b48c6e73bb210666077eba3a9',
      fiscalCode: 'TINIT-PLOMRC01P30L736Y',
      familyName: 'Polo',
      name: 'Marco',
      email: 'ilmilione@virgilio.it'
    };
    (utils.loaders.getUserInfo as jest.Mock).mockReturnValue({
      data: userMock,
      isError: false
    });

    const { result } = renderHook(() => useUserInfo());
    const mockResult = {
      id: userMock.userId,
      name: userMock.name,
      surname: userMock.familyName,
      email: userMock.email
    };

    await waitFor(() => {
      expect(result.current).toEqual(mockResult);
    });
  });
});
