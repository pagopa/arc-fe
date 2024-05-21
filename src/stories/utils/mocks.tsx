import { TransactionProps } from 'components/Transactions/Transaction';
import { TransactionDetail } from 'models/TransactionDetail';
import { TransactionReceiptResponse } from '../../../generated/apiClient';

const Transaction_dc379158: TransactionProps = {
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
  amount: '123,50 €'
};

const Transaction_ffe1324e: TransactionProps = {
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
  amount: '100,00 €'
};

const Transaction_a305f59a: TransactionProps = {
  payee: {
    name: 'Avvisi multipli'
  },
  id: 'a305f59a',
  date: '03/11/2023',
  status: {
    label: 'Pagato',
    color: 'success'
  },
  amount: '274,50 €'
};

const Transaction_3d40b8e0: TransactionProps = {
  payee: {
    name: 'Avvisi multipli'
  },
  id: '3d40b8e0',
  date: '12/08/2023',
  status: {
    label: 'Errore',
    color: 'error'
  },
  amount: '392,00 €'
};

const transactionDetail = {
  paidBy: 'Matteo Rossi',
  authCode: '1234567890123456800',
  transactionId: 'F57E2F8E-25FF-4183-AB7B-4…',
  PRN: '1234567890',
  owedBy: 'Matteo Rossi',
  owedByFiscalCode: 'MTTRSS74B23F205K',
  paymentMethod: 'Mastercard',
  cardNumber: '**** 1234',
  PSP: 'Nexi',
  dateTime: '11/02/2023',
  subject: ' Bollo auto 2023',
  debtor: 'Matteo Rossi',
  debtorFiscalCode: 'MTTRSS74B23F205K',
  creditorEntity: 'ACI',
  creditorFiscalCode: '00000000',
  noticeCode: '0000 0000 0000 0000',
  partialAmount: '250',
  fee: '1',
  total: '251',
  status: 'Pagato'
};

const transactionReceipt = {
  attachments: [
    {
      content_type: 'application/pdf',
      id: 'id_allegato',
      name: 'ricevuta 1',
      url: 'mocked-url'
    }
  ]
};
export const dummyTransactionsData: {
  all: TransactionProps[];
  payedByMe: TransactionProps[];
  ownedByMe: TransactionProps[];
  transactionData: TransactionDetail;
  transactionReceipt: TransactionReceiptResponse;
} = {
  all: [Transaction_dc379158, Transaction_ffe1324e, Transaction_a305f59a, Transaction_3d40b8e0],
  payedByMe: [Transaction_dc379158, Transaction_ffe1324e],
  ownedByMe: [Transaction_a305f59a, Transaction_3d40b8e0],
  transactionData: transactionDetail,
  transactionReceipt
};
