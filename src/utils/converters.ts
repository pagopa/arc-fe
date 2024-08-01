import { TransactionProps } from 'components/Transactions/Transaction';
import { TransactionDetailsDTO, TransactionsListDTO } from '../../generated/apiClient';
import { TransactionDetail } from 'models/TransactionDetail';
import { PaymentNoticeDetail } from 'models/PaymentNoticeDetail';
import { DateFormat, datetools } from './datetools';
import utils from '.';
import { PaymentNotices } from 'components/PaymentNotice/List';
import { PaymentNoticeDTO } from '../../generated/data-contracts';

// This high order function is usefull to 'decorate' existing function to add
// the functionality to manage undefined (not optional) paramaters and output a global character instead
const withMissingValue =
  <P extends unknown[], R>(f: (...args: P) => R, missingValue?: string) =>
  (...args: { [K in keyof P]: P[K] | undefined }) => {
    return [...args].every((arg) => arg !== undefined)
      ? f(...(args as P))
      : missingValue || utils.config.missingValue;
  };

const fromTaxCodeToSrcImage = (payeeTaxCode: string) =>
  `${utils.config.entitiesLogoCdn}/${payeeTaxCode.replace(/^0+/, '')}.png`;

const toEuro = (amount: number, decimalDigits: number = 2, fractionDigits: number = 2): string =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount / Math.pow(10, decimalDigits));

const toEuroOrMissingValue = withMissingValue(toEuro);
const formatDateOrMissingValue = withMissingValue(datetools.formatDate);
const propertyOrMissingValue = withMissingValue((property: string) => property);

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
      date: formatDateOrMissingValue(element.transactionDate),
      amount: toEuroOrMissingValue(element.amount),
      id: propertyOrMissingValue(element.transactionId),
      payee: {
        name: element.payeeName || data.payee.multi,
        srcImg: element.payeeTaxCode && fromTaxCodeToSrcImage(element.payeeTaxCode),
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
  const total =
    infoTransaction?.amount && infoTransaction?.fee && infoTransaction.amount + infoTransaction.fee;
  return (
    infoTransaction && {
      ...(infoTransaction.payer &&
        infoTransaction.payer.name && {
          payer: {
            name: infoTransaction.payer.name,
            taxCode: propertyOrMissingValue(infoTransaction.payer.taxCode)
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
      paymentMethod: propertyOrMissingValue(infoTransaction.paymentMethod),
      authCode: propertyOrMissingValue(infoTransaction.authCode),
      transactionId: propertyOrMissingValue(infoTransaction.transactionId),
      PRN: propertyOrMissingValue(infoTransaction.rrn),
      PSP: propertyOrMissingValue(infoTransaction.pspName),
      dateTime: formatDateOrMissingValue(infoTransaction.transactionDate, {
        format: DateFormat.LONG,
        withTime: true,
        second: '2-digit'
      }),
      subject: propertyOrMissingValue(carts?.[0].subject),
      debtor: propertyOrMissingValue(carts?.[0].debtor?.name),
      debtorFiscalCode: propertyOrMissingValue(carts?.[0].debtor?.taxCode),
      creditorEntity: propertyOrMissingValue(carts?.[0].payee?.name),
      creditorFiscalCode: propertyOrMissingValue(carts?.[0].payee?.taxCode),
      noticeCode: propertyOrMissingValue(carts?.[0].refNumberValue),
      partialAmount: toEuroOrMissingValue(infoTransaction.amount, 2),
      fee: toEuroOrMissingValue(infoTransaction.fee, 2),
      total: toEuroOrMissingValue(total),
      status: 'SUCCESS'
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preparePaymentNoticeDetailData = (paymentNoticeDetail: any): PaymentNoticeDetail => {
  return {
    amount: toEuroOrMissingValue(paymentNoticeDetail.amount),
    paFullName: propertyOrMissingValue(paymentNoticeDetail.paFullName),
    subject: propertyOrMissingValue(paymentNoticeDetail.subject),
    dueDate: formatDateOrMissingValue(paymentNoticeDetail.dueDate),
    iupd: propertyOrMissingValue(paymentNoticeDetail.iupd),
    paTaxCode: propertyOrMissingValue(paymentNoticeDetail.paTaxCode),
    firstInstallmentDate: formatDateOrMissingValue(paymentNoticeDetail.firstInstallmentDate),
    firstInstallmentAmount: toEuroOrMissingValue(paymentNoticeDetail.firstInstallmentAmount)
  };
};

const preparePaymentNoticeListData = (data: PaymentNoticeDTO[]): PaymentNotices[] =>
  data.map((element) => ({
    id: element.iupd,
    payee: {
      name: element.paFullName,
      srcImg: fromTaxCodeToSrcImage(element.paTaxCode),
      altImg: element.paFullName
    },
    // here we are assuming to receive only notices with one payments method
    paymentInfo: propertyOrMissingValue(element.paymentOptions[0].description),
    amount: toEuroOrMissingValue(element.paymentOptions[0].amount),
    expiringDate: formatDateOrMissingValue(element.paymentOptions[0].dueDate)
  }));

export default {
  prepareRowsData,
  toEuro,
  prepareTransactionDetailData,
  preparePaymentNoticeListData,
  preparePaymentNoticeDetailData,
  withMissingValue
};
