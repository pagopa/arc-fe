import { sessionClear } from './session';

describe('sessionClear', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should clear sessionStorage and localStorage', () => {
    // Mock the sessionStorage and localStorage
    const storageSpy = vi.spyOn(Storage.prototype, 'clear');

    sessionClear();

    // Assert that the clear methods were called
    expect(storageSpy).toHaveBeenCalled();
  });

  it('should call the onSuccess callback if provided', () => {
    // Mock the onSuccess callback
    const onSuccess = vi.fn();

    // Call the function
    sessionClear(onSuccess);

    // Assert that the onSuccess callback was called
    expect(onSuccess).toHaveBeenCalled();
  });
});
