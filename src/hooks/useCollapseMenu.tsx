import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function useCollapseMenu(initialCollapsedState: boolean) {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedState);
  const theme = useTheme();
  const isBelowLg = useMediaQuery(theme.breakpoints.down('lg'));
  const [wasBelowLg, setWasBelowLg] = useState(isBelowLg);

  const toggleCollapsed = () => setCollapsed(!collapsed);

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
    setCollapsed,
    toggleCollapsed
  };
}

export default useCollapseMenu;
