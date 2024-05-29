import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HealthCheck } from './index';
import utils from 'utils';

const mockedHealthCheck = jest.fn();
utils.apiClient.info.healthCheck = mockedHealthCheck;

describe('HealthCheck', () => {
  const originalEnv = utils.config.env;

  afterEach(() => {
    utils.config.env = originalEnv;
  });

  it('should call healthCheck on mount if env is LOCAL', async () => {
    utils.config.env = 'LOCAL';
    render(<HealthCheck />);

    expect(utils.apiClient.info.healthCheck).toHaveBeenCalled();
  });

  it('should not call healthCheck if env is not LOCAL', () => {
    // Change the environment to something other than LOCAL
    utils.config.env = 'DEV';

    render(<HealthCheck />);

    expect(mockedHealthCheck).not.toHaveBeenCalled();
  });

  it('should log an error if health check fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedHealthCheck.mockRejectedValueOnce('Error occurred during health check');

    render(<HealthCheck />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
