import { Meta, StoryFn } from '@storybook/react';
import TransactionsList from 'components/Skeleton/TransactionsList';
import React from 'react';

const meta: Meta<typeof TransactionsList> = {
  title: 'Transaction/Skeletons',
  component: TransactionsList
};

export default meta;

const Template: StoryFn = (args) => <TransactionsList {...args} />;

export const TransactionsListSkeleton = Template.bind({});
TransactionsListSkeleton.args = {};
