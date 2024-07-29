import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '../components/Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Layout/Sidebar'
};

export default meta;
type StorySidebar = StoryObj<typeof Sidebar>;

export const ExampleSidebar: StorySidebar = {
  args: {
    collapsed: false
  }
};
