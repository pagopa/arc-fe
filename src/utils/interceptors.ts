import utils from 'utils';
import { Client } from 'models/Client';
import { ArcRoutes } from 'routes/routes';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const setupInterceptors = (client: Client) => {
  client.instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      const tokenHeaderExcludePaths: string[] = utils.config.tokenHeaderExcludePaths;
      const routeUrl = request.url || '';
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && !tokenHeaderExcludePaths.includes(routeUrl)) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error: Promise<AxiosError>) => {
      return Promise.reject(error);
    }
  );
  client.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        const toUrl = `${ArcRoutes.COURTESY_PAGE}?errorcode=401`;
        utils.storage.user.logOut();
        window.location.replace(toUrl);
      }
    }
  );
};
