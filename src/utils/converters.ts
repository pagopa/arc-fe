import { transactionProps } from 'components/Transactions/Transaction';
import { TransactionsResponse } from '../../generated/apiClient';
import { TransactionDetailResponse } from '../../generated/apiClient';
import { TransactionDetail } from 'models/TransactionDetail';
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

const { ENTITIES_LOGO_CDN } = process.env;

/** This function transforms Transaction[] list returned by transaction service into transactionProps[] item */
const prepareRowsData = (data: PrepareRowsData): transactionProps[] =>
  data.transactions.map((element) => ({
    date: element.transactionDate,
    amount: toEuro(element.amount),
    id: element.transactionId,
    payee: {
      name: element.payeeName || data.payee.multi,
      // update here the cdn host when avaiable
      srcImg: element.payeeTaxCode ? `${ENTITIES_LOGO_CDN}/${element.payeeTaxCode}.png` : undefined,
      altImg: data.payee.altImg || `Logo Ente`
    },
    // needs to be updated when status can be different from success
    status: {
      label: data.status.label,
      color: 'success'
    },
    action: data.action
  }));

const prepareTransactionDetailData = (
  transactionDetail: TransactionDetailResponse
): TransactionDetail => {
  const formatter = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 2 });
  return {
    paidBy: transactionDetail.infoTransaction.payer?.name || '-',
    authCode: transactionDetail.infoTransaction.authCode || '-',
    transactionId: transactionDetail.infoTransaction.transactionId || '-',
    PRN: transactionDetail.infoTransaction.rrn || '-',
    owedBy: transactionDetail.carts[0].debtor?.name || '-',
    owedByFiscalCode: transactionDetail.carts[0].debtor?.taxCode || '-',
    paymentMethod: transactionDetail.infoTransaction.paymentMethod || '-',
    cardNumber: transactionDetail.infoTransaction.walletInfo?.blurredNumber || '-',
    PSP: transactionDetail.infoTransaction.pspName || '-',
    dateTime: transactionDetail.infoTransaction.transactionDate || '-',
    subject: transactionDetail.carts[0].subject || '-',
    debtor: transactionDetail.carts[0].debtor?.name || '-',
    debtorFiscalCode: transactionDetail.carts[0].debtor?.taxCode || '-',
    creditorEntity: transactionDetail.carts[0].payee?.name || '-',
    creditorFiscalCode: transactionDetail.carts[0].payee?.taxCode || '-',
    noticeCode: transactionDetail.carts[0].refNumberValue || '-',
    partialAmount: (transactionDetail.infoTransaction.amount || '-') + ' €',
    fee: (transactionDetail.infoTransaction.fee || '-') + ' €',
    total:
      formatter.format(
        parseFloat(transactionDetail.infoTransaction.amount || '0') +
          parseFloat(transactionDetail.infoTransaction.fee || '0')
      ) + ' €',
    status: 'SUCCESS'
  };
};

export default {
  prepareRowsData,
  toEuro,
  prepareTransactionDetailData
};
