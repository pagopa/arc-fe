import { ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      role="button"
      aria-label={t('app.routes.back')}
      size="medium"
      startIcon={<ArrowBack />}
      variant="text"
      onClick={() => navigate(-1)}
      sx={{ marginBottom: 3 }}>
      {t('app.routes.back')}
    </Button>
  );
};
