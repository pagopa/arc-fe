import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const CourtesyPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('errorcode') || 'default';

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom data-testid="courtesyPage.title">
          {t(`courtesyPage.${errorMessage}.title`, {
            defaultValue: t('courtesyPage.default.title')
          })}
        </Typography>
        <Typography variant="body1" paragraph data-testid="courtesyPage.body">
          {t(`courtesyPage.${errorMessage}.body`, { defaultValue: t('courtesyPage.default.body') })}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          data-testid="courtesyPage.cta">
          {t(`courtesyPage.${errorMessage}.cta`, { defaultValue: t('courtesyPage.default.cta') })}
        </Button>
      </Box>
    </Container>
  );
};
