import type { Meta } from '@storybook/react';
import TransactionEmpty from 'components/Transactions/Empty';

const meta: Meta<typeof Empty> = {
  component: TransactionEmpty,
  title: 'Transaction'
};

export default meta;

export const Empty = {
  args: {}
};
