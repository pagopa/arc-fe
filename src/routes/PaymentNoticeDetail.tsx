import React from 'react';
import { PaymentNotice } from 'components/PaymentNotice';
import { useStore } from 'store/GlobalStore';

export default function PaymentNoticeDetail() {
  const {
    state: { paymentNotice }
  } = useStore();

  return (
    <>
      <PaymentNotice.Detail paymentNotice={paymentNotice} />
    </>
  );
}
