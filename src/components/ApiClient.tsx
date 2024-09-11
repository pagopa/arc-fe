import { Client } from 'models/Client';
import React, { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setupInterceptors } from 'utils/interceptors';

type ApiClientProps = {
  client: Client;
};

export const ApiClient = ({ client }: ApiClientProps) => {
  const navigate = useNavigate();
  const hasSetupInterceptors = useRef(false); // Ref to track if setup has run

  useEffect(() => {
    if (!hasSetupInterceptors.current) {
      setupInterceptors(client, navigate);
      hasSetupInterceptors.current = true;
    }
  }, [client, navigate]);

  return <Outlet />;
};
