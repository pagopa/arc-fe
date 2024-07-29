import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AssistanceBackModalComponent from 'components/Modals/AssistanceBackModal';

const meta: Meta = {
  title: 'Modal',
  component: AssistanceBackModalComponent
};

export default meta;

const Template: StoryFn<{ open: boolean }> = (args) => <AssistanceBackModalComponent {...args} />;

export const AssistanceBackModal = Template.bind({});
AssistanceBackModal.args = {
  open: true
};
