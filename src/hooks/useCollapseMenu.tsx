import { useState } from 'react';

function useCollapseMenu(initialCollapsedState: boolean) {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedState);

  const changeMenuState = (collapsed: boolean) => setCollapsed(!collapsed);
  return {
    collapsed,
    changeMenuState
  };
}

export default useCollapseMenu;
