import {
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
  debtorTaxCode: 'HSLZYB90L59D030S',
  debtorFullName: 'EC Demo Pagamenti Pull Test',
  debtorType: 'F',
  paTaxCode: '99999000013',
  paFullName: 'EC Demo Pagamenti Pull Test',
  insertedDate: '2024-07-31T12:20:59.75948',
  publishDate: '2024-07-31T12:20:59.759518',
  validityDate: '2024-07-31T12:20:59.759518',
  status: PaymentNoticeStatus.VALID,
  lastUpdateDate: '2024-07-31',
  paymentOptions: {
    description: 'Test Pull - unica opzione',
    numberOfInstallments: 1,
    amount: '1,20 €',
    dueDate: '10/30/2024',
    isPartialPayment: false,
    switchToExpired: false,
    installments: [
      {
        nav: '34700000088568793',
        iuv: '4700000088568793',
        paTaxCode: '99999000013',
        paFullName: 'EC Demo Pagamenti Pull Test',
        amount: '1,20 €',
        description: 'Test Pull - unica opzione',
        dueDate: '10/30/2024',
        retentionDate: '2024-11-30T23:59:59',
        insertedDate: '2024-07-31T12:20:59.75948',
        notificationFee: 0,
        status: PaymentOptionStatus.PO_UNPAID,
        lastUpdatedDate: '2024-07-31T12:20:59.75948'
      }
    ]
  },
  image: {
    src: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
    alt: 'EC Demo Pagamenti Pull Test'
  },
  type: PaymentNoticeEnum.SINGLE
};

