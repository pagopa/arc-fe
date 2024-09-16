import React from 'react';
import '@testing-library/vi-dom';
import { render, screen } from '@testing-library/react';
import { STATE } from './types';
import { StoreProvider, useStore } from './GlobalStore';

vi.mock('@preact/signals-react', () => ({
  signal: vi.fn(),
  effect: vi.fn()
}));

// Mock the external dependencies
vi.mock('./PaymentNoticeStore', () => ({
  paymentNoticeState: { state: { value: { id: 1, debtorFullName: 'Test notice' } } },
  setPaymentNotice: vi.fn()
}));
vi.mock('./UserInfoStore.ts', () => ({
  userInfoState: { state: { value: { name: 'John' } } },
  setUserInfo: vi.fn()
}));

describe('StoreProvider and useStore', () => {
  const TestNoticeComponent: React.FC = () => {
    const { state, setState } = useStore();

    return (
      <div>
        <p>{state.paymentNotice?.debtorFullName}</p>
        <button
          onClick={() =>
            setState(STATE.PAYMENT_NOTICE, { id: 2, debtorFullName: 'Updated notice' })
          }>
          Update Notice
        </button>
      </div>
    );
  };

  const TestUserInfoComponent: React.FC = () => {
    const { state, setState } = useStore();

    return (
      <div>
        <p>{state.userInfo?.name}</p>
        <button onClick={() => setState(STATE.USER_INFO, { name: 'John' })}>Update User</button>
      </div>
    );
  };

  it('provides initial state from context', () => {
    render(
      <StoreProvider>
        <TestNoticeComponent />
      </StoreProvider>
    );

    expect(screen.getByText('Test notice')).toBeInTheDocument();
  });

  it('allows notice state to be updated', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setPaymentNotice } = require('./PaymentNoticeStore');

    render(
      <StoreProvider>
        <TestNoticeComponent />
      </StoreProvider>
    );

    const button = screen.getByText('Update Notice');
    button.click();

    expect(setPaymentNotice).toHaveBeenCalledWith({ id: 2, debtorFullName: 'Updated notice' });
  });

  it('allows user info state to be updated', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setUserInfo } = require('./UserInfoStore');

    render(
      <StoreProvider>
        <TestUserInfoComponent />
      </StoreProvider>
    );

    const button = screen.getByText('Update User');
    button.click();

    expect(setUserInfo).toHaveBeenCalledWith({ name: 'John' });
  });

  it('throws an error when useStore is used outside of StoreProvider', () => {
    const renderWithoutProvider = () => render(<TestNoticeComponent />);

    expect(renderWithoutProvider).toThrow('useStore must be used within a StoreProvider');
  });
});
