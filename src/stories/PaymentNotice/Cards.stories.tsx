import type { Meta, StoryObj } from '@storybook/react';
import { PaymentNotice } from 'components/PaymentNotice';

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
  render: PaymentNotice.Card,
  args: {
    payee: {
      name: 'Politecnico di Milano'
    },
    paymentInfo: 'RATA 1 - Anno Accademico 2023/2024',
    amount: '171,00 €',
    expiringDate: '31/01/2099'
  }
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
