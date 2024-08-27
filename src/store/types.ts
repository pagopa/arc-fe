import { PaymentNoticeType } from 'models/PaymentNotice';
import { UserInfo } from '../../generated/apiClient';

export interface State {
  [STATE.PAYMENT_NOTICE]: PaymentNoticeType | undefined;
  [STATE.USER_INFO]: UserInfo | undefined;
}

export interface StoreContextProps {
  state: State;
  setState: (key: keyof State, value: unknown) => void;
}

export enum STATE {
  PAYMENT_NOTICE = 'paymentNotice',
  USER_INFO = 'userInfo'
}
