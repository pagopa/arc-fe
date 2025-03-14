import { useEffect } from 'react';
import utils from 'utils';
import { ArcRoutes } from 'routes/routes';

const Login = () => {
  useEffect(() => {
    if (utils.storage.user.hasToken()) {
      return window.location.replace(ArcRoutes.DASHBOARD);
    }
    // In development it's better to disable this redirect
    // to allow the developer to set a proper valid
    // acessToken and navigate the application on localhost
    if (utils.config.env !== 'LOCAL' || window.location.hostname !== 'localhost') {
      window.location.replace(utils.config.loginUrl);
    }
  }, []);

  return null;
};

export default Login;
