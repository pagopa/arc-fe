import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { STATE } from './types';
import { StoreProvider, useStore } from './GlobalStore';

// Mock the external dependencies
jest.mock('./PaymentNoticeStore', () => ({
  paymentNoticeState: { value: { id: 1, debtorFullName: 'Test notice' } },
  setPaymentNotice: jest.fn()
}));

describe('StoreProvider and useStore', () => {
  const TestComponent: React.FC = () => {
    const { state, setState } = useStore();

    return (
      <div>
        <p>{state[STATE.PAYMENT_NOTICE]?.debtorFullName}</p>
        <button
          onClick={() =>
            setState(STATE.PAYMENT_NOTICE, { id: 2, debtorFullName: 'Updated notice' })
          }>
          Update Notice
        </button>
      </div>
    );
  };

  it('provides initial state from context', () => {
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    expect(screen.getByText('Test notice')).toBeInTheDocument();
  });

  it('allows state to be updated', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setPaymentNotice } = require('./PaymentNoticeStore');

    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    const button = screen.getByText('Update Notice');
    button.click();

    expect(setPaymentNotice).toHaveBeenCalledWith({ id: 2, debtorFullName: 'Updated notice' });
  });

  it('throws an error when useStore is used outside of StoreProvider', () => {
    const renderWithoutProvider = () => render(<TestComponent />);

    expect(renderWithoutProvider).toThrow('useStore must be used within a StoreProvider');
  });
});
