import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import utils from 'utils';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

utils.apiClient.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status)
    throw error;
  }
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
