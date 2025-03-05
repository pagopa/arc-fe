import React, { createContext, useContext, ReactNode } from 'react';
import { STATE, State, StoreContextProps } from './types';
import { userInfoState } from './UserInfoStore';
import { cartState } from './CartStore';
import { paymentTypeDrawerVisibilityStore } from './PaymentTypeDrawerVisibilityStore';

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const combinedState: State = {
    [STATE.USER_INFO]: userInfoState.state?.value,
    [STATE.CART]: cartState.value,
    [STATE.PAYMENT_TYPE_DRAWER_VISIBILITY_STATUS]: paymentTypeDrawerVisibilityStore.value
  };

  const setState = () => undefined;

  return (
    <StoreContext.Provider value={{ state: combinedState, setState }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
