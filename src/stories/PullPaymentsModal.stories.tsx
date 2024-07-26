import React from 'react';
import { Meta } from '@storybook/react';
import PullPaymentsModalComponent from 'components/Modals/PullPaymentsModal';

const meta: Meta = {
  title: 'Modal/PullPayments Modal',
  component: PullPaymentsModalComponent,
  args: { open: true }
};

export default meta;

export const PullPaymentsModal = {
  render: (args: { open: boolean }) => <PullPaymentsModalComponent {...args} />
};
