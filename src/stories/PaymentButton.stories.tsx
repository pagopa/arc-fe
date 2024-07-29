import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PaymentButtonComponent from 'components/PaymentButton';

const meta: Meta = {
  title: 'Button/PaymentButton',
  component: PaymentButtonComponent
};

export default meta;

const Template: StoryFn = (args) => <PaymentButtonComponent {...args} />;

export const PaymentButton = Template.bind({});
PaymentButton.args = {};
