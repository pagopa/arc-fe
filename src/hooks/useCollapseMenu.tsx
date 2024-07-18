import { useEffect } from 'react';
import utils from 'utils';

function useCollapseMenu(initialCollapsedState: boolean) {
  useEffect(() => {
    utils.sidemenu.setCollapsed(initialCollapsedState);
    utils.sidemenu.setOverlay(false);
  }, []);

  const collapsed = utils.sidemenu.status.isMenuCollapsed.value;
  const overlay = utils.sidemenu.status.overlay.value;

  const changeMenuState = () => utils.sidemenu.setCollapsed(!collapsed);
  const setOverlay = (overlayActive: boolean) => utils.sidemenu.setOverlay(overlayActive);
  return {
    collapsed,
    overlay,
    setOverlay,
    changeMenuState
  };
}

export default useCollapseMenu;
