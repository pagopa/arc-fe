import storage from './storage';

describe('storage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('user.logot should clear sessionStorage and localStorage', () => {
    // Mock the sessionStorage and localStorage
    const storageSpy = vi.spyOn(Storage.prototype, 'clear');

    storage.user.logOut();

    // Assert that the clear methods were called
    expect(storageSpy).toHaveBeenCalled();
  });

  it('user.setToken and user.getToken and should set and get the accessToken item', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

    expect(storage.user.hasToken()).not.toBeTruthy();
    const token = storage.user.setToken('testToken');
    expect(setItemSpy).toHaveBeenCalled();
    expect(token).toBe('testToken');
    expect(storage.user.hasToken()).toBeTruthy();
    expect(getItemSpy).toHaveBeenCalled();
  });
});
