import React from 'react';
import '@preact/signals-react/auto';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from 'store/GlobalStore';
import Matomo from 'components/Matomo';
import CookieBanner from 'components/CookieBanner';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Matomo />
        <CookieBanner />
        <App />
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
