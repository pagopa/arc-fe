import { Meta } from '@storybook/react';
import PaymentNoticesList from 'components/Skeleton/PaymentNoticesList';

const meta: Meta<typeof PaymentNoticesList> = {
  title: 'Payment Notice/Skeletons'
};

export default meta;

export const List = {
  render: PaymentNoticesList
};
