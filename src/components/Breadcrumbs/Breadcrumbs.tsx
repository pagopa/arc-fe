import React from 'react';
import { Breadcrumbs as BreadcrumbsMUI, Link, useTheme, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = ({
  backButton,
  separator
}: {
  path: [];
  backButton: boolean;
  separator: React.Node;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  

  return (
    <BreadcrumbsMUI separator={separator}>
      {backButton && (
        <Button size="medium" startIcon={<ArrowBack />} variant="text">
          {t('general.indietro')}
        </Button>
      )}
      <Link underline="hover" color={theme.palette.text.primary} href="/">
        <b>Ricevute</b>
      </Link>
      <Link
        underline="hover"
        color={theme.palette.text.disabled}
        href="/material-ui/getting-started/installation/">
        Dettaglio ricevuta
      </Link>
    </BreadcrumbsMUI>
  );
};

export default Breadcrumbs;
