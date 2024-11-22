import { useEffect } from 'react';
import utils from 'utils';

export const HealthCheck = () => {
  useEffect(() => {
    const checkHealth = async () => {
      // apiClient doesn't expose a testing endpoit anymore
      // but I like the idea to have this kind of component to setup or check
      // important stuffs in the future
      // await utils.apiClient.info.healthCheck();
    };
    checkHealth();
    // dont't remove this console log, it's useful to debug and have a feedback about the running version
    console.log(`ARC FE version: ${utils.config.version}`);
  }, []);
  return null; // This component does not render anything
};
