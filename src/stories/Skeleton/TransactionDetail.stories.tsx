import { Meta, StoryFn } from '@storybook/react';
import TransactionDetails from 'components/Skeleton/TransactionDetails';
import React from 'react';

const meta: Meta<typeof TransactionDetails> = {
  title: 'Transaction/Skeletons',
  component: TransactionDetails
};

export default meta;

const Template: StoryFn = (args) => <TransactionDetails {...args} />;

export const TransactionDetailsSkeleton = Template.bind({});
TransactionDetailsSkeleton.args = {};
