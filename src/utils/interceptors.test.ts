import { setupInterceptors } from './interceptors';
import { Client } from 'models/Client';
import { useNavigate } from 'react-router-dom';
import { sessionClear } from './session';
import { ArcRoutes } from 'routes/routes';
import { Mock } from 'vitest';

vi.mock('./utils', () => ({
  config: {
    tokenHeaderExcludePaths: ['/path1', '/path2']
  }
}));

vi.mock('./session', () => ({
  sessionClear: vi.fn(),
  refreshToken: vi.fn()
}));

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
    setupInterceptors(client, navigate);
    expect(client.instance.interceptors.request.use).toHaveBeenCalledTimes(1);
  });

  it('should add Authorization header to request if token is present', () => {
    const request = { url: '/path3', headers: {} };
    const accessToken = 'token';
    window.localStorage.setItem('accessToken', accessToken);
    setupInterceptors(client, navigate);
    const requestInterceptor = (client.instance.interceptors.request.use as Mock).mock
      .calls[0][0];
    const result = requestInterceptor(request);
    expect(result.headers['Authorization']).toBe(`Bearer ${accessToken}`);
  });

  it('should not add Authorization header to request if token is not present', () => {
    const request = { url: '/path3', headers: {} };
    setupInterceptors(client, navigate);
    const requestInterceptor = (client.instance.interceptors.request.use as Mock).mock
      .calls[0][0];
    const result = requestInterceptor(request);
    expect(result.headers['Authorization']).toBeUndefined();
  });

  it('should set up response interceptor', () => {
    setupInterceptors(client, navigate);
    expect(client.instance.interceptors.response.use).toHaveBeenCalledTimes(1);
  });

  it('should call refreshToken and sessionClear on 401 error', () => {
    const error = { response: { status: 401 } };
    (sessionClear as Mock).mockImplementation((onSuccess) => {
      if (onSuccess) {
        onSuccess();
      }
    });
    setupInterceptors(client, navigate);
    const responseInterceptor = (client.instance.interceptors.response.use as Mock).mock
      .calls[0][1];
    responseInterceptor(error);
    expect(sessionClear).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(ArcRoutes.COURTESY_PAGE);
  });
});
