import {
  PaymentNoticeDTO,
  PaymentOptionDTO,
  NoticeDetailsDTO,
  InfoNoticeDTO
} from '../../generated/apiClient';
import { NoticeDetail } from 'models/NoticeDetail';
import { DateFormat, datetools } from './datetools';
import utils from 'utils';
import {
  NoticeImage,
  PaymentInstallmentType,
  PaymentNoticeEnum,
  PaymentNoticeType,
  PaymentOptionMultiple,
  PaymentOptionSingle,
  PaymentOptionType
} from 'models/PaymentNotice';
import { CartItem } from 'models/Cart';
import { ROUTES } from 'routes/routes';

// This high order function is useful to 'decorate' existing function to add
// the functionality to manage undefined (not optional) parameters and output a global character instead
const withMissingValue =
  <P extends unknown[], R>(f: (...args: P) => R, missingValue?: string) =>
  (...args: { [K in keyof P]: P[K] | undefined }) => {
    return [...args].every((arg) => arg !== undefined)
      ? f(...(args as P))
      : missingValue || utils.config.missingValue;
  };

export const fromTaxCodeToSrcImage = (payeeTaxCode: string) =>
  `${utils.config.entitiesLogoCdn}/${payeeTaxCode.replace(/^0+/, '')}.png`;

const toEuro = (amount: number, decimalDigits: number = 2, fractionDigits: number = 2): string =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount / Math.pow(10, decimalDigits));

export const toEuroOrMissingValue = withMissingValue(toEuro);
export const formatDateOrMissingValue = withMissingValue(datetools.formatDate);
export const propertyOrMissingValue = withMissingValue((property: string) => property);

const prepareNoticeDetailData = (noticeDetail: NoticeDetailsDTO): NoticeDetail | undefined => {
  const { infoNotice, carts } = noticeDetail;
  return (
    infoNotice && {
      ...(infoNotice.payer &&
        infoNotice.payer.name && {
          payer: {
            name: infoNotice.payer.name,
            taxCode: propertyOrMissingValue(infoNotice.payer.taxCode)
          }
        }),
      ...(infoNotice.walletInfo &&
        infoNotice.walletInfo.accountHolder &&
        infoNotice.walletInfo.blurredNumber &&
        infoNotice.walletInfo.brand && {
          walletInfo: {
            accountHolder: infoNotice.walletInfo.accountHolder,
            brand: infoNotice.walletInfo.brand,
            blurredNumber: infoNotice.walletInfo.blurredNumber,
            maskedEmail: infoNotice.walletInfo.maskedEmail
          }
        }),
      paymentMethod: propertyOrMissingValue(
        infoNotice.paymentMethod
      ) as InfoNoticeDTO['paymentMethod'],
      authCode: propertyOrMissingValue(infoNotice.authCode),
      eventId: propertyOrMissingValue(infoNotice.eventId),
      PRN: propertyOrMissingValue(infoNotice.rrn),
      PSP: propertyOrMissingValue(infoNotice.pspName),
      dateTime: formatDateOrMissingValue(infoNotice.noticeDate, {
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
      partialAmount: toEuroOrMissingValue(infoNotice.amount, 2),
      fee: toEuroOrMissingValue(infoNotice.fee, 2),
      total: toEuroOrMissingValue(infoNotice.totalAmount),
      status: 'SUCCESS',
      origin: infoNotice.origin
    }
  );
};

/**
 * Transforms a PaymentOptionDTO into a PaymentOptionType.
 *
 * installments is transformed in an object if the
 * payment notice is of type SINGLE
 *
 * @param {PaymentOptionDTO} option - The payment option data transfer object.
 * @param {PaymentNoticeEnum} type - The type of the payment notice (SINGLE or MULTIPLE).
 * @returns {PaymentOptionType} The transformed payment option object.
 */
const transformPaymentOption = (
  option: PaymentOptionDTO,
  type: PaymentNoticeEnum
): PaymentOptionType => {
  const normalizedInstallments = option.installments.map<PaymentInstallmentType>(
    (installments) => ({
      ...installments,
      dueDate: formatDateOrMissingValue(installments.dueDate),
      amount: toEuroOrMissingValue(installments.amount)
    })
  );

  const out = {
    ...option,
    amount: toEuroOrMissingValue(option.amount),
    // TODO handle missing amount
    amountValue: option?.amount || 0,
    dueDate: formatDateOrMissingValue(option.dueDate),
    description: propertyOrMissingValue(option.description),
    installments:
      type == PaymentNoticeEnum.SINGLE ? normalizedInstallments[0] : normalizedInstallments
  };
  return out;
};

/**
 * Transforms a PaymentNoticeDTO into a PaymentNoticeType.
 *
 * Determines whether it's a single or multiple payment notice based on paymentOptions.length
 * and transform options and installments accordingly, changing them from a list to an object
 *
 * @param {PaymentNoticeDTO} paymentNotice - The payment notice data transfer object.
 * @returns {PaymentNoticeType} The transformed payment notice object, either as single or multiple type.
 */
const normalizePaymentNotice = (paymentNotice: PaymentNoticeDTO): PaymentNoticeType => {
  const image: NoticeImage = {
    src: fromTaxCodeToSrcImage(paymentNotice.paTaxCode),
    alt: paymentNotice.paFullName
  };
  if (paymentNotice.paymentOptions.length === 1) {
    return {
      ...paymentNotice,
      image,
      type: PaymentNoticeEnum.SINGLE,
      paymentOptions: transformPaymentOption(
        paymentNotice.paymentOptions[0],
        PaymentNoticeEnum.SINGLE
      ) as PaymentOptionSingle
    };
  } else {
    return {
      ...paymentNotice,
      image,
      type: PaymentNoticeEnum.MULTIPLE,
      paymentOptions: paymentNotice.paymentOptions.map((paymentOption) =>
        transformPaymentOption(paymentOption, PaymentNoticeEnum.MULTIPLE)
      ) as PaymentOptionMultiple[]
    };
  }
};

const cartItemsToCartsRequest = (cartItems: CartItem[]) => {
  const ORIGIN = window.location.origin;
  const isAnonymous = utils.storage.user.isAnonymous();

  return {
    paymentNotices: cartItems.map((item) => ({
      amount: item.amount,
      companyName: item.paFullName,
      description: item.description,
      fiscalCode: item.paTaxCode,
      noticeNumber: item.nav
    })),
    returnUrls: {
      returnOkUrl: `${ORIGIN}${isAnonymous ? `${ROUTES.COURTESY_PAGE}?outcome=pagamento-avviso-completato` : ROUTES.DASHBOARD}?fromAction=payment-success`,
      returnCancelUrl: `${ORIGIN}${isAnonymous ? `${ROUTES.COURTESY_PAGE}?outcome=pagamento-annullato` : ROUTES.DEBT_POSITIONS}?fromAction=payment-cancel`,
      returnErrorUrl: `${ORIGIN}${isAnonymous ? `${ROUTES.COURTESY_PAGE}?outcome=pagamento-non-riuscito` : ROUTES.DEBT_POSITIONS}?fromAction=payment-error`
    }
  };
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function extractFilename(header: string): string | null {
  const filenameMatch = /filename=["']?([^"';]+)["']?/i.exec(header);
  return filenameMatch ? filenameMatch[1].trim() : null;
}

export default {
  normalizePaymentNotice,
  prepareNoticeDetailData,
  cartItemsToCartsRequest,
  toEuro,
  withMissingValue,
  capitalizeFirstLetter: withMissingValue(capitalizeFirstLetter),
  extractFilename
};
