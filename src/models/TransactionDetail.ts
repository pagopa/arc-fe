export interface TransactionDetail {
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
  transactionId: string;
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
