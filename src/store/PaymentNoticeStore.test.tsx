import { describe, it, expect, vi } from 'vitest';
import { PaymentNoticeType } from 'models/PaymentNotice';
import { setPaymentNotice, paymentNoticeState } from './PaymentNoticeStore';

// Mock the usePersistentSignal hook
vi.mock('hooks/usePersistentSignal', () => ({
  usePersistentSignal: vi.fn(() => ({
    state: { value: undefined }
  }))
}));

describe('setPaymentNotice', () => {
  it('should update the payment notice state', () => {
    const mockNotice: PaymentNoticeType = {
      iupd: '1',
      debtorFullName: 'Test notice'
    } as unknown as PaymentNoticeType;

    // Call the function
    setPaymentNotice(mockNotice);

    // Assert that the state is updated correctly
    expect(paymentNoticeState.state.value).toBe(mockNotice);
  });

  it('should set the payment notice state to undefined', () => {
    // Call the function with undefined
    setPaymentNotice(undefined);

    // Assert that the state is updated to undefined
    expect(paymentNoticeState.state.value).toBeUndefined();
  });
});
