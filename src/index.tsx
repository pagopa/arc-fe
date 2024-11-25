import React from 'react';
import '@preact/signals-react/auto';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from 'store/GlobalStore';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
