import React from 'react';
import PaymentNoticeDetail from '../components/PaymentNotice/PaymentNoticeDetail';

export default function PaymentNotice() {
  const paymentNoticeDetail = {
    amount: 'string',
    creditorEntity: 'string',
    subject: 'string',
    due: 'string',
    noticeCode: 'string',
    entityFiscalCode: 'string',
    firstInstallmentDate: 'string',
    firstInstallmentAmount: 'string'
  };
  return (
    <>
      <PaymentNoticeDetail paymentNoticeDetail={paymentNoticeDetail} />
    </>
  );
}
