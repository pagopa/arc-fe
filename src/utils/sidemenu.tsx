import { signal } from '@preact/signals-react';

const changeMenuState = () => {
  isMenuCollapsed.value = !isMenuCollapsed.value;
};
const setCollapsed = (isCollapsed: boolean) => {
  isMenuCollapsed.value = isCollapsed;
};

const setOverlay = (overlayActive: boolean) => {
  overlay.value = overlayActive;
};

const isMenuCollapsed = signal<boolean>(false);
const overlay = signal<boolean>(false);

export default {
  changeMenuState,
  setCollapsed,
  setOverlay,
  status: {
    isMenuCollapsed,
    overlay
  }
};
