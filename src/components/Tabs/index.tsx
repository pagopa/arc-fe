import { Tabs as MuiTabs, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import TabPanel from './TabPanel';
import useTabs from 'hooks/useTabs';

interface TabProps {
  title: string;
  content: ReactElement;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabProps[];
  hideTabs?: boolean;
  ariaLabel?: string;
  /** the zero based index of the initial active Tab */
  initialActiveTab?: number;
  /** function triggered on tab change event
   * @param {number} value - the zero based index of the active Tab
   */
  onChange?: (value: number) => void;
}

export const Tabs = (props: TabsProps) => {
  const { activeTab, changeActiveTab } = useTabs(props.initialActiveTab);
  const { tabs, hideTabs = false, ariaLabel, onChange } = props;
  return tabs.length > 0 ? (
    <>
      <MuiTabs
        role="tablist"
        aria-label={ariaLabel}
        sx={{ display: hideTabs ? 'none' : 'flex' }}
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab}
        onChange={(_, value: number) => {
          onChange?.(value);
          changeActiveTab(value);
        }}>
        {tabs.map(({ title, disabled }, index) => (
          <Tab
            sx={{ maxWidth: '100vw', flexGrow: '2' }}
            role="tab"
            label={title}
            disabled={disabled}
            key={`${title}-${index}`}
          />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <TabPanel value={index} activeValue={activeTab} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  ) : null;
};

export default Tabs;
