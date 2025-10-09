import React from 'react';
import { Alert, Box, Container, Snackbar, Stack, Theme, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { NavigateNext } from '@mui/icons-material';
import { Outlet, useMatches } from 'react-router-dom';
import { RouteHandleObject } from 'models/Breadcrumbs';
import { Header } from './Header';
import { BackButton } from './BackButton';
import { ArcRoutes } from 'routes/routes';
import { ModalSystem } from './Modals';
import utils from 'utils';
import { useStore } from 'store/GlobalStore';
import { CartDrawer } from './Cart/CartDrawer';
import PaymentTypeDrawer from './Spontanei/PaymentTypeDrawer';

const defaultRouteHandle: RouteHandleObject = {
  sidebar: { visible: true },
  crumbs: { routeName: '', elements: [] },
  backButton: false
};

export function Layout() {
  const matches = useMatches();
  const {
    state: { cart, paymentTypeDrawerVisibilityStatus }
  } = useStore();

  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const overlay = utils.sidemenu.status.overlay.value;
  const modalOpen = utils.modal.status.isOpen.value;

  document.body.style.overflow = modalOpen || cart.isOpen || overlay ? 'hidden' : 'auto';

  const { crumbs, sidebar, backButton, backButtonText, backButtonFunction } = {
    ...defaultRouteHandle,
    ...(matches.find((match) => Boolean(match.handle))?.handle || {})
  } as RouteHandleObject;

  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={utils.notify.dismiss}
        open={utils.notify.status.isVisible.value}>
        <Alert severity={utils.notify.status.payload.value?.severity} variant="outlined">
          {utils.notify.status.payload.value?.text}
        </Alert>
      </Snackbar>
      <ModalSystem />
      <Container maxWidth={false} disableGutters>
        <Header onAssistanceClick={() => window.open(ArcRoutes.ASSISTANCE, '_blank')} />
        <Stack direction={lg ? 'row' : 'column'} bgcolor={grey['100']}>
          {sidebar?.visible ? <Sidebar /> : null}

          <Box padding={3} width={'100%'} component="main">
            {backButton && <BackButton onClick={backButtonFunction} text={backButtonText} />}
            {crumbs && (
              <Breadcrumbs crumbs={crumbs} separator={<NavigateNext fontSize="small" />} />
            )}
            <Outlet />
          </Box>
        </Stack>
        <Footer />
        {cart.isOpen ? <CartDrawer /> : null}
        {paymentTypeDrawerVisibilityStatus ? <PaymentTypeDrawer /> : null}
      </Container>
    </>
  );
}
