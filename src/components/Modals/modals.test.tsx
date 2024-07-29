import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssistanceBackModal from './AssistanceBackModal';
import PullPaymentsModal from './PullPaymentsModal';
import DetailNoticeInfoModal from './DetailNoticeInfoModal';
import { ModalSystem } from './';
import { ArcRoutes } from 'routes/routes';
import '@testing-library/jest-dom';

const utilsMock = jest.requireMock('utils');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  storage: {
    pullPaymentsOptIn: {
      set: () => true
    }
  },
  modal: {
    ModalId: {
      OPTIN: 'OPTIN',
      ASSISTANCEBACK: 'ASSISTANCEBACK',
      PAYMENT_NOTICE_MODAL: 'PAYMENT_NOTICE_MODAL'
    },
    status: {
      isOpen: {
        value: false
      },
      id: {
        value: 'OPTIN'
      }
    },
    close: () => {}
  }
}));

const ModalWithRouter = (props: { children: React.ReactNode }) => (
  <MemoryRouter>{props.children}</MemoryRouter>
);

describe('Modals: ', () => {
  it('ModalSystem should render nothing as expected', () => {
    const { container } = render(
      <ModalWithRouter>
        <ModalSystem />
      </ModalWithRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('Assistance Back Modal should render as expected', () => {
    render(
      <ModalWithRouter>
        <AssistanceBackModal open />
      </ModalWithRouter>
    );
  });

  it('Assistance Back Modal should navigate back clicking on exit button', () => {
    render(
      <ModalWithRouter>
        <AssistanceBackModal open />
      </ModalWithRouter>
    );
    const button = screen.getByText('Esci');
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });

  it('Pull Payments Modal Back (opt-in) should render as expected', () => {
    render(
      <ModalWithRouter>
        <PullPaymentsModal open />
      </ModalWithRouter>
    );
  });

  it('Pull Payments Modal Back (opt-in) should render navigate to ArcRoutes.PAYMENT_NOTICES on consent button click', () => {
    render(
      <ModalWithRouter>
        <PullPaymentsModal open />
      </ModalWithRouter>
    );
    const button = screen.getByText('Consenti');
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(ArcRoutes.PAYMENT_NOTICES);
  });

  it('Pull Payments Modal Back (opt-in) should render nothing as expected when closed', () => {
    const { container } = render(
      <ModalWithRouter>
        <PullPaymentsModal open={false} />
      </ModalWithRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('Payment notice info should render nothing as expected when closed', () => {
    const { container } = render(
      <ModalWithRouter>
        <DetailNoticeInfoModal open={false} />
      </ModalWithRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('ModalSystem should call a modal as expected', () => {
    utilsMock.modal.status.isOpen.value = true;
    render(
      <ModalWithRouter>
        <ModalSystem />
      </ModalWithRouter>
    );
    expect(screen.getByTestId('pull-payments-modal')).toBeInTheDocument();
  });

  it('ModalSystem should open the Payment notice info as expected', () => {
    utilsMock.modal.status.isOpen.value = true;
    utilsMock.modal.status.id.value = 'PAYMENT_NOTICE_MODAL';
    render(
      <ModalWithRouter>
        <ModalSystem />
      </ModalWithRouter>
    );
    expect(screen.getByTestId('detail-payment-info-modal')).toBeInTheDocument();
  });
});
