import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Tabs'
};

export default meta;
type StoryTabs = StoryObj<typeof Tabs>;

export const BasicStory: StoryTabs = {
  args: {
    initialActiveTab: 1,
    tabListArialabel: "storybook example usage of Tabs component",
    tabs: [
      {
      title: "Tab one", content: "Tab one content",
      },
      {
        title: "Tab two", content: "Tab two content",
      },
      {
        title: "Tab three", content: "Tab three content",
        disabled: true
      }
    ]
  }
};
