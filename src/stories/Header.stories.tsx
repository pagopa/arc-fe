import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Header as HeaderComponent, HeaderProps } from 'components/Header';

const meta: Meta<HeaderProps> = {
  title: 'Layout',
  component: HeaderComponent
};

export default meta;

const Template: StoryFn<HeaderProps> = (args) => <HeaderComponent {...args} />;

export const Header = Template.bind({});
Header.args = {
  onAssistanceClick: () => alert('Assistance clicked!')
};
