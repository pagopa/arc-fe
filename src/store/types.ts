import { CartState } from 'models/Cart';
import { PaymentNoticeType } from 'models/PaymentNotice';
import { UserMemo } from 'models/User';

export interface State {
  [STATE.PAYMENT_NOTICE]: PaymentNoticeType | undefined;
  [STATE.USER_INFO]: UserMemo | undefined;
  [STATE.CART]: CartState;
}

export interface StoreContextProps {
  state: State;
  setState: (key: keyof State, value?: unknown) => void;
}

export enum STATE {
  PAYMENT_NOTICE = 'paymentNotice',
  USER_INFO = 'userInfo',
  CART = 'cart'
}
