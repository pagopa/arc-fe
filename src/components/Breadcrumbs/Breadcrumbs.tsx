import React from 'react';
import { Breadcrumbs as BreadcrumbsMUI, Link, useTheme, Button, Grid, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { BreadcrumbPath } from '../../routes/routes';
const Breadcrumbs = ({
  separator,
  path
}: {
  path?: BreadcrumbPath;
  separator: React.ReactElement;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const show = path && path.elements.length > 1;

  return (
    show && (
      <Grid container maxHeight={40}>
        {path.backButton && (
          <Grid item>
            <Box>
              <Button size="medium" startIcon={<ArrowBack />} variant="text">
                {t('app.routes.back')}
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item marginBlock={0.25}>
          <BreadcrumbsMUI separator={separator}>
            {path?.elements?.map((r) => {
              return (
                <Link
                  href={r.href || "/#"}
                  underline="none"
                  fontWeight={r.fontWeight}
                  color={r.color || theme.palette.text.primary}>
                  {t(`app.routes.${r.name}`)}
                </Link>
              );
            })}
          </BreadcrumbsMUI>
        </Grid>
      </Grid>
    )
  );
};

export default Breadcrumbs;
