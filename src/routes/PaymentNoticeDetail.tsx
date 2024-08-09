import React from 'react';
import { PaymentNotice } from 'components/PaymentNotice';
import { useStore } from 'store/GlobalStore';
import { Navigate, useParams } from 'react-router-dom';
import { ArcRoutes } from './routes';
import { paymentNoticeState } from 'store/PaymentNoticeStore';

export default function PaymentNoticeDetail() {
  const {
    state: { paymentNotice }
  } = useStore();

  const { id } = useParams();

  if (!paymentNotice || paymentNotice.iupd !== id) {
    paymentNoticeState.removeItem();
    return <Navigate to={ArcRoutes.PAYMENT_NOTICES} />;
  }

  return <PaymentNotice.Detail paymentNotice={paymentNotice} />;
}
