import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import utils from 'utils';

function useCollapseMenu(initialCollapsedState: boolean) {
  useEffect(() => {
    utils.sidemenu.setCollapsed(initialCollapsedState);
    utils.sidemenu.setOverlay(false);
  }, []);
  const theme = utils.style.theme;

  const isBelowLg = useMediaQuery(theme.breakpoints.down('lg'));
  const [wasBelowLg, setWasBelowLg] = useState(isBelowLg);

  const collapsed = utils.sidemenu.status.isMenuCollapsed.value;
  const overlay = utils.sidemenu.status.overlay.value;

  const changeMenuState = () => utils.sidemenu.setCollapsed(!collapsed);
  const setCollapsed = (value: boolean) => utils.sidemenu.setCollapsed(value);
  const setOverlay = (overlayActive: boolean) => utils.sidemenu.setOverlay(overlayActive);

  useEffect(() => {
    if (isBelowLg && !wasBelowLg) {
      setCollapsed(true);
    } else if (!isBelowLg && wasBelowLg) {
      setCollapsed(false);
    }
    setWasBelowLg(isBelowLg);
  }, [isBelowLg]);

  return {
    collapsed,
    overlay,
    setOverlay,
    setCollapsed,
    changeMenuState
  };
}

export default useCollapseMenu;
