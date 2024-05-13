import utils from '.';
import { Transaction } from '../../generated/apiClient';
import { transactionProps } from 'components/Transactions/Transaction';
import { TransactionDetailResponse } from '../../generated/apiClient';
import '@testing-library/jest-dom';

describe('toEuro function', () => {
  it('should add correctly the euro symbol', () => {
    expect(utils.converters.toEuro('108,22')).toBe('108,22 €');
  });
});

describe('prepareRowsData function', () => {
  it('should covert correctly from a Transaction[] shape to the euro symbol', () => {
    const transactions: Transaction[] = [
      {
        amount: '180,00',
        isCart: true,
        payedByMe: true,
        payeeName: 'Comune di Milano',
        payeeTaxCode: 'MI_XXX',
        registeredToMe: true,
        transactionDate: '27/03/2024',
        transactionId: '1'
      },
      {
        amount: '65,20',
        isCart: true,
        payedByMe: false,
        registeredToMe: true,
        transactionDate: '10/08/2022',
        transactionId: '2'
      }
    ];

    const rows: transactionProps[] = [
      {
        date: '27/03/2024',
        amount: '180,00 €',
        id: '1',
        payee: {
          name: 'Comune di Milano',
          srcImg: 'http://cdn.com/MI_XXX.png',
          altImg: 'Logo Ente'
        },
        status: {
          label: 'Pagato',
          color: 'success'
        }
      },
      {
        date: '10/08/2022',
        amount: '65,20 €',
        id: '2',
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
});

describe('return a transactiondetail object', () => {
  it('should return a transaction detail object', () => {
    const resp: TransactionDetailResponse = {
      infoTransaction: {
        transactionId: 'string',
        authCode: 'string',
        rrn: 'string',
        transactionDate: 'string',
        pspName: 'string',
        walletInfo: { accountHolder: 'string', brand: 'string', blurredNumber: 'string' },
        paymentMethod: 'BBT',
        payer: { name: 'string', taxCode: 'string' },
        amount: 'string',
        fee: 'string',
        origin: 'INTERNAL'
      },
      carts: [
        {
          subject: 'string',
          amount: 'string',
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

describe('return a transactiondetail object even if the reponse is empty', () => {
  it('should return a transaction detail object', () => {
    const resp: TransactionDetailResponse = {
      infoTransaction: {},
      carts: [{}]
    };

    expect(utils.converters.prepareTransactionDetailData(resp)).toHaveProperty('transactionId');
  });
});
