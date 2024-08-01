import utils from '.';
import { TransactionDTO } from '../../generated/apiClient';
import { TransactionProps } from 'components/Transactions/Transaction';
import { TransactionDetailsDTO } from '../../generated/apiClient';
import {
  PaymentNoticeDTO,
  PaymentNoticeStatus,
  PaymentOptionStatus
} from '../../generated/data-contracts';
import '@testing-library/jest-dom';
import { PaymentNotices } from 'components/PaymentNotice/List';

describe('toEuro function', () => {
  it('should format correctly', () => {
    expect(utils.converters.toEuro(50)).toEqual('0,50\xa0€');

    expect(utils.converters.toEuro(501)).toEqual('5,01\xa0€');

    expect(utils.converters.toEuro(0)).toEqual('0,00\xa0€');

    expect(utils.converters.toEuro(0, 2)).toEqual('0,00\xa0€');

    expect(utils.converters.toEuro(550)).toEqual('5,50\xa0€');

    expect(utils.converters.toEuro(550, 2)).toEqual('5,50\xa0€');

    expect(utils.converters.toEuro(55.67, 2, 3)).toEqual('0,557\xa0€');

    expect(utils.converters.toEuro(55.67, 2)).toEqual('0,56\xa0€');

    expect(utils.converters.toEuro(127, 2, 3)).toEqual('1,270\xa0€');

    expect(utils.converters.toEuro(1, 0)).toEqual('1,00\xa0€');

    expect(utils.converters.toEuro(-55)).toEqual('-0,55\xa0€');

    expect(utils.converters.toEuro(-5, 0)).toEqual('-5,00\xa0€');
  });
});

describe('prepareRowsData function', () => {
  it('should covert correctly from a Transaction[] shape to the euro symbol', () => {
    const transactions: TransactionDTO[] = [
      {
        amount: 18000,
        isCart: true,
        paidByMe: true,
        payeeName: 'Comune di Milano',
        payeeTaxCode: 'MI_XXX',
        registeredToMe: true,
        transactionDate: '2024-03-27T15:52:15Z',
        transactionId: '1'
      },
      {
        amount: 6520,
        isCart: true,
        paidByMe: true,
        registeredToMe: true,
        transactionDate: '2022-08-10T15:52:15Z',
        transactionId: '2'
      },
      {
        isCart: true,
        paidByMe: true,
        registeredToMe: true,
        transactionDate: '2022-08-10T15:52:15Z'
      }
    ];

    const rows: TransactionProps[] = [
      {
        date: '03/27/2024',
        amount: '180,00\xa0€',
        id: '1',
        payee: {
          name: 'Comune di Milano',
          srcImg: 'https://assets.cdn.io.italia.it/logos/organizations/MI_XXX.png',
          altImg: 'Logo Ente'
        },
        status: {
          label: 'Pagato',
          color: 'success'
        }
      },
      {
        date: '08/10/2022',
        amount: '65,20\xa0€',
        id: '2',
        payee: {
          name: 'Multi',
          altImg: 'Logo Ente'
        },
        status: {
          label: 'Pagato',
          color: 'success'
        }
      },
      {
        date: '08/10/2022',
        amount: utils.config.missingValue,
        id: utils.config.missingValue,
        payee: {
          name: 'Multi',
          altImg: 'Logo Ente'
        },
        status: {
          label: 'Pagato',
          color: 'success'
        }
      }
    ];
    expect(
      JSON.stringify(
        utils.converters.prepareRowsData({
          transactions,
          status: { label: 'Pagato' },
          payee: { multi: 'Multi' },
          action: jest.fn()
        })
      )
    ).toBe(JSON.stringify(rows));
  });

  it('should output an empty array when no data', () => {
    expect(
      JSON.stringify(
        utils.converters.prepareRowsData({
          transactions: undefined,
          status: { label: 'Pagato' },
          payee: { multi: 'Multi' },
          action: jest.fn()
        })
      )
    ).toBe('[]');
  });

  it('should return the correct png when given a tax code with leading zeroes', () => {
    const transactions: TransactionDTO[] = [
      {
        amount: 18000,
        isCart: true,
        paidByMe: true,
        payeeName: 'Comune di Milano',
        payeeTaxCode: '00493410583',
        registeredToMe: true,
        transactionDate: '2024-03-27T15:52:15Z',
        transactionId: '1'
      }
    ];
    const result = utils.converters.prepareRowsData({
      transactions,
      status: { label: 'Pagato' },
      payee: { multi: 'Multi' },
      action: jest.fn()
    });

    expect(result[0].payee.srcImg).toBe(
      'https://assets.cdn.io.italia.it/logos/organizations/493410583.png'
    );
  });
});

