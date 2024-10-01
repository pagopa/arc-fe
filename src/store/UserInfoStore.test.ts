import { UserMemo } from 'models/User';
import { vi } from 'vitest';
import { setUserInfo, userInfoState } from './UserInfoStore';

// Mock sessionStorage
beforeEach(() => {
  vi.spyOn(window.sessionStorage, 'setItem');
  vi.spyOn(window.sessionStorage, 'getItem').mockReturnValue(null); // Initially sessionStorage returns null
});

afterEach(() => {
  vi.clearAllMocks(); // Clear mocks after each test to avoid test interference
});

// Mock usePersistentSignal
vi.mock('hooks/usePersistentSignal', () => ({
  usePersistentSignal: vi.fn().mockImplementation(() => ({
    state: {
      value: undefined
    }
  }))
}));

describe('setUserInfo', () => {
  it('should set user info in persistent state', () => {
    const user: UserMemo = { id: '123', name: 'John Doe' } as unknown as UserMemo;

    setUserInfo(user);

    // Check that userInfoState state value is updated
    expect(userInfoState.state.value).toEqual(user);
  });

  it('should reset user info to undefined', () => {
    setUserInfo(undefined);

    // Check that userInfoState state value is reset
    expect(userInfoState.state.value).toBeUndefined();
  });
});
