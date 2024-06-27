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
type StoryPreview = StoryObj<typeof PaymentNotice.Preview>;
type StoryCard = StoryObj<typeof PaymentNotice.Card>;

export const Preview: StoryPreview = {
  render: PaymentNotice.Preview
};

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
