import React from 'react';
import {
  Breadcrumbs as BreadcrumbsMUI,
  Link,
  useTheme,
  Button,
  Grid,
  Box,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

export interface BreadcrumbPath {
  backButton?: boolean;
  elements: BreadcrumbElement[];
  routeName: string;
}

export interface BreadcrumbElement {
  name: string;
  fontWeight: number;
  color?: string;
  href?: string;
}

export interface CrumbObject {
  crumb: BreadcrumbPath;
}

const Breadcrumbs = ({ separator }: { separator: React.ReactElement }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matches = useMatches();
  const crumbs = (matches.find((match) => Boolean(match.handle))?.handle as CrumbObject)?.crumb;

  const show = crumbs && crumbs.elements.length > 1;

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
                variant="text">
                {t('app.routes.back')}
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item marginBlock={0.25}>
          <BreadcrumbsMUI separator={separator} aria-label={t('app.routes.breadcrumbs')}>
            {crumbs?.elements?.map((r, i) => {
              return r.href ? (
                <Link
                  key={i}
                  aria-label={t('app.routes.breadcrumbsElementClickable')}
                  href={r.href}
                  underline="none"
                  fontWeight={r.fontWeight}
                  role="link"
                  color={r.color || theme.palette.text.primary}>
                  {t(`app.routes.${r.name}`)}
                </Link>
              ) : (
                <Typography
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
