import type { Meta } from '@storybook/react';
import BreadcrumbsComponent from 'components/Breadcrumbs/Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components'
};

export default meta;

export const Breadcrumbs = {
  render: BreadcrumbsComponent,
  args: {
    crumbs: {
      elements: [
        { name: 'transactions', fontWeight: 222 },
        { name: 'string', fontWeight: 222 }
      ],
      routeName: 'routeName'
    }
  }
};
