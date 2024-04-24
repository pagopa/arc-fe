import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Transactions from './Transactions';
import { dummyTransactionsData } from 'stories/utils/mocks';

describe('Transactions table component', () => {
  it('should render as expected', () => {
    render(<Transactions rows={dummyTransactionsData.all} />);
  });

  it('should call action function clicking on button', () => {
    const action = jest.fn();
    render(
      <Transactions
        rows={[
          ...dummyTransactionsData.all,
          {
            ...dummyTransactionsData.all[0],
            id: 'test-id',
            detailsButton: {
              text: 'click me',
              action
            }
          }
        ]}
      />
    );
    const button = screen.getByText('click me');
    fireEvent.click(button);
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith('test-id');
  });
});
