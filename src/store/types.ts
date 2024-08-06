import { PaymentNoticeType } from 'models/PaymentNotice';

export interface State {
  [STATE.PAYMENT_NOTICE]: PaymentNoticeType | undefined;
}

export interface StoreContextProps {
  state: State;
  setState: (key: keyof State, value: unknown) => void;
}

export enum STATE {
  PAYMENT_NOTICE = 'paymentNotice'
}