describe('return a transactionDetail object', () => {
  it('should return a transaction detail object', () => {
    const resp: TransactionDetailsDTO = {
      infoTransaction: {
        transactionId: 'string',
        authCode: 'string',
        rrn: 'string',
        transactionDate: 'string',
        pspName: 'string',
        walletInfo: { accountHolder: 'string', brand: 'string', blurredNumber: 'string' },
        paymentMethod: 'BBT',
        payer: { name: 'string', taxCode: 'string' },
        amount: 1000,
        fee: 100,
        origin: 'INTERNAL'
      },
      carts: [
        {
          subject: 'string',
          amount: 10000,
          payee: { name: 'string', taxCode: 'string' },
          debtor: { name: 'string', taxCode: 'string' },
          refNumberValue: 'string',
          refNumberType: 'string'
        }
      ]
    };

    expect(utils.converters.prepareTransactionDetailData(resp)).toHaveProperty('transactionId');
  });
});

describe('return a transactionDetail object even if the response is empty', () => {
  it('should return a transaction detail object', () => {
    const resp: TransactionDetailsDTO = {
      infoTransaction: {},
      carts: [{}]
    };

    expect(utils.converters.prepareTransactionDetailData(resp)).toHaveProperty('transactionId');
  });
});

describe('withMissingValue hoc', () => {
  const { toEuro, withMissingValue } = utils.converters;
  const { missingValue } = utils.config;

  const toEuroWithMissingValue = withMissingValue(toEuro);
  it('should return the global missing value character', () => {
    expect(toEuroWithMissingValue(undefined)).toEqual(missingValue);
    expect(toEuroWithMissingValue(undefined, 2)).toEqual(missingValue);
  });

  it('should return a custom value #', () => {
    const toEuroWithMissingValue = withMissingValue(toEuro, '#');
    expect(toEuroWithMissingValue(undefined)).toEqual('#');
  });

  it('should return a proper value', () => {
    expect(toEuroWithMissingValue(50)).toEqual('0,50\xa0€');
  });
});

describe('prepare notice list', () => {
  it('should convert correctly', () => {
    const data: PaymentNoticeDTO[] = [
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
            dueDate: '2024-10-30T20:00:00',
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
            numberOfInstallments: 1,
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
    ];

    const expected: PaymentNotices[] = [
      {
        id: '99999000013-m1ugqdl17m37b93pq1butmgufl6qhlcq',
        payee: {
          name: 'EC Demo Pagamenti Pull Test',
          srcImg: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
          altImg: 'EC Demo Pagamenti Pull Test'
        },
        paymentInfo: 'Test Pull - unica opzione',
        amount: '5,88\xa0€',
        expiringDate: '10/30/2024'
      },
      {
        id: '99999000013-aem6jhw5r8ac354id0siqtddw00oq9aj',
        payee: {
          name: 'EC Demo Pagamenti Pull Test',
          srcImg: 'https://assets.cdn.io.italia.it/logos/organizations/99999000013.png',
          altImg: 'EC Demo Pagamenti Pull Test'
        },
        paymentInfo: utils.config.missingValue,
        amount: utils.config.missingValue,
        expiringDate: utils.config.missingValue
      }
    ];

    expect(JSON.stringify(utils.converters.preparePaymentNoticeListData(data))).toEqual(
      JSON.stringify(expected)
    );
  });
});
