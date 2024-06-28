import React from 'react';
import utils from 'utils';
import { PaymentNotice } from 'components/PaymentNotice';

export default function PaymentNoticeDetail() {
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
      <PaymentNotice.Detail paymentNoticeDetail={paymentNoticeDetail} />
    </>
  );
}
