import React from 'react';
import PaymentNoticeDetail from '../components/PaymentNotice/PaymentNoticeDetail';
import utils from 'utils';

export default function PaymentNotice() {
  const paymentNoticeDetail = utils.converters.preparePaymentNoticeDetailData({
    amount: '10',
    paFullName: 'paFullName',
    subject: 'subject',
    dueDate: 'dueDate',
    iupd: 'iupd',
    paTaxCode: 'paTaxCode',
    firstInstallmentDate: 'firstInstallmentDate',
    firstInstallmentAmount: '0'
  });
  return (
    <>
      <PaymentNoticeDetail paymentNoticeDetail={paymentNoticeDetail} />
    </>
  );
}
