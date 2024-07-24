import React from 'react';
import '@preact/signals-react/auto';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import utils from 'utils';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

const refreshToken = () => {};

utils.apiClient.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      /* This is a placeholder, in this case I think there should be an attempt to refresh the token, or if that's not possible, to redirect at login. */
      refreshToken();
    }
  }
);

utils.apiClient.instance.interceptors.response.use((response) => response);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
