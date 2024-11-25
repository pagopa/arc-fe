import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from './Alert';

const IOAlert = () => {
  const { t } = useTranslation();

  return (
    <Alert
      message={t('app.dashboard.IOAlert.title')}
      action={{ message: t('app.dashboard.IOAlert.cta'), href: '' }}
    />
  );
};

export default IOAlert;
