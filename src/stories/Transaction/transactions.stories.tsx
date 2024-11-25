import type { Meta, StoryObj } from '@storybook/react';
import Transactions from 'components/Transactions/Transactions';
import { dummyTransactionsData } from 'stories/utils/mocks';

const meta: Meta<typeof Transactions> = {
  component: Transactions,
  title: 'Transaction'
};

export default meta;
type StoryTabs = StoryObj<typeof Transactions>;

export const TransactionTable: StoryTabs = {
  args: {
    rows: dummyTransactionsData.all
  }
};
