export interface TransactionDetail {
  paidBy: string;
  authCode: number;
  transactionId: string;
  PRN: number;
  owedBy: string;
  owedByFiscalCode: string;
  paymentMethod: string;
  cardNumber: string;
  PSP: string;
  dateTime: Date;
  subject: string;
  debtor: string;
  debtorFiscalCode: string;
  creditorEntity: string;
  creditorFiscalCode: string;
  noticeCode: string;
  partialAmount: number;
  fee: number;
  total: number;
  status: string;
}
