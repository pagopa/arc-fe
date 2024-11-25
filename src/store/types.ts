import { PaymentNoticeType } from 'models/PaymentNotice';
import { UserMemo } from 'models/User';

export interface State {
  [STATE.PAYMENT_NOTICE]: PaymentNoticeType | undefined;
  [STATE.USER_INFO]: UserMemo | undefined;
}

export interface StoreContextProps {
  state: State;
  setState: (key: keyof State, value: unknown) => void;
}

export enum STATE {
  PAYMENT_NOTICE = 'paymentNotice',
  USER_INFO = 'userInfo'
}
