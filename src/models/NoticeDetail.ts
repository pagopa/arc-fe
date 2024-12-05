export interface NoticeDetail {
  payer?: {
    name: string;
    taxCode?: string;
  };
  walletInfo?: {
    accountHolder: string;
    brand: string;
    cardNumber: string;
  };
  paymentMethod?: string;
  authCode: string;
  eventId: string;
  PRN: string;
  PSP: string;
  dateTime: string;
  subject: string;
  debtor: string;
  debtorFiscalCode: string;
  creditorEntity: string;
  creditorFiscalCode: string;
  noticeCode: string;
  partialAmount: string;
  fee: string;
  total: string;
  status: string;
}

export enum BRANDS {
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
  AMEX = 'AMEX',
  MAESTRO = 'MAESTRO',
  JCB = 'JCB',
  OTHER = 'OTHER',
  DINERS = 'DINERS',
  DISCOVER = 'DISCOVER',
  UNIONPAY = 'UNIONPAY'
}
