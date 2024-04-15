import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import useTabs from './useTabs';

interface ITab {
  title: string;
  content: ReactElement;
  disabled?: boolean;
}

export interface ITabs {
  tabs: ITab[];
  /** the zero based index of the initial active Tab */
  initialActiveTab?: number;
  tabListArialabel?: string;
}

export const Tabs = (props: ITabs) => {
  const { activeTab, changeActiveTab } = useTabs(props.initialActiveTab);
  const { tabs, tabListArialabel = '' } = props;
  return tabs.length > 0 ? (
    <TabContext value={activeTab}>
      {tabs.length > 1 ? (
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: tabs.length === 1 ? 'hidden' : 'unset'
          }}>
          <TabList
            aria-label={tabListArialabel}
            onChange={(_, value: number) => changeActiveTab(value)}>
            {tabs.map(({ title, disabled }) => (
              <Tab label={title} disabled={disabled} />
            ))}
          </TabList>
        </Box>
      ) : null}
      {tabs.map((tab, index) => (
        // eslint-disable-next-line
        //@ts-ignore
        <TabPanel value={index}>{tab.content}</TabPanel>
      ))}
    </TabContext>
  ) : null;
};

export default Tabs;
