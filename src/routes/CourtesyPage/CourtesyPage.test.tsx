import React from 'react';
import { render, screen } from '@testing-library/react';
import { CourtesyPage } from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorIconComponent } from './index';
import { ArcErrors } from 'routes/routes';

const queryClient = new QueryClient();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [
    {
      get: () => '403'
    }
  ],
  useLoaderData: vi.fn(),
  Link: vi.fn()
}));

describe('UserRoute', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CourtesyPage />
      </QueryClientProvider>
    );
  });
});

describe('ErrorIconComponent', () => {
  it('should render the ErrorIconComponent correctly (accesso-non-autorizzato)', () => {
    render(<ErrorIconComponent erroCode={ArcErrors['accesso-non-autorizzato']} />);
    const imgElement = screen.getByTitle('Error');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/genericerror.svg');
  });

  it('should render the ErrorIconComponent correctly (avviso-non-pagabile)', () => {
    render(<ErrorIconComponent erroCode={ArcErrors['accesso-non-autorizzato']} />);
    const imgElement = screen.getByTitle('Error');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/genericerror.svg');
  });

  it('should render the ErrorIconComponent correctly (sessione-scaduta)', () => {
    render(<ErrorIconComponent erroCode={ArcErrors['sessione-scaduta']} />);
    const imgElement = screen.getByTitle('Expired');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/expired.svg');
  });

  it('should render the ErrorIconComponent correctly (risorsa-non-trovata)', () => {
    render(<ErrorIconComponent erroCode={ArcErrors['risorsa-non-trovata']} />);
    const imgElement = screen.getByTitle('Something went wrong');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/umbrella.svg');
  });

  it('should render the ErrorIconComponent correctly (avvio-pagamento)', () => {
    render(<ErrorIconComponent erroCode={ArcErrors['avvio-pagamento']} />);
    const imgElement = screen.getByTitle('Something went wrong');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/umbrella.svg');
  });

  it('should render the ErrorIconComponent correctly (sconosciuto)', () => {
    render(<ErrorIconComponent erroCode={ArcErrors['sconosciuto']} />);
    const imgElement = screen.getByTitle('Something went wrong');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/umbrella.svg');
  });

  it('should render the ErrorIconComponent default correctly', () => {
    render(<ErrorIconComponent />);
    const imgElement = screen.getByTitle('Something went wrong');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/umbrella.svg');
  });
});
