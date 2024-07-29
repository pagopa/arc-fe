import { Meta } from '@storybook/react';
import { PaymentNotice } from 'components/PaymentNotice';
import { PaymentNoticeDetail } from 'models/PaymentNoticeDetail';
import React from 'react';

const mockPaymentNoticeDetail: PaymentNoticeDetail = {
  amount: '€100.00',
  paFullName: 'John Doe',
  subject: 'Invoice for Service',
  dueDate: '2024-12-31',
  iupd: '12345678901234567890',
  paTaxCode: 'ABC12345678',
  firstInstallmentDate: '2024-10-01',
  firstInstallmentAmount: '€50.00'
};

const meta: Meta = {
  title: 'Payment Notice',
  args: {
    paymentNoticeDetail: mockPaymentNoticeDetail
  }
};

export default meta;

export const Detail = {
  render: (args: { paymentNoticeDetail: PaymentNoticeDetail }) => <PaymentNotice.Detail {...args} />
};
