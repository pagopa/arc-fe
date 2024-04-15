import { Tabs as MuiTabs, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import useTabs from './useTabs';
import TabPanel from './TabPanel';

interface ITab {
  title: string;
  content: ReactElement;
  disabled?: boolean;
}

export interface ITabs {
  tabs: ITab[];
  /** the zero based index of the initial active Tab */
  initialActiveTab?: number;
}

export const Tabs = (props: ITabs) => {
  const { activeTab, changeActiveTab } = useTabs(props.initialActiveTab);
  const { tabs } = props;
  return tabs.length > 0 ? (
    <>
      <MuiTabs
        value={activeTab}
        variant="fullWidth"
        onChange={(_, value: number) => changeActiveTab(value)}>
        {tabs.map(({ title, disabled }) => (
          <Tab label={title} disabled={disabled} />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <TabPanel value={index} activeValue={activeTab}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  ) : null;
};

export default Tabs;
