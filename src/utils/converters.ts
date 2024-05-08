import { TransactionDetailResponse } from '../../generated/apiClient';
import { TransactionDetail } from 'models/TransactionDetail';

const prepareTransactionDetailData = (
  transactionDetail: TransactionDetailResponse
): TransactionDetail => {
  return {
    paidBy: transactionDetail.infoTransaction.payer?.name || '-',
    authCode: transactionDetail.infoTransaction.authCode || '-',
    transactionId: transactionDetail.infoTransaction.transactionId || '-',
    PRN: transactionDetail.infoTransaction.rrn || '-',
    owedBy: transactionDetail.carts[0].debtor?.name || '-',
    owedByFiscalCode: transactionDetail.carts[0].debtor?.taxCode || '-',
    paymentMethod: transactionDetail.infoTransaction.paymentMethod || '-',
    cardNumber: transactionDetail.infoTransaction.walletInfo?.blurredNumber || '-',
    PSP: transactionDetail.infoTransaction.pspName || '-',
    dateTime: transactionDetail.infoTransaction.transactionDate || '-',
    subject: transactionDetail.carts[0].subject || '-',
    debtor: transactionDetail.carts[0].debtor?.name || '-',
    debtorFiscalCode: transactionDetail.carts[0].debtor?.taxCode || '-',
    creditorEntity: transactionDetail.carts[0].payee?.name || '-',
    creditorFiscalCode: transactionDetail.carts[0].payee?.taxCode || '-',
    noticeCode: transactionDetail.carts[0].refNumberValue || '-',
    partialAmount: (transactionDetail.infoTransaction.amount || '-') + ' €',
    fee: (transactionDetail.infoTransaction.fee || '-') + ' €',
    total:
      (
        parseFloat(transactionDetail.infoTransaction.amount || '0') +
        parseFloat(transactionDetail.infoTransaction.fee || '0')
      ).toString() + ' €',
    status: 'SUCCESS'
  };
};

export default { prepareTransactionDetailData };
