import React from 'react';
import PaymentNoticeDetail from '../components/PaymentNotice/PaymentNoticeDetail';
import utils from 'utils';

export default function PaymentNotice() {
  const paymentNoticeDetail = utils.converters.preparePaymentNoticeDetailData({
    amount: 'string',
    creditorEntity: 'string',
    subject: 'string',
    due: 'string',
    noticeCode: 'string',
    entityFiscalCode: 'string',
    firstInstallmentDate: 'string',
    firstInstallmentAmount: 'string'
  });
  return (
    <>
      <PaymentNoticeDetail paymentNoticeDetail={paymentNoticeDetail} />
    </>
  );
}
