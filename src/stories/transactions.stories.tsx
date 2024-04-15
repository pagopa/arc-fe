import type { Meta, StoryObj } from '@storybook/react';
import Storico from '../components/Storico/Storico';
import { dummyStoricoData } from './utils/mocks';

const meta: Meta<typeof Storico> = {
  component: Storico,
  title: 'Storico'
};

export default meta;
type StoryTabs = StoryObj<typeof Storico>;

export const StoricoTable: StoryTabs = {
  args: {
    rows: dummyStoricoData
  }
};
