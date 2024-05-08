import { transactionProps } from 'components/Transactions/Transaction';
import { TransactionsResponse } from '../../generated/apiClient';

const toEuro = (amount: string): string => `${amount} €`;

interface PrepareRowsData {
  transactions: TransactionsResponse;
  status: {
    label: string;
    color?: string;
  };
  payee: {
    /** text to shown when more than an entities are in involed within a single transaction */
    multi: string;
    /** alt text for entity logo */
    altImg?: string;
  };
  action: (id: string) => void;
}

/** This function transforms Transaction[] list returned by transaction service into transactionProps[] item */
const prepareRowsData = (data: PrepareRowsData): transactionProps[] =>
  data.transactions.map((element) => ({
    date: element.transactionDate,
    amount: toEuro(element.amount),
    id: element.transactionId,
    payee: {
      name: element.payeeName || data.payee.multi,
      // update here the cdn host when avaiable
      srcImg: element.payeeTaxCode ? `http://cdn.com/${element.payeeTaxCode}.png` : undefined,
      altImg: data.payee.altImg || `Logo Ente`
    },
    // needs to be updated when status can be different from success
    status: {
      label: data.status.label,
      color: 'success'
    },
    action: data.action
  }));

export default {
  prepareRowsData,
  toEuro
};
