import { TransactionDetailResponse } from '../../generated/apiClient';
import utils from '.';
import '@testing-library/jest-dom';

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
