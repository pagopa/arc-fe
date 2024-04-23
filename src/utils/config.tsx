import * as React from 'react';
import { ProductEntity, RootLinkType, UserAction } from '@pagopa/mui-italia';
/* Icons */
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

type Config = {
  product: ProductEntity;
  pagopaLink: RootLinkType;
  userActions: UserAction[];
};

const product: ProductEntity = {
  id: '0',
  title: `Area Riservata Cittadini`,
  productUrl: '#area-riservata-cittadini',
  linkType: 'external'
};

const pagopaLink: RootLinkType = {
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.'
};

const userActions: UserAction[] = [
  {
    id: 'profile',
    label: 'I tuoi dati',
    onClick: () => {
      console.log('Clicked/Tapped on Profile');
    },
    icon: <SettingsIcon fontSize="small" color="inherit" />
  },
  {
    id: 'logout',
    label: 'Esci',
    onClick: () => {
      console.log('User logged out');
    },
    icon: <LogoutRoundedIcon fontSize="small" color="inherit" />
  }
];

const config: Config = {
  product,
  pagopaLink,
  userActions
};

export default config;
