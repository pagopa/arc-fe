import * as React from 'react';
import { render } from '@testing-library/react';
import Transactions from './Transactions';
import { dummyTransactionsData } from 'stories/utils/mocks';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Transactions table component', () => {
  it('should render as expected', () => {
    render(
      <BrowserRouter>
        <Transactions rows={dummyTransactionsData.all} />
      </BrowserRouter>
    );
  });
});
