import { usePersistentSignal } from '../hooks/usePersistentSignal';
import { PaymentNoticeType } from 'models/PaymentNotice';
import { STATE } from './types';

// Initialize the persistent store
export const paymentNoticeState = usePersistentSignal<PaymentNoticeType | undefined>(
  STATE.PAYMENT_NOTICE
);

// Function to update the payment notice
export function setPaymentNotice(notice: PaymentNoticeType | undefined) {
  paymentNoticeState.state.value = notice;
}
