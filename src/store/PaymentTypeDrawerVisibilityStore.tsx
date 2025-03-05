import { signal } from '@preact/signals-react';

export const paymentTypeDrawerVisibilityStore = signal<boolean>(false);

export function togglePaymentTypeDrawerVisibility() {
  paymentTypeDrawerVisibilityStore.value = !paymentTypeDrawerVisibilityStore.value;
}
