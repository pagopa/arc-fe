import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { ArcErrors } from '../../routes/routes';

interface ErrorIconComponentProps {
  erroCode?: ArcErrors;
}

export const ErrorIconComponent: React.FC<ErrorIconComponentProps> = ({ erroCode }) => {
  switch (erroCode) {
    case ArcErrors['accesso-non-autorizzato']:
      return <img src="/pictograms/genericerror.svg" title="Error" aria-hidden="true" />;
    case ArcErrors['sessione-scaduta']:
      return <img src="/pictograms/expired.svg" title="Expired" aria-hidden="true" />;
    case '422':
      return <img src="/pictograms/genericerror.svg" title="Error" aria-hidden="true" />;
    default:
      return <img src="/pictograms/umbrella.svg" title="Something go wrong" aria-hidden="true" />;
  }
};

export const CourtesyPage = () => {
  const { t } = useTranslation();
  const errorDesc = useLoaderData() as keyof typeof ArcErrors;
  const errorCode = ArcErrors[errorDesc];

  return (
    <>
      <Helmet>
        <title>{`${t('pageTitles.courtesy')} - ${t('app.title')} `}</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={10}>
          <Box my={3}>
            <ErrorIconComponent erroCode={errorCode} />
          </Box>
          <Typography variant="h4" gutterBottom data-testid="courtesyPage.title">
            {t(`courtesyPage.${errorCode}.title`, {
              defaultValue: t('courtesyPage.default.title')
            })}
          </Typography>
          <Typography variant="body1" paragraph data-testid="courtesyPage.body">
            {t(`courtesyPage.${errorCode}.body`, {
              defaultValue: t('courtesyPage.default.body')
            })}
          </Typography>
          {errorCode !== ArcErrors['accesso-non-autorizzato'] && (
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              color="primary"
              data-testid="courtesyPage.cta">
              {t(`courtesyPage.${errorCode}.cta`, {
                defaultValue: t('courtesyPage.default.cta')
              })}
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};
