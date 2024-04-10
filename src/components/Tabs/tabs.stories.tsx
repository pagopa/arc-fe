import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';
import Storico from '../Storico/Storico';
import { IStoricoItem } from '../Storico/StoricoItem';

const dummyStoricoData: IStoricoItem[] = [
  {
    ente: "Comune di Milano",
    id: "123456",
    date: "12/12/2024",
    status: "pagato",
    amount: "123,50 $"
  },
  {
    ente: "Comune di Milano",
    id: "123456",
    date: "12/12/2024",
    status: "pagato",
    amount: "123,50 $"
  },
  {
    ente: "Comune di Milano",
    id: "123456",
    date: "12/12/2024",
    status: "pagato",
    amount: "123,50 $"
  },
  {
    ente: "Comune di Milano",
    id: "123456",
    date: "12/12/2024",
    status: "pagato",
    amount: "123,50 $"
  }
]


const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Tabs'
};

export default meta;
type StoryTabs = StoryObj<typeof Tabs>;

export const BasicTabsExample: StoryTabs = {
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

export const TransactionsTabs: StoryTabs = {
  args: {
    initialActiveTab: 1,
    tabListArialabel: "Transactions table tabs",
    tabs: [
      {
        title: "Tutte", content: <Storico rows={dummyStoricoData} />,
      },
      {
        title: "Pagate da me", content: <Storico rows={dummyStoricoData} />,
      },
      {
        title: "instestate a me", content: <Storico rows={dummyStoricoData} />,
      }
    ]
  }
};
