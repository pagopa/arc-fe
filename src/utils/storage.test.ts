import storage from './storage';

describe('storage.user.logOut', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should clear sessionStorage and localStorage', () => {
    // Mock the sessionStorage and localStorage
    const storageSpy = vi.spyOn(Storage.prototype, 'clear');

    storage.user.logOut();

    // Assert that the clear methods were called
    expect(storageSpy).toHaveBeenCalled();
  });
});
