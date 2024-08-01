import utils from 'utils';
import { useQuery } from '@tanstack/react-query';
import { ZodSchema } from 'zod';

const parseAndLog = <T>(schema: ZodSchema, data: T, throwError: boolean = true): void | never => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(result.error.issues);
    if (throwError) throw result.error;
  }
};

const getTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data: transactions } = await utils.apiClient.transactions.getTransactionsList();
      parseAndLog(utils.zodSchema.transactionsListDTOSchema, transactions);
      return transactions;
    }
  });

const getTransactionDetails = (id: string) =>
  useQuery({
    queryKey: ['transactionDetail'],
    queryFn: async () => {
      const { data: transaction } = await utils.apiClient.transactions.getTransactionDetails(id);
      parseAndLog(utils.zodSchema.transactionDetailsDTOSchema, transaction);
      return transaction;
    }
  });

const getPaymentNotices = () =>
  useQuery({
    queryKey: ['paymentNotices'],
    queryFn: async () => {
      const { data } = await utils.apiClient.paymentNotices.getPaymentNotices({});
      // not throwing error here because we have a problem with date format
      // to be fixed
      parseAndLog(utils.zodSchema.paymentNoticesListDTOSchema, data, false);
      return data.paymentNotices;
    }
  });

export const getReceiptData = async (transactionId: string) => {
  const { data } = await utils.apiClient.transactions.getTransactionReceipt(transactionId, {
    format: 'blob'
  });

  return data;
};

const getTokenOneidentity = (code: string, state: string) =>
  useQuery({
    queryKey: ['tokenOneidentity'],
    queryFn: async () => {
      const { data: TokenResponse } = await utils.apiClient.token.getAuthenticationToken({
        code,
        state
      });
      utils.zodSchema.tokenResponseSchema.parse(TokenResponse);
      console.log('loader +++', TokenResponse);
      return TokenResponse;
    }
  });

export default {
  getTransactions,
  getTransactionDetails,
  getPaymentNotices,
  getReceiptData,
  getTokenOneidentity
};
