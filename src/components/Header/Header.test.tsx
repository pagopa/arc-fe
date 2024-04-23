import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './';
import '../../translations/i18n';

describe('Header component', () => {
  it('should render as expected', () => {
    render(<Header />);
  });

  it('should call onAssistanceClick function', () => {
    const onAssistanceClik = jest.fn();
    render(<Header onAssistanceClick={onAssistanceClik} />);
    const button = screen.getByText('Assistenza');
    fireEvent.click(button);
    expect(onAssistanceClik).toHaveBeenCalledTimes(1);
  });

  it('should call relative functions clicking on user sub menu items', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Esci'));
    fireEvent.click(screen.getByText('I tuoi dati'));
  });
});
