import type { Meta, StoryObj } from '@storybook/react';

import Storico from './Storico';
import { IStoricoItem } from './StoricoItem';

const meta: Meta<typeof Storico> = {
  component: Storico,
  title: 'Storico'
};

export default meta;
type StoryTabs = StoryObj<typeof Storico>;

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

export const StoricoTable: StoryTabs = {
  args: {
    rows: dummyStoricoData
  }
};
