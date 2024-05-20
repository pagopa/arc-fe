import { TabsProps } from 'components/Tabs';
import { useState } from 'react';

function useTabs(initialActiveTab: TabsProps['initialActiveTab']) {
  const [activeTab, setActiveTab] = useState(initialActiveTab || 0);

  const changeActiveTab = (activeTab: number) => setActiveTab(activeTab);

  return {
    activeTab,
    changeActiveTab
  };
}

export default useTabs;
