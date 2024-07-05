import { TransactionProps } from 'components/Transactions/Transaction';
import { TransactionsListDTO } from '../../generated/apiClient';
// import { TransactionDetailResponse } from '../../generated/apiClient';
import { TransactionDetail } from 'models/TransactionDetail';
import utils from 'utils';
import { PaymentNoticeDetail } from 'models/PaymentNoticeDetail';
import { datetools } from './datetools';

const toEuro = (amount: number, decimalDigits: number = 2, fractionDigits: number = 2): string =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount / Math.pow(10, decimalDigits));
interface PrepareRowsData {
  transactions: TransactionsListDTO['transactions'];
  status: {
    label: string;
    color?: string;
  };
  payee: {
    /** text to shown when more than an entities are in involved within a single transaction */
    multi: string;
    /** alt text for entity logo */
    altImg?: string;
  };
  action: (id: string) => void;
}

/** This function transforms Transaction[] list returned by transaction service into transactionProps[] item */
const prepareRowsData = (data: PrepareRowsData): TransactionProps[] => {
  return (
    data.transactions?.map((element) => ({
      date: datetools.formatDate(element.transactionDate),
      amount: element.amount != undefined ? toEuro(element.amount) : '-',
      id: element.transactionId || '',
      payee: {
        name: element.payeeName || data.payee.multi,
        // update here the cdn host when available
        srcImg: element.payeeTaxCode
          ? `${utils.config.entitiesLogoCdn}/${element.payeeTaxCode}.png`
          : undefined,
        altImg: data.payee.altImg || `Logo Ente`
      },
      // needs to be updated when status can be different from success
      status: {
        label: data.status.label,
        color: 'success'
      },
      action: data.action
    })) || []
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareTransactionDetailData = (transactionDetail: any): TransactionDetail => {
  return {
    paidBy: transactionDetail.infoTransaction.payer?.name || '-',
    authCode: transactionDetail.infoTransaction.authCode || '-',
    transactionId: transactionDetail.infoTransaction.transactionId || '-',
    PRN: transactionDetail.infoTransaction.rrn || '-',
    paymentMethod: transactionDetail.infoTransaction.paymentMethod || '-',
    cardNumber: transactionDetail.infoTransaction.walletInfo?.blurredNumber || '-',
    PSP: transactionDetail.infoTransaction.pspName || '-',
    dateTime: datetools.formatDate(transactionDetail.infoTransaction.transactionDate),
    subject: transactionDetail.carts[0].subject || '-',
    debtor: transactionDetail.carts[0].debtor?.name || '-',
    debtorFiscalCode: transactionDetail.carts[0].debtor?.taxCode || '-',
    creditorEntity: transactionDetail.carts[0].payee?.name || '-',
    creditorFiscalCode: transactionDetail.carts[0].payee?.taxCode || '-',
    noticeCode: transactionDetail.carts[0].refNumberValue || '-',
    partialAmount: toEuro(transactionDetail.infoTransaction.amount, 2),
    fee: toEuro(transactionDetail.infoTransaction.fee, 2),
    total: toEuro(transactionDetail.infoTransaction.amount + transactionDetail.infoTransaction.fee),
    status: 'SUCCESS'
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preparePaymentNoticeDetailData = (paymentNoticeDetail: any): PaymentNoticeDetail => {
  return {
    amount: (paymentNoticeDetail.amount || '-') + ' €',
    paFullName: paymentNoticeDetail.paFullName || '-',
    subject: paymentNoticeDetail.subject || '-',
    dueDate: datetools.formatDate(paymentNoticeDetail.dueDate, { invalidDateOutput: '-' }),
    iupd: paymentNoticeDetail.iupd || '-',
    paTaxCode: paymentNoticeDetail.paTaxCode || '-',
    firstInstallmentDate: datetools.formatDate(paymentNoticeDetail.firstInstallmentDate, {
      invalidDateOutput: '-'
    }),
    firstInstallmentAmount: (paymentNoticeDetail.firstInstallmentAmount || '-') + ' €'
  };
};

export default {
  prepareRowsData,
  toEuro,
  prepareTransactionDetailData,
  preparePaymentNoticeDetailData
};
