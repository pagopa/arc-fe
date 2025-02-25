import { signal } from '@preact/signals-react';
import { AlertProps } from '@mui/material';

/** emits a notification */
const emit = (text: string, severity: AlertProps['severity'] = 'error') => {
  isVisible.value = true;
  payload.value.text = text;
  payload.value.severity = severity;
};

/** dismiss a notification */
const dismiss = () => {
  isVisible.value = false;
};

interface notificationPayload {
  text?: string;
  severity?: AlertProps['severity'];
}

const isVisible = signal<boolean>(false);
const payload = signal<notificationPayload>({});

export default {
  emit,
  dismiss,
  status: {
    isVisible,
    payload
  }
};
