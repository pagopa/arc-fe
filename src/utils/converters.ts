import { transactionProps } from 'components/Transactions/Transaction';
import { TransactionsResponse } from '../../generated/apiClient';
import { NavigateFunction } from 'react-router-dom';
import { TFunction } from 'i18next/typescript/t';
import { ArcRoutes } from 'routes/routes';

const toEuro = (amount: string): string => `${amount} €`;

/** This function transforms Transaction[] list returned by transaction service into transactionProps[] item */
const prepareRowsData = (
  transactions: TransactionsResponse,
  t: TFunction<'translation', undefined>,
  navigate: NavigateFunction
): transactionProps[] =>
  transactions.map((element) => ({
    date: element.transactionDate,
    amount: toEuro(element.amount),
    id: element.transactionId,
    payee: {
      name: element.payeeName || t('app.transactions.multiEntities'),
      // update here the cdn host when avaiable
      srcImg: element.payeeTaxCode ? `http://cdn.com/${element.payeeTaxCode}.png` : undefined,
      altImg: `Logo Ente`
    },
    status: {
      label: t('app.transactions.payed'),
      color: 'success'
    },
    action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
  }));

export default {
  prepareRowsData,
  toEuro
};
