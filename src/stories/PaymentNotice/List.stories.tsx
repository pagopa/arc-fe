import { Meta } from '@storybook/react';
import { PaymentNotice } from 'components/PaymentNotice';
import { PaymentNoticeType } from 'models/PaymentNotice';
import React from 'react';
import { StoreProvider } from 'store/GlobalStore';
import { mockConvertedNotice } from 'stories/utils/PaymentNoticeMocks';

const meta: Meta = {
  title: 'Payment Notice',
  args: {
    paymentNotices: mockConvertedNotice
  }
};

export default meta;

export const List = {
  render: (args: { paymentNotices: PaymentNoticeType[] }) => (
    <StoreProvider>
      <PaymentNotice.List {...args} />
    </StoreProvider>
  )
};
