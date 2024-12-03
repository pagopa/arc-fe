import { setupInterceptors } from './interceptors';
import { Client } from 'models/Client';
import { useNavigate } from 'react-router-dom';
import storage from './storage';
import { ArcRoutes } from 'routes/routes';
import { Mock } from 'vitest';

vi.mock('./utils', () => ({
  config: {
    tokenHeaderExcludePaths: ['/path1', '/path2']
  }
}));

vi.mock('./storage');

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('setupInterceptors', () => {
  const client = {
    instance: {
      interceptors: {
        request: {
          use: vi.fn()
        },
        response: {
          use: vi.fn()
        }
      }
    }
  } as unknown as Client;

  const navigate = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    (useNavigate as Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set up request interceptor', () => {
    setupInterceptors(client);
    expect(client.instance.interceptors.request.use).toHaveBeenCalledTimes(1);
  });

  it('should add Authorization header to request if token is present', () => {
    const request = { url: '/path3', headers: {} };
    const accessToken = 'token';
    window.localStorage.setItem('accessToken', accessToken);
    setupInterceptors(client);
    const requestInterceptor = (client.instance.interceptors.request.use as Mock).mock.calls[0][0];
    const result = requestInterceptor(request);
    expect(result.headers['Authorization']).toBe(`Bearer ${accessToken}`);
  });

  it('should not add Authorization header to request if token is not present', () => {
    const request = { url: '/path3', headers: {} };
    setupInterceptors(client);
    const requestInterceptor = (client.instance.interceptors.request.use as Mock).mock.calls[0][0];
    const result = requestInterceptor(request);
    expect(result.headers['Authorization']).toBeUndefined();
  });

  it('should set up response interceptor', () => {
    setupInterceptors(client);
    expect(client.instance.interceptors.response.use).toHaveBeenCalledTimes(1);
  });

  it('should redirect 401 error', () => {
    const replaceMock = vi.fn();
    const error = { response: { status: 401 } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(global as any, 'window', 'get').mockImplementationOnce(() => ({
      location: {
        replace: replaceMock
      }
    }));

    setupInterceptors(client);
    const responseInterceptor = (client.instance.interceptors.response.use as Mock).mock
      .calls[0][1];
    responseInterceptor(error);
    expect(storage.user.logOut).toHaveBeenCalledTimes(1);
    expect(replaceMock).toBeCalledWith(`${ArcRoutes.COURTESY_PAGE}?errorcode=401`);
  });
});
