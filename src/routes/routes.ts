import { theme } from '@pagopa/mui-italia';

export enum ArcRoutes {
  DASHBOARD = '/',
  TRANSACTION = '/transaction/:ID',
  TRANSACTIONS = '/transactions/'
}

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
  clickable: boolean;
}

const routeObjects: BreadcrumbPath[] = [
  {
    routeName: '/transactions',
    elements: [{ name: 'transactions', fontWeight: 400 }]
  },
  {
    routeName: '/transaction/:id',
    backButton: false,
    elements: [
      { name: 'transactions', fontWeight: 600, href: '/transactions' },
      { name: 'transactionDetail', fontWeight: 400, color: theme.palette.text.disabled, clickable:false }
    ]
  }
];

export const getRouteObject = (pathname: string) => {
  const path = routeObjects.find((ro) => {
    const regex = new RegExp(`^${ro.routeName.replace(/:[^\s/]+/g, '[^\\s/]+')}$`);
    return regex.test(pathname);
  });

  return path;
};
