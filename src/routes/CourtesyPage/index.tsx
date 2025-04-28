import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { ArcErrors, ArcRoutes } from '../../routes/routes';
import i18next from 'i18next';

interface ErrorIconComponentProps {
  erroCode?: ArcErrors;
}

export const ErrorIconComponent: React.FC<ErrorIconComponentProps> = ({ erroCode }) => {
  switch (erroCode) {
    case ArcErrors['accesso-non-autorizzato']:
    case ArcErrors['avviso-non-pagabile']:
      return <img src="/pictograms/genericerror.svg" title="Error" aria-hidden="true" />;
    case ArcErrors['sessione-scaduta']:
      return <img src="/pictograms/expired.svg" title="Expired" aria-hidden="true" />;
    case ArcErrors['avvio-pagamento']:
    case ArcErrors['sconosciuto']:
      return <img src="/pictograms/umbrella.svg" title="Something went wrong" aria-hidden="true" />;
    default:
      return <img src="/pictograms/umbrella.svg" title="Something went wrong" aria-hidden="true" />;
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
          {/* v8 ignore next 12 */}
          {i18next.exists(`courtesyPage.${errorCode}.cta`) && (
            <Button
              component={Link}
              to={ArcRoutes.LOGIN}
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
