import type { Meta, StoryObj } from '@storybook/react';
import Retry from 'components/Transactions/Retry';

const meta: Meta<typeof Retry> = {
  component: Retry,
  title: 'Transaction'
};

export default meta;
type StoryRetry = StoryObj<typeof Retry>;

export const TransactionRetry: StoryRetry = {
  args: {}
};
