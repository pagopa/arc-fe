import utils from 'utils';
import { useQuery } from '@tanstack/react-query';

const getTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data: transactions } = await utils.apiClient.transactions.getTransactionsList();
      utils.zodSchema.transactionsListDTOSchema.parse(transactions);
      return transactions;
    }
  });

const getTransactionDetails = (id: string) => {
  console.log(id);
  return {};
};
// useQuery({
//   queryKey: ['transactionDetail'],
//   queryFn: async () => {
//     const { data: transaction } = await utils.apiClient.transactions.getTransactionDetails(id);
//     utils.zodSchema.transactionDetailResponseSchema.parse(transaction);
//     return transaction;
//   }
// });

const getPaymentNotices = () => ({
  isError: false,
  data: [
    {
      payee: {
        name: 'Politecnico di Milano'
      },
      id: 1,
      paymentInfo: 'RATA 1 - Anno Accademico 2023/2024',
      amount: '171,00 €',
      expiringDate: '31/01/2099'
    },
    {
      payee: {
        name: 'Comune di Milano'
      },
      id: 2,
      paymentInfo: 'TARI 2024',
      amount: '171,00 €',
      multiPayment: true
    },
    {
      payee: {
        name: 'Comune di Milano'
      },
      id: 3,
      paymentInfo: 'Violazione CDS Verbale 0123456',
      amount: '28,70 €',
      multiPayment: true
    },
    {
      payee: {
        name: 'Istituto d’Istruzione Superiore con un nome Molto Lungo che può andare su più righe'
      },
      id: 4,
      paymentInfo: 'Iscrizione Anno Accademico 2023/2024',
      amount: '171,00 €',
      expiringDate: '31/01/2099'
    }
  ]
});
export default {
  getTransactions,
  getTransactionDetails,
  getPaymentNotices
};
