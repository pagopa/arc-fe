import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AssistanceForm } from './index';
import '@testing-library/jest-dom';
import utils from 'utils';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';
import { UserInfo } from '../../../generated/apiClient';
import { AxiosResponse } from 'axios';
import loaders from 'utils/loaders';

describe('AssistanceForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUserData = {
    data: {
      userId: '_1a',
      fiscalCode: 'TINIT-PLOMRC01P30L221D',
      familyName: 'Polo',
      name: 'Marco',
      email: 'ilmilione@virgilio.it'
    }
  };

  const WrappedAssistanceForm = () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <AssistanceForm />
      </QueryClientProvider>
    );
  };

  it('renders having e-mail of connected user', () => {
    vi.spyOn(loaders, 'getUserInfo').mockReturnValue(
      mockUserData as UseQueryResult<UserInfo, Error>
    );

    render(<WrappedAssistanceForm />);

    expect(loaders.getUserInfo).toHaveBeenCalledTimes(1);

    const email = screen.getByTestId('confirm-email');
    expect(email).toHaveAttribute('value', mockUserData.data.email);
  });

  it('renders not having confirm button disabled', () => {
    render(<WrappedAssistanceForm />);
    const confirmButton = screen.getByTestId('assistance-confirm-button');
    expect(confirmButton).not.toHaveClass('Mui-disabled');
  });

  it('gives a feedback when the form has errors', () => {
    vi.spyOn(utils.apiClient.token, 'getZendeskAssistanceToken');

    render(<WrappedAssistanceForm />);
    const confirmButton = screen.getByTestId('assistance-confirm-button');
    const email = screen.getByTestId('confirm-email');
    const confirmEmail = screen.getByTestId('assistance-confirm-email');

    fireEvent.change(email, { target: { value: 'wrong email' } });
    fireEvent.click(confirmButton);
    expect(screen.getByText('app.assistance.input1Helper')).toBeInTheDocument();
    expect(utils.apiClient.token.getZendeskAssistanceToken).not.toHaveBeenCalled();

    fireEvent.change(email, { target: { value: 'good@email.it' } });
    fireEvent.click(confirmButton);
    expect(screen.getByText('app.assistance.input2Helper')).toBeInTheDocument();
    expect(utils.apiClient.token.getZendeskAssistanceToken).not.toHaveBeenCalled();

    fireEvent.change(confirmEmail, { target: { value: 'good@email.it' } });
    fireEvent.click(confirmButton);
    expect(utils.apiClient.token.getZendeskAssistanceToken).toHaveBeenCalled();
  });

  it('confirms email and obtain a zendesk jwt', async () => {
    const mockGetZendeskAssistanceToken = {
      data: {
        assistanceToken: 'z123',
        returnTo: 'https://www.pagopa.it'
      }
    };

    vi.spyOn(utils.apiClient.token, 'getZendeskAssistanceToken').mockResolvedValue(
      mockGetZendeskAssistanceToken as AxiosResponse
    );

    render(<WrappedAssistanceForm />);

    const confirmButton = screen.getByTestId('assistance-confirm-button');
    const email = screen.getByTestId('confirm-email');
    const confirmEmail = screen.getByTestId('assistance-confirm-email');
    const jwtStringInput = screen.getByTestId('jwtString');
    const returnToInput = screen.getByTestId('returnTo');

    fireEvent.change(email, { target: { value: 'pippo@pippo.it' } });
    fireEvent.change(confirmEmail, { target: { value: 'pippo@pippo.it' } });
    fireEvent.click(confirmButton);

    expect(utils.apiClient.token.getZendeskAssistanceToken).toHaveBeenCalledTimes(1);
    waitFor(() => {
      expect(jwtStringInput).toHaveAttribute(
        'value',
        mockGetZendeskAssistanceToken.data.assistanceToken
      );
      expect(returnToInput).toHaveAttribute('value', mockGetZendeskAssistanceToken.data.returnTo);
    });
  });
});