export const mockPaymentNotices: PaymentNoticesListDTO = {
  paymentNotices: [
    {
      iupd: '99999000013-m1ugqdl17m37b93pq1butmgufl6qhlcq',
      debtorTaxCode: 'HSLZYB90L59D030S',
      debtorFullName: 'EC Demo Pagamenti Pull Test',
      debtorType: 'F',
      paTaxCode: '99999000013',
      paFullName: 'EC Demo Pagamenti Pull Test',
      insertedDate: '2024-08-01T09:13:12.459413',
      publishDate: '2024-08-01T09:13:12.459435',
      validityDate: '2024-08-01T09:13:12.459435',
      status: PaymentNoticeStatus.VALID,
      lastUpdateDate: '2024-08-01',
      paymentOptions: [
        {
          description: 'Test Pull - unica opzione',
          numberOfInstallments: 1,
          amount: 588,
          dueDate: '2024-10-30T23:59:59',
          isPartialPayment: false,
          switchToExpired: false,
          installments: [
            {
              nav: '37442658002593149',
              iuv: '7442658002593149',
              paTaxCode: '99999000013',
              paFullName: 'EC Demo Pagamenti Pull Test',
              amount: 588,
              description: 'Test Pull - unica opzione',
              dueDate: '2024-10-30T23:59:59',
              retentionDate: '2024-11-30T23:59:59',
              insertedDate: '2024-08-01T09:13:12.459413',
              notificationFee: 0,
              status: PaymentOptionStatus.PO_UNPAID,
              lastUpdatedDate: '2024-08-01T09:13:12.459413'
            }
          ]
        }
      ]
    },
    {
      iupd: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
      debtorTaxCode: 'HSLZYB90L59D030S',
      debtorFullName: 'EC Demo Pagamenti Pull Test',
      debtorType: 'F',
      paTaxCode: '99999000013',
      paFullName: 'EC Demo Pagamenti Pull Test',
      insertedDate: '2024-07-31T12:20:59.75948',
      publishDate: '2024-07-31T12:20:59.759518',
      validityDate: '2024-07-31T12:20:59.759518',
      status: PaymentNoticeStatus.VALID,
      lastUpdateDate: '2024-07-31',
      paymentOptions: [
        {
          description: 'Test Pull - unica opzione',
          numberOfInstallments: 1,
          amount: 120,
          dueDate: '2024-10-30T23:59:59',
          isPartialPayment: false,
          switchToExpired: false,
          installments: [
            {
              nav: '34700000088568793',
              iuv: '4700000088568793',
              paTaxCode: '99999000013',
              paFullName: 'EC Demo Pagamenti Pull Test',
              amount: 120,
              description: 'Test Pull - unica opzione',
              dueDate: '2024-10-30T23:59:59',
              retentionDate: '2024-11-30T23:59:59',
              insertedDate: '2024-07-31T12:20:59.75948',
              notificationFee: 0,
              status: PaymentOptionStatus.PO_UNPAID,
              lastUpdatedDate: '2024-07-31T12:20:59.75948'
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
    debtorTaxCode: 'HSLZYB90L59D030S',
    debtorFullName: 'EC Demo Pagamenti Pull Test',
    debtorType: 'F',
    paTaxCode: '99999000013',
    paFullName: 'EC Demo Pagamenti Pull Test',
    insertedDate: '2024-08-01T09:13:12.459413',
    publishDate: '2024-08-01T09:13:12.459435',
    validityDate: '2024-08-01T09:13:12.459435',
    status: PaymentNoticeStatus.VALID,
    lastUpdateDate: '2024-08-01',
    paymentOptions: {
      description: 'Test Pull - unica opzione',
      numberOfInstallments: 1,
      amount: '5,88\xa0€',
      dueDate: '10/31/2024',
      isPartialPayment: false,
      switchToExpired: false,
      installments: [
        {
          nav: '37442658002593149',
          iuv: '7442658002593149',
          paTaxCode: '99999000013',
          paFullName: 'EC Demo Pagamenti Pull Test',
          amount: '5,88\xa0€',
          description: 'Test Pull - unica opzione',
          dueDate: '10/31/2024',
          retentionDate: '2024-11-30T23:59:59',
          insertedDate: '2024-08-01T09:13:12.459413',
          notificationFee: 0,
          status: PaymentOptionStatus.PO_UNPAID,
          lastUpdatedDate: '2024-08-01T09:13:12.459413'
        }
      ]
    },
    image: {
      src: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
      alt: 'EC Demo Pagamenti Pull Test'
    },
    type: PaymentNoticeEnum.SINGLE
  },
  {
    iupd: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
    debtorTaxCode: 'HSLZYB90L59D030S',
    debtorFullName: 'EC Demo Pagamenti Pull Test',
    debtorType: 'F',
    paTaxCode: '99999000013',
    paFullName: 'EC Demo Pagamenti Pull Test',
    insertedDate: '2024-07-31T12:20:59.75948',
    publishDate: '2024-07-31T12:20:59.759518',
    validityDate: '2024-07-31T12:20:59.759518',
    status: PaymentNoticeStatus.VALID,
    lastUpdateDate: '2024-07-31',
    paymentOptions: {
      description: 'Test Pull - unica opzione',
      numberOfInstallments: 1,
      amount: '1,20\xa0€',
      dueDate: '10/31/2024',
      isPartialPayment: false,
      switchToExpired: false,
      installments: [
        {
          nav: '34700000088568793',
          iuv: '4700000088568793',
          paTaxCode: '99999000013',
          paFullName: 'EC Demo Pagamenti Pull Test',
          amount: '1,20\xa0€',
          description: 'Test Pull - unica opzione',
          dueDate: '10/31/2024',
          retentionDate: '2024-11-30T23:59:59',
          insertedDate: '2024-07-31T12:20:59.75948',
          notificationFee: 0,
          status: PaymentOptionStatus.PO_UNPAID,
          lastUpdatedDate: '2024-07-31T12:20:59.75948'
        }
      ]
    },
    image: {
      src: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
      alt: 'EC Demo Pagamenti Pull Test'
    },
    type: PaymentNoticeEnum.SINGLE
  }
];
