import utils from '.';
import { Transaction } from '../../generated/apiClient';
import { transactionProps } from 'components/Transactions/Transaction';

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
        },
        action: jest.fn()
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
        },
        action: jest.fn()
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
