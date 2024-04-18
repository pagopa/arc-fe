import { transactionProps } from 'components/Transactions/Transaction';
import { fn } from '@storybook/test';

const Transaction_dc379158: transactionProps = {
  payee: {
    name: 'Regione Lombardia',
    srcImg: '/regione-lombardia.svg',
    altImg: 'Regione Lombardia'
  },
  id: 'dc379158',
  date: '01/12/2023',
  status: {
    label: 'Pagato',
    color: 'success'
  },
  amount: '123,50 €',
  detailsButton: {
    text: 'Vedi i dettagli',
    action: fn()
  }
};

const Transaction_ffe1324e: transactionProps = {
  payee: {
    name: 'ACI',
    srcImg: '/aci.svg',
    altImg: 'ACI'
  },
  id: 'ffe1324e',
  date: '16/11/2023',
  status: {
    label: 'Pagato',
    color: 'success'
  },
  amount: '100,00 €',
  detailsButton: {
    text: 'Vedi i dettagli',
    action: fn()
  }
};

const Transaction_a305f59a: transactionProps = {
  payee: {
    name: 'Avvisi multipli'
  },
  id: 'a305f59a',
  date: '03/11/2023',
  status: {
    label: 'Pagato',
    color: 'success'
  },
  amount: '274,50 €',
  detailsButton: {
    text: 'Vedi i dettagli',
    action: fn()
  }
};

const Transaction_3d40b8e0: transactionProps = {
  payee: {
    name: 'Avvisi multipli'
  },
  id: '3d40b8e0',
  date: '12/08/2023',
  status: {
    label: 'Errore',
    color: 'error'
  },
  amount: '392,00 €',
  detailsButton: {
    text: 'Vedi i dettagli',
    action: fn()
  }
};

export const dummyTransactionsData: {
  all: transactionProps[];
  payedByMe: transactionProps[];
  ownedByMe: transactionProps[];
} = {
  all: [Transaction_dc379158, Transaction_ffe1324e, Transaction_a305f59a, Transaction_3d40b8e0],
  payedByMe: [Transaction_dc379158, Transaction_ffe1324e],
  ownedByMe: [Transaction_a305f59a, Transaction_3d40b8e0]
};
