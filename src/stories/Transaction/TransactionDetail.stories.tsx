import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import TransactionDetailComponent from 'components/Transactions/TransactionDetail';
import { type TransactionDetail } from 'models/NoticeDetail';
import { dummyTransactionsData } from 'stories/utils/mocks';

const meta: Meta = {
  component: TransactionDetailComponent,
  title: 'Transaction/TransactionDetail'
};

export default meta;

const Template: StoryFn<{ transactionData: TransactionDetail }> = (args) => (
  <TransactionDetailComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  transactionData: dummyTransactionsData.transactionDetail
};

export const Short = Template.bind({});
Short.args = {
  transactionData: dummyTransactionsData.shortTransactionData
};
