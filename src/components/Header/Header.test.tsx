import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '../../translations/i18n';
import { Header, HeaderProps } from '.';
import { BrowserRouter } from 'react-router-dom';

const TestHeader = (props: HeaderProps) => (
  <BrowserRouter>
    <Header {...props} />
  </BrowserRouter>
);

describe('Header component', () => {
  it('should render as expected', () => {
    render(<TestHeader />);
  });

  it('should call onAssistanceClick function', () => {
    const onAssistanceClik = jest.fn();
    render(<TestHeader onAssistanceClick={onAssistanceClik} />);
    const button = screen.getByText('Assistenza');
    fireEvent.click(button);
    expect(onAssistanceClik).toHaveBeenCalledTimes(1);
  });

  it('should call relative functions clicking on user sub menu items', () => {
    render(<TestHeader />);
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Esci'));
    fireEvent.click(screen.getByText('I tuoi dati'));
  });
});
