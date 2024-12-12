import React from 'react';
import { PaymentNotice } from 'components/PaymentNotice';
import { useStore } from 'store/GlobalStore';
import { Navigate, useParams } from 'react-router-dom';
import { ArcRoutes } from '../routes';
import { paymentNoticeState } from 'store/PaymentNoticeStore';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function PaymentNoticeDetail() {
  const {
    state: { paymentNotice }
  } = useStore();

  const { t } = useTranslation();

  const { id } = useParams();

  if (!paymentNotice || paymentNotice.iupd !== id) {
    paymentNoticeState.removeItem();
    return <Navigate to={ArcRoutes.PAYMENT_NOTICES} />;
  }

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.paymentnotice')} - ${t('app.title')} `}</title>
      </Helmet>
      <PaymentNotice.Detail paymentNotice={paymentNotice} />
    </>
  );
}
