import type { Meta, StoryObj } from '@storybook/react';
import Alert from '../components/Alerts/IOAlert';

const meta: Meta<typeof Alert> = {
  title: 'Components'
};

export default meta;
type StoryAlert = StoryObj<typeof Alert>;

export const IOAlert: StoryAlert = {
  render: Alert
};
