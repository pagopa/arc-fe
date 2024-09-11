import { sessionClear } from './session';

describe('sessionClear', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear sessionStorage and localStorage', () => {
    // Mock the sessionStorage and localStorage
    const storageSpy = jest.spyOn(Storage.prototype, 'clear');

    sessionClear();

    // Assert that the clear methods were called
    expect(storageSpy).toHaveBeenCalled();
  });

  it('should call the onSuccess callback if provided', () => {
    // Mock the onSuccess callback
    const onSuccess = jest.fn();

    // Call the function
    sessionClear(onSuccess);

    // Assert that the onSuccess callback was called
    expect(onSuccess).toHaveBeenCalled();
  });
});
