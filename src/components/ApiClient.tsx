import { Client } from 'models/Client';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setupInterceptors } from 'utils/interceptors';

type ApiClientProps = {
  client: Client;
};

export const ApiClient = ({ client }: ApiClientProps) => {
  const navigate = useNavigate();
  setupInterceptors(client, navigate);

  return <Outlet />;
};
