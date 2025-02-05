import React from 'react';
import DetailsSkeleton from './detailsSkeleton';
import { useTranslation } from 'react-i18next';

const PaymentNoticeDetails = () => {
  const { t } = useTranslation();
  return <DetailsSkeleton title={t('app.paymentNoticeDetail.title')} />;
};
export default PaymentNoticeDetails;
