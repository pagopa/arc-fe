import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaymentNotice } from 'components/PaymentNotice';
import { StoreProvider } from 'store/GlobalStore';
import { mockNotice } from 'stories/utils/PaymentNoticeMocks';

const meta: Meta<typeof PaymentNotice.Preview> = {
  title: 'Payment Notice/Cards',
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

type StoryCard = StoryObj<typeof PaymentNotice.Card>;
export const CardSinglePayment: StoryCard = {
  render: (args) => (
    <StoreProvider>
      <PaymentNotice.Card {...args} />
    </StoreProvider>
  ),
  args: mockNotice
};

type StoryPreview = StoryObj<typeof PaymentNotice.Preview>;
export const Preview: StoryPreview = {
  render: PaymentNotice.Preview,
  args: {}
};

export const CardEmpty = {
  render: PaymentNotice.Empty
};

export const Error = {
  render: PaymentNotice.Error
};

export const Info = {
  render: PaymentNotice.Info
};
