import {
  PaymentNoticeDetailsSINGLE,
  PaymentNoticeEnum,
  PaymentNoticeSingleType,
  PaymentNoticeType
} from 'models/PaymentNotice';
import {
  PaymentNoticeStatus,
  PaymentNoticesListDTO,
  PaymentOptionStatus
} from '../../../generated/apiClient';

export const mockNotice: PaymentNoticeSingleType = {
  iupd: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
  paTaxCode: '99999000013',
  paFullName: 'EC Demo Pagamenti Pull Test',
  status: PaymentNoticeStatus.VALID,
  paymentOptions: {
    description: 'Test Pull - unica opzione',
    numberOfInstallments: 1,
    amount: '1,20 €',
    amountValue: 120,
    dueDate: '10/30/2024',
    isPartialPayment: false,
    installments: {
      nav: '34700000088568793',
      iuv: '4700000088568793',
      paTaxCode: '99999000013',
      paFullName: 'EC Demo Pagamenti Pull Test',
      amount: '1,20 €',
      description: 'Test Pull - unica opzione',
      dueDate: '10/30/2024',
      status: PaymentOptionStatus.PO_UNPAID
    }
  },
  image: {
    src: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
    alt: 'EC Demo Pagamenti Pull Test'
  },
  type: PaymentNoticeEnum.SINGLE
};

export const mockNoticeDetails: PaymentNoticeDetailsSINGLE = {
  iupd: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
  paTaxCode: '99999000013',
  paFullName: 'EC Demo Pagamenti Pull Test',
  paymentOptions: {
    nav: '34700000088568793',
    iuv: '4700000088568793',
    description: 'Test Pull - unica opzione',
    amount: '1,20 €',
    amountValue: 120,
    dueDate: '10/30/2024',
    isPartialPayment: false
  },
  type: PaymentNoticeEnum.SINGLE
};

export const mockPaymentNotices: PaymentNoticesListDTO = {
  paymentNotices: [
    {
      iupd: '99999000013-m1ugqdl17m37b93pq1butmgufl6qhlcq',
      paTaxCode: '99999000013',
      paFullName: 'EC Demo Pagamenti Pull Test',
      status: PaymentNoticeStatus.VALID,
      paymentOptions: [
        {
          description: 'Test Pull - unica opzione',
          numberOfInstallments: 1,
          amount: 588,
          dueDate: '2024-10-30T23:59:59',
          isPartialPayment: false,
          installments: [
            {
              nav: '37442658002593149',
              iuv: '7442658002593149',
              paTaxCode: '99999000013',
              paFullName: 'EC Demo Pagamenti Pull Test',
              amount: 588,
              description: 'Test Pull - unica opzione',
              dueDate: '2024-10-30T23:59:59',
              status: PaymentOptionStatus.PO_UNPAID
            }
          ]
        }
      ]
    },
    {
      iupd: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
      paTaxCode: '99999000013',
      paFullName: 'EC Demo Pagamenti Pull Test',
      status: PaymentNoticeStatus.VALID,
      paymentOptions: [
        {
          description: 'Test Pull - unica opzione',
          numberOfInstallments: 1,
          amount: 120,
          dueDate: '2024-10-30T23:59:59',
          isPartialPayment: false,
          installments: [
            {
              nav: '34700000088568793',
              iuv: '4700000088568793',
              paTaxCode: '99999000013',
              paFullName: 'EC Demo Pagamenti Pull Test',
              amount: 120,
              description: 'Test Pull - unica opzione',
              dueDate: '2024-10-30T23:59:59',
              status: PaymentOptionStatus.PO_UNPAID
            }
          ]
        }
      ]
    }
  ]
};

export const mockConvertedNotice: PaymentNoticeType[] = [
  {
    iupd: '99999000013-m1ugqdl17m37b93pq1butmgufl6qhlcq',
    paTaxCode: '99999000013',
    paFullName: 'EC Demo Pagamenti Pull Test',
    status: PaymentNoticeStatus.VALID,
    paymentOptions: {
      description: 'Test Pull - unica opzione',
      numberOfInstallments: 1,
      amount: '5,88\xa0€',
      dueDate: '10/31/2024',
      isPartialPayment: false,
      installments: {
        nav: '37442658002593149',
        iuv: '7442658002593149',
        paTaxCode: '99999000013',
        paFullName: 'EC Demo Pagamenti Pull Test',
        amount: '5,88\xa0€',
        description: 'Test Pull - unica opzione',
        dueDate: '10/31/2024',
        status: PaymentOptionStatus.PO_UNPAID
      },
      amountValue: 588
    },
    image: {
      src: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
      alt: 'EC Demo Pagamenti Pull Test'
    },
    type: PaymentNoticeEnum.SINGLE
  },
  {
    iupd: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
    paTaxCode: '99999000013',
    paFullName: 'EC Demo Pagamenti Pull Test',
    status: PaymentNoticeStatus.VALID,
    paymentOptions: {
      description: 'Test Pull - unica opzione',
      numberOfInstallments: 1,
      amount: '1,20\xa0€',
      dueDate: '10/31/2024',
      isPartialPayment: false,
      installments: {
        nav: '34700000088568793',
        iuv: '4700000088568793',
        paTaxCode: '99999000013',
        paFullName: 'EC Demo Pagamenti Pull Test',
        amount: '1,20\xa0€',
        description: 'Test Pull - unica opzione',
        dueDate: '10/31/2024',
        status: PaymentOptionStatus.PO_UNPAID
      },
      amountValue: 120
    },
    image: {
      src: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
      alt: 'EC Demo Pagamenti Pull Test'
    },
    type: PaymentNoticeEnum.SINGLE
  }
];
