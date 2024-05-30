import utils from 'utils';
import { useQuery } from '@tanstack/react-query';

const getTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data: transactions } = await utils.apiClient.transactions.getTransactionList();
      utils.zodSchema.transactionsResponseSchema.parse(transactions);
      return transactions;
    }
  });

const getTransactionDetails = (id: string) =>
  useQuery({
    queryKey: ['transactionDetail'],
    queryFn: async () => {
      const { data: transaction } = await utils.apiClient.transactions.getTransactionDetails(id);
      utils.zodSchema.transactionDetailResponseSchema.parse(transaction);
      return transaction;
    }
  });

export default {
  getTransactions,
  getTransactionDetails
};
