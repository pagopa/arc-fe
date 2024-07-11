import { TransactionProps } from 'components/Transactions/Transaction';
import { TransactionDetailsDTO, TransactionsListDTO } from '../../generated/apiClient';
import { TransactionDetail } from 'models/TransactionDetail';
import { PaymentNoticeDetail } from 'models/PaymentNoticeDetail';
import { DateFormat, datetools } from './datetools';
import utils from 'utils';

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

const prepareTransactionDetailData = (
  transactionDetail: TransactionDetailsDTO
): TransactionDetail | undefined => {
  const { infoTransaction, carts } = transactionDetail;
  const { missingValue } = utils.config;
  return (
    infoTransaction && {
      ...(infoTransaction.payer &&
        infoTransaction.payer.name && {
          payer: {
            name: infoTransaction.payer.name,
            taxCode: infoTransaction.payer.taxCode || missingValue
          }
        }),
      ...(infoTransaction.walletInfo &&
        infoTransaction.walletInfo.accountHolder &&
        infoTransaction.walletInfo.blurredNumber &&
        infoTransaction.walletInfo.brand && {
          walletInfo: {
            accountHolder: infoTransaction.walletInfo.accountHolder,
            brand: infoTransaction.walletInfo.brand,
            cardNumber: infoTransaction.walletInfo.blurredNumber
          }
        }),
      paymentMethod: infoTransaction.paymentMethod || missingValue,
      authCode: infoTransaction.authCode || missingValue,
      transactionId: infoTransaction.transactionId || missingValue,
      PRN: infoTransaction.rrn || missingValue,
      PSP: infoTransaction.pspName || missingValue,
      dateTime: datetools.formatDate(infoTransaction.transactionDate, {
        format: DateFormat.LONG,
        withTime: true,
        second: '2-digit'
      }),
      subject: carts?.[0].subject || missingValue,
      debtor: carts?.[0].debtor?.name || missingValue,
      debtorFiscalCode: carts?.[0].debtor?.taxCode || missingValue,
      creditorEntity: carts?.[0].payee?.name || missingValue,
      creditorFiscalCode: carts?.[0].payee?.taxCode || missingValue,
      noticeCode: carts?.[0].refNumberValue || missingValue,
      partialAmount: infoTransaction.amount ? toEuro(infoTransaction.amount, 2) : missingValue,
      fee: infoTransaction.fee ? toEuro(infoTransaction.fee, 2) : missingValue,
      total:
        infoTransaction.amount && infoTransaction.fee
          ? toEuro(infoTransaction.amount + infoTransaction.fee)
          : missingValue,
      status: 'SUCCESS'
    }
  );
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
