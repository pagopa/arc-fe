import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BackButton, BackButtonProps } from 'components/BackButton/BackButton';

const meta: Meta<BackButtonProps> = {
  title: 'Button/BackButton',
  component: BackButton
};

export default meta;

const Template: StoryFn<BackButtonProps> = (args) => <BackButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'back'
} as BackButtonProps;

export const CustomText = Template.bind({});
CustomText.args = {
  text: 'home'
} as BackButtonProps;
