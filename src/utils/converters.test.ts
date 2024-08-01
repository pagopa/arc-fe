import utils from '.';
import { TransactionDTO } from '../../generated/apiClient';
import { TransactionProps } from 'components/Transactions/Transaction';
import { TransactionDetailsDTO } from '../../generated/apiClient';
import '@testing-library/jest-dom';

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
        amount: '-',
        id: '',
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
