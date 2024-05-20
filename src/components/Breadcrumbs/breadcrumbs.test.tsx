import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import Breadcrumbs, { type BreadcrumbsProps } from './Breadcrumbs';
import { BreadcrumbPath } from 'models/Breadcrumbs';
import '@testing-library/jest-dom';
import i18n from '../../translations/i18n';
import { useTheme } from '@mui/material';

void i18n.init({
  resources: {}
});

const separator = <>separator</>;
const crumbs: BreadcrumbPath = {
  backButton: true,
  elements: [
    { name: 'Home', href: '/', fontWeight: 1 },
    { name: 'Page', href: '/page', fontWeight: 1 }
  ]
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const BreadcrumbsWithRouter = (props: BreadcrumbsProps) => (
  <MemoryRouter>
    <Breadcrumbs {...props} />
  </MemoryRouter>
);

describe('Breadcrumbs component', () => {
  it('should render as expected', () => {
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);
  });

  it('renders breadcrumbs with button and separator', () => {
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('separator')).toBeInTheDocument();
  });

  it('button triggers a back navigation', () => {
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });

  it('breadcrumb click triggers a navigation', () => {
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    const elem = screen.getByText('app.routes.Page');
    fireEvent.click(elem);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/page');
  });

  it('should render without backButton', () => {
    render(
      <BreadcrumbsWithRouter separator={separator} crumbs={{ ...crumbs, backButton: undefined }} />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('separator')).toBeInTheDocument();
  });

  it('should render only backButton on missing crumbs', () => {
    render(
      <BreadcrumbsWithRouter separator={separator} crumbs={{ backButton: true, elements: [] }} />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('separator')).not.toBeInTheDocument();
  });

  it('should not render on missing crumbs and backButton', () => {
    render(
      <BreadcrumbsWithRouter
        separator={separator}
        crumbs={null as unknown as BreadcrumbsProps['crumbs']}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText('separator')).not.toBeInTheDocument();
  });

  it('should not render when crumbs have one or no elements', () => {
    // Scenario 1: crumbs is undefined
    render(
      <BreadcrumbsWithRouter
        separator={separator}
        crumbs={undefined as unknown as BreadcrumbPath}
      />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // Scenario 2: crumbs.elements is undefined
    const crumbsUndefinedElements: BreadcrumbPath = {
      backButton: true,
      elements: undefined
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbsUndefinedElements} />);
    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('separator')).not.toBeInTheDocument();

    // Scenario 3: crumbs.elements is an empty array
    const crumbsEmpty: BreadcrumbPath = {
      backButton: true,
      elements: []
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbsEmpty} />);
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();

    // Scenario 4: crumbs.elements has only one element
    const crumbsOneElement: BreadcrumbPath = {
      backButton: true,
      elements: [{ name: 'Home', href: '/', fontWeight: 1 }]
    };

    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbsOneElement} />);
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
  });

  it('should render when crumbs have backButton true and elements > 1', () => {
    const crumbs: BreadcrumbPath = {
      backButton: true,
      elements: [
        { name: 'Home', href: '/', fontWeight: 1 },
        { name: 'Page', href: '/page', fontWeight: 1 }
      ]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render when crumbs have backButton true but elements <= 1', () => {
    const crumbs: BreadcrumbPath = {
      backButton: true,
      elements: [{ name: 'Home', href: '/', fontWeight: 1 }]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);
    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('separator')).not.toBeInTheDocument();
  });

  it('should not render when crumbs have backButton false or undefined', () => {
    const crumbs: BreadcrumbPath = {
      backButton: false,
      elements: [
        { name: 'Home', href: '/', fontWeight: 1 },
        { name: 'Page', href: '/page', fontWeight: 1 }
      ]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render breadcrumbs with link when crumbs and elements are defined', () => {
    const crumbs: BreadcrumbPath = {
      backButton: true,
      elements: [
        { name: 'Home', href: '/', fontWeight: 1 },
        { name: 'Page', href: '/page', fontWeight: 1 }
      ]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    const linkElement = screen.getAllByRole('link', {
      name: 'app.routes.breadcrumbsElementClickable'
    });
    expect(linkElement).toHaveLength(2);
  });

  it('should render breadcrumbs without link when crumbs or elements are not defined', () => {
    const crumbs: BreadcrumbPath = {
      elements: [
        { name: 'home', fontWeight: 1 },
        { name: 'page', fontWeight: 1 }
      ]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    const clickableElements = screen.queryAllByRole('link', {
      name: 'app.routes.breadcrumbsElementClickable'
    });
    const linkElement = screen.getByText('app.routes.home');

    expect(clickableElements).toHaveLength(0);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render with custom color when crumbs have defined color', () => {
    const crumbs: BreadcrumbPath = {
      elements: [
        { name: 'home', fontWeight: 1, color: 'red' },
        { name: 'page', fontWeight: 1 }
      ]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    const linkElement = screen.getByText('app.routes.home');
    expect(linkElement).toHaveStyle({ color: 'red' });
  });

  it('should render with default color when crumbs do not have defined color', () => {
    const crumbs: BreadcrumbPath = {
      elements: [
        { name: 'home', fontWeight: 1 },
        { name: 'page', fontWeight: 1 }
      ]
    };
    render(<BreadcrumbsWithRouter separator={separator} crumbs={crumbs} />);

    const { result } = renderHook(() => useTheme());

    const linkElement = screen.getByText('app.routes.home');
    expect(linkElement).toHaveStyle({ color: result.current.palette.text.primary });
  });
});
