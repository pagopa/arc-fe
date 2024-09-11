import { NavigateFunction } from 'react-router-dom';
import utils from 'utils';
import { Client } from 'models/Client';
import { sessionClear } from './session';
import { ArcRoutes } from 'routes/routes';

export const setupInterceptors = (client: Client, navigate: NavigateFunction) => {
  client.instance.interceptors.request.use(
    (request) => {
      const tokenHeaderExcludePaths: string[] = utils.config.tokenHeaderExcludePaths;
      const routeUrl = request.url || '';
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && !tokenHeaderExcludePaths.includes(routeUrl)) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  client.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        /* This is a placeholder, in this case I think there should be an attempt to refresh the token, or if that's not possible, to redirect at login. */
        sessionClear(() => navigate(ArcRoutes.COURTESY_PAGE));
      }
    }
  );
};
