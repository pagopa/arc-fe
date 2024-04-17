import { useState } from 'react';
import { ITabs } from '.';

function useTabs(initialActiveTab: ITabs['initialActiveTab']) {
  const [activeTab, setActiveTab] = useState(initialActiveTab || 0);

  const changeActiveTab = (activeTab: number) => setActiveTab(activeTab);

  return {
    activeTab,
    changeActiveTab
  };
}

export default useTabs;
