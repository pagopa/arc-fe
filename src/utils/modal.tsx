import { signal } from '@preact/signals-react';

enum ModalId {
  OPTIN = 'OPTIN',
  ASSISTANCEBACK = 'ASSISTANCEBACK'
}

/** open a modal by its id */
const open = (modalId: ModalId) => {
  isOpen.value = true;
  id.value = modalId;
};

/** close a modal by its id */
const close = () => {
  isOpen.value = false;
  id.value = null;
};

const isOpen = signal<boolean>(false);
const id = signal<ModalId | null>(null);

export default {
  open,
  close,
  ModalId,
  status: {
    isOpen,
    id
  }
};
