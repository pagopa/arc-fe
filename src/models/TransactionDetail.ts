export interface TransactionDetail {
  payer: {
    name: string;
    taxCode: string;
  };
  authCode: string;
  transactionId: string;
  PRN: string;
  paymentMethod: string;
  cardNumber: string;
  accountHolder: string;
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
