export interface PaymentNoticeDetail {
  amount: string;
  creditorEntity: string;
  subject: string;
  due: string;
  noticeCode: string;
  entityFiscalCode: string;
  firstInstallmentDate: string;
  firstInstallmentAmount: string;
}
