import React from 'react';
import { Container, Grid, useTheme } from '@mui/material';
import utils from 'utils';
import { HeaderAccount } from '@pagopa/mui-italia';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export function PreLoginLayout({ children }: { children: ReactJSXElement }) {
  const ASSISTANCE_MAIL = utils.config.assistanceLink;
  const onAssistanceClick = () => {
    window.open(`mailto:${ASSISTANCE_MAIL}`);
  };
  const theme = useTheme();

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: 'flex',
          height: '100%',
          minHeight: '100vh',
          alignItems: 'baseline',
          bgcolor: theme.palette.background.default
        }}>
        <Grid
          container
          height={'100%'}
          minHeight="100vh"
          flexDirection="column"
          flexWrap={'nowrap'}>
          <Grid flexBasis={{ xs: 'fit-content' }} item xs={12} height="fit-content">
            <HeaderAccount
              rootLink={utils.config.pagopaLink}
              onAssistanceClick={onAssistanceClick}
              enableLogin={false}
            />
          </Grid>
          {children}
        </Grid>
      </Container>
    </>
  );
}
