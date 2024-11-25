import Button from '@mui/material/Button';
import React from 'react';

export type ErrorFallbackProps = {
  message?: string;
  onReset?: () => void;
};

export const ErrorFallback = ({ message, onReset }: ErrorFallbackProps) => (
  <div>
    <div>
      <p>Ops!... something went wrong</p>
      {message && <pre className="text-default">{message}</pre>}
      {onReset && <Button onClick={onReset}>Back</Button>}
    </div>
  </div>
);
