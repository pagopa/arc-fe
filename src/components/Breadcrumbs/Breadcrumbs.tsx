import React from 'react';
import {
  Breadcrumbs as BreadcrumbsMUI,
  useTheme,
  Typography,
  useMediaQuery,
  Stack
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { BreadcrumbElement, BreadcrumbPath } from 'models/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

export type BreadcrumbsProps = {
  separator: React.ReactElement;
  crumbs: BreadcrumbPath;
};

const Breadcrumbs = ({ separator, crumbs }: BreadcrumbsProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const BackButton = () => (
    <Typography
      onClick={() => navigate(-1)}
      role="link"
      sx={{ cursor: 'pointer' }}
      aria-label={t('app.routes.back')}>
      <ArrowBack fontSize="small" color="inherit" />
    </Typography>
  );

  const Breadcrumb = ({ crumb }: { crumb: BreadcrumbElement }) =>
    crumb?.href ? (
      <Typography
        onClick={() => navigate(crumb.href as ArcRoutes)}
        aria-label={t('app.routes.breadcrumbsElementClickable')}
        fontWeight={crumb?.fontWeight}
        role="link"
        sx={{ cursor: 'pointer' }}
        color={crumb.color || theme.palette.text.primary}>
        {t(`app.routes.${crumb.name}`)}
      </Typography>
    ) : (
      <Typography
        alignItems="center"
        aria-label={t('app.routes.breadcrumbsElement')}
        aria-current="page"
        fontWeight={crumb?.fontWeight}
        color={crumb?.color || theme.palette.text.primary}>
        {t(`app.routes.${crumb.name}`)}
      </Typography>
    );

  return (
    crumbs?.elements &&
    crumbs?.elements?.length > 1 && (
      <Stack direction="row" marginBottom={3} alignItems="center">
        {!mdUp && <BackButton />}
        <BreadcrumbsMUI
          separator={separator}
          aria-label={t('app.routes.breadcrumbs')}
          sx={{ paddingBlock: 1, marginBottom: 1 }}>
          {mdUp ? (
            crumbs.elements.map((r, i) => <Breadcrumb crumb={r} key={i} />)
          ) : (
            <Breadcrumb crumb={crumbs.elements[0]} />
          )}
        </BreadcrumbsMUI>
      </Stack>
    )
  );
};

export default Breadcrumbs;
