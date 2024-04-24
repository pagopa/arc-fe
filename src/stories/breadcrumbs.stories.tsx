import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Breadcrumbs'
};

export default meta;
type StoryBreadcrumbs = StoryObj<typeof Breadcrumbs>;

export const BreadcrumbsStory: StoryBreadcrumbs = {
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
