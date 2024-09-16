import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AssistanceForm } from './index';
import '@testing-library/vi-dom';
import utils from 'utils';

vi.mock('utils', () => ({
  loaders: {
    getUserInfo: vi.fn()
  },
  apiClient: {
    token: {
      getZendeskAssistanceToken: vi.fn()
    }
  }
}));

describe('AssistanceForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders having e-mail of connected user', async () => {
    const mockUserData = {
      data: {
        userId: '_1a',
        fiscalCode: 'TINIT-PLOMRC01P30L221D',
        familyName: 'Polo',
        name: 'Marco',
        email: 'ilmilione@virgilio.it'
      }
    };
    (utils.loaders.getUserInfo as Mock).mockReturnValue(mockUserData);

    render(<AssistanceForm />);

    expect(utils.loaders.getUserInfo).toHaveBeenCalledTimes(1);

    const email = screen.getByTestId('confirm-email');
    expect(email).toHaveAttribute('value', mockUserData.data.email);
  });

  it('renders having confirm button disabled', () => {
    render(<AssistanceForm />);
    const confirmButton = screen.getByTestId('assistance-confirm-button');
    expect(confirmButton).toHaveClass('Mui-disabled');
  });

  it('turns confirm button enabled correctly', () => {
    render(<AssistanceForm />);
    const confirmButton = screen.getByTestId('assistance-confirm-button');
    const email = screen.getByTestId('confirm-email');
    const confirmEmail = screen.getByTestId('assistance-confirm-email');

    expect(confirmButton).toHaveClass('Mui-disabled');

    fireEvent.change(email, { target: { value: 'pippo' } });
    fireEvent.change(confirmEmail, { target: { value: 'pippo' } });
    expect(confirmButton).toHaveClass('Mui-disabled');

    fireEvent.change(email, { target: { value: 'pippo@pippo.it' } });
    expect(confirmButton).toHaveClass('Mui-disabled');

    fireEvent.change(confirmEmail, { target: { value: 'pippo@pippo.it' } });
    expect(confirmButton).not.toHaveClass('Mui-disabled');
  });

  it('confirm email and obtain a zendesk jwt', async () => {
    const mockGetZendeskAssistanceToken = {
      data: {
        assistanceToken: 'z123',
        returnTo: 'https://www.pagopa.it'
      }
    };
    (utils.apiClient.token.getZendeskAssistanceToken as Mock).mockReturnValue(
      mockGetZendeskAssistanceToken
    );

    render(<AssistanceForm />);

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
