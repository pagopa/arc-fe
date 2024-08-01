import React, { createContext, useContext, ReactNode } from 'react';
import { paymentNoticeState, setPaymentNotice } from './PaymentNoticeStore';
import { PaymentNoticeType } from 'models/PaymentNotice';

interface State {
  [STATE.PAYMENT_NOTICE]: PaymentNoticeType | undefined;
}

interface StoreContextProps {
  state: State;
  setState: (key: keyof State, value: unknown) => void;
}

export enum STATE {
  PAYMENT_NOTICE = 'paymentNotice'
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const combinedState: State = {
    [STATE.PAYMENT_NOTICE]: paymentNoticeState.value
  };

  const setState = (key: STATE, value: unknown) => {
    if (key === STATE.PAYMENT_NOTICE) {
      setPaymentNotice(value as PaymentNoticeType);
    }
  };

  return (
    <StoreContext.Provider value={{ state: combinedState, setState }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
