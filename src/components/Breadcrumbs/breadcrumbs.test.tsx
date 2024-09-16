import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbPath } from 'models/Breadcrumbs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@testing-library/vi-dom';
import i18n from 'translations/i18n';

void i18n.init({
  resources: {}
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@mui/material/useMediaQuery', () => vi.fn());

const renderWithTheme = (component: ReactNode) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Breadcrumbs Component', () => {
  const navigate = vi.fn();
  (useNavigate as Mock).mockReturnValue(navigate);
  const separator = <span>/</span>;

  const crumbs: BreadcrumbPath = {
    elements: [{ name: 'home', href: '/home' }, { name: 'about' }]
  };

  const defaultProps: BreadcrumbsProps = {
    separator,
    crumbs
  };

  it('renders breadcrumbs correctly', () => {
    (useMediaQuery as Mock).mockReturnValue(true); // mdUp as true
    renderWithTheme(<Breadcrumbs {...defaultProps} />);
    expect(screen.getByText('app.routes.home')).toBeInTheDocument();
    expect(screen.getByText('app.routes.about')).toBeInTheDocument();
  });

  it('navigates on breadcrumb click', () => {
    (useMediaQuery as Mock).mockReturnValue(true); // mdUp as true
    renderWithTheme(<Breadcrumbs {...defaultProps} />);
    fireEvent.click(screen.getByText('app.routes.home'));
    expect(navigate).toHaveBeenCalledWith('/home');
  });

  it('renders back button on small screens', () => {
    (useMediaQuery as Mock).mockReturnValue(false); // mdUp as false
    renderWithTheme(<Breadcrumbs {...defaultProps} />);
    expect(screen.getByLabelText('app.routes.back')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('app.routes.back'));
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('renders only the first breadcrumb on small screens', () => {
    (useMediaQuery as Mock).mockReturnValue(false); // mdUp as false
    renderWithTheme(<Breadcrumbs {...defaultProps} />);
    expect(screen.getByText('app.routes.home')).toBeInTheDocument();
    expect(screen.queryByText('app.routes.about')).not.toBeInTheDocument();
  });
});
