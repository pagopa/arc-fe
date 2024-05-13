import React from 'react';
import {
  Breadcrumbs as BreadcrumbsMUI,
  useTheme,
  Button,
  Grid,
  Box,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { BreadcrumbPath } from 'models/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

const Breadcrumbs = ({
  separator,
  crumbs
}: {
  separator: React.ReactElement;
  crumbs: BreadcrumbPath;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const show = crumbs.backButton || (crumbs.elements && crumbs.elements.length > 1);

  return (
    show && (
      <Grid container maxHeight={40} mb={3}>
        {crumbs.backButton && (
          <Grid item>
            <Box>
              <Button
                role="button"
                aria-label={t('app.routes.back')}
                size="medium"
                startIcon={<ArrowBack />}
                variant="text"
                onClick={() => navigate(-1)}
                sx={{ paddingRight: 3 }}>
                {t('app.routes.back')}
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item marginBlock={0.25}>
          <BreadcrumbsMUI separator={separator} aria-label={t('app.routes.breadcrumbs')}>
            {crumbs?.elements?.map((r, i) => {
              return r?.href ? (
                <Typography
                  key={i}
                  onClick={() => navigate(r.href as ArcRoutes)}
                  aria-label={t('app.routes.breadcrumbsElementClickable')}
                  fontWeight={r.fontWeight}
                  role="link"
                  sx={{ cursor: 'pointer' }}
                  color={r.color || theme.palette.text.primary}>
                  {t(`app.routes.${r.name}`)}
                </Typography>
              ) : (
                <Typography
                  key={i}
                  aria-label={t('app.routes.breadcrumbsElement')}
                  aria-current="page"
                  fontWeight={r.fontWeight}
                  color={r.color || theme.palette.text.primary}>
                  {t(`app.routes.${r.name}`)}
                </Typography>
              );
            })}
          </BreadcrumbsMUI>
        </Grid>
      </Grid>
    )
  );
};

export default Breadcrumbs;
