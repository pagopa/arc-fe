import { TransactionProps } from 'components/Transactions/Transaction';
import {
  PaymentNoticeDTO,
  PaymentNoticesListDTO,
  PaymentOptionDTO,
  TransactionDetailsDTO,
  TransactionsListDTO
} from '../../generated/apiClient';
import { TransactionDetail } from 'models/TransactionDetail';
import { DateFormat, datetools } from './datetools';
import utils from 'utils';
import {
  NoticeImage,
  PaymentInstallmentType,
  PaymentNoticeEnum,
  PaymentNoticeSingleType,
  PaymentNoticeType,
  PaymentOptionType
} from 'models/PaymentNotice';

// This high order function is useful to 'decorate' existing function to add
// the functionality to manage undefined (not optional) parameters and output a global character instead
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

// Function to transform PaymentOptionDTO to PaymentOptionType
const transformPaymentOption = (option: PaymentOptionDTO): PaymentOptionType => ({
  ...option,
  amount: toEuroOrMissingValue(option.amount),
  // TODO handle missing amount
  amountValue: option?.amount || 0,
  dueDate: formatDateOrMissingValue(option.dueDate),
  description: propertyOrMissingValue(option.description),
  installments: option.installments.map<PaymentInstallmentType>((installments) => ({
    ...installments,
    dueDate: formatDateOrMissingValue(installments.dueDate),
    amount: toEuroOrMissingValue(installments.amount)
  }))
});

// Function to transform PaymentNoticeDTO to PaymentNoticeType
const transformPaymentNotice = (paymentNotice: PaymentNoticeDTO): PaymentNoticeType => {
  const image: NoticeImage = {
    src: fromTaxCodeToSrcImage(paymentNotice.paTaxCode),
    alt: paymentNotice.paFullName
  };
  if (paymentNotice.paymentOptions.length === 1) {
    return {
      ...paymentNotice,
      image,
      type: PaymentNoticeEnum.SINGLE,
      paymentOptions: transformPaymentOption(paymentNotice.paymentOptions[0])
    };
  } else {
    return {
      ...paymentNotice,
      image,
      type: PaymentNoticeEnum.MULTIPLE,
      paymentOptions: paymentNotice.paymentOptions.map(transformPaymentOption)
    };
  }
};

const prepareNoticesData = (data: PaymentNoticesListDTO | undefined) => {
  const transformed = data?.paymentNotices?.map((notice) => transformPaymentNotice(notice));

  return { paymentNotices: transformed };
};

const singleNoticeToCartsRequest = (paymentNotice: PaymentNoticeSingleType) => ({
  paymentNotices: [
    {
      amount: paymentNotice.paymentOptions.amountValue,
      companyName: paymentNotice.paFullName,
      description: paymentNotice.paymentOptions.description,
      fiscalCode: paymentNotice.paTaxCode,
      noticeNumber: paymentNotice.iupd
    }
  ],
  returnUrls: {
    returnOkUrl: utils.config.paymentReturnUrl,
    returnCancelUrl: utils.config.paymentReturnUrl,
    returnErrorUrl: utils.config.paymentReturnUrl
  }
});

export default {
  prepareNoticesData,
  prepareRowsData,
  prepareTransactionDetailData,
  singleNoticeToCartsRequest,
  toEuro,
  withMissingValue
};
