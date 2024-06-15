import type { Meta, StoryObj } from '@storybook/react';
import { PaymentNotice } from 'components/PaymentNotice';

const meta: Meta<typeof PaymentNotice.Preview> = {
  title: 'PaymentNotice',
  parameters: {
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#f5f5f5' },
        { name: 'black', value: 'black' }
      ]
    }
  }
};

export default meta;
type StoryTabs = StoryObj<typeof PaymentNotice.Preview>;

export const Preview: StoryTabs = {
  render: PaymentNotice.Preview
};
