import { Meta } from '@storybook/react';
import { PaymentNotice } from 'components/PaymentNotice';
import { PaymentNotices } from 'components/PaymentNotice/List';
import React from 'react';

// Define mock data
const mockPaymentNoticesList: PaymentNotices[] = [
  {
    id: '1',
    payee: {
      name: 'Company A',
      altImg: 'Company A Logo'
    },
    paymentInfo: 'Payment for Service A',
    amount: '€150.00',
    expiringDate: '2024-09-30'
  },
  {
    id: '2',
    payee: {
      name: 'Company B',
      altImg: 'Company B Logo'
    },
    paymentInfo: 'Payment for Service B',
    amount: '€200.00',
    expiringDate: '2024-10-15'
  }
];

const meta: Meta = {
  title: 'Payment Notice',
  args: {
    paymentNoticesList: mockPaymentNoticesList
  }
};

export default meta;

export const List = {
  render: (args: { paymentNoticesList: PaymentNotices[] }) => <PaymentNotice.List {...args} />
};
