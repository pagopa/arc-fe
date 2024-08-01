import { signal } from '@preact/signals-react';
import { PaymentNoticeType } from 'models/PaymentNotice';

export const paymentNoticeState = signal<PaymentNoticeType>();

export const setPaymentNotice = (paymentNotice: PaymentNoticeType) => {
  paymentNoticeState.value = paymentNotice;
};
