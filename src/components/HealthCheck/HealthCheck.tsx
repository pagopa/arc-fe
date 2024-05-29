import { useEffect } from 'react';
import utils from 'utils';

export const HealthCheck = () => {
  useEffect(() => {
    if (utils.config.env === 'LOCAL') {
      const checkHealth = async () => {
        try {
          await utils.apiClient.info.healthCheck();
        } catch (e) {
          console.error(e, 'Mock not available or /info not reachable');
        }
      };
      checkHealth();
    }
  }, []);

  return null; // This component does not render anything
};
