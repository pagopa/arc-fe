import { useQuery } from '@tanstack/react-query';
import { STATE } from 'store/types';
import utils from 'utils';
import { ZodSchema } from 'zod';
import * as zodSchema from '../../generated/zod-schema';

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
      parseAndLog(zodSchema.transactionsListDTOSchema, transactions);
      return transactions;
    }
  });

const getTransactionDetails = (id: string) =>
  useQuery({
    queryKey: ['transactionDetail'],
    queryFn: async () => {
      const { data: transaction } = await utils.apiClient.transactions.getTransactionDetails(id);
      parseAndLog(zodSchema.transactionDetailsDTOSchema, transaction);
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
      parseAndLog(zodSchema.paymentNoticesListDTOSchema, data, false);
      return data;
    }
  });

export const getReceiptData = async (transactionId: string) => {
  const { data } = await utils.apiClient.transactions.getTransactionReceipt(transactionId, {
    format: 'blob'
  });

  return data;
};

const getUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const { data: userInfo } = await utils.apiClient.auth.getUserInfo();
      parseAndLog(zodSchema.userInfoSchema, userInfo);
      return userInfo;
    }
  });
};

const getUserInfoOnce = () => {
  return useQuery({
    queryKey: ['userInfoOnce'],
    queryFn: async () => {
      const { data: userInfo } = await utils.apiClient.auth.getUserInfo();
      parseAndLog(zodSchema.userInfoSchema, userInfo);
      return userInfo;
    },
    enabled: !sessionStorage.getItem(STATE.USER_INFO)
  });
};

export const getTokenOneidentity = async (request: Request) => {
  const currentUrl = new URL(request.url);
  const searchParams = new URLSearchParams(currentUrl.search);
  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';

  try {
    const { data: TokenResponse } = await utils.apiClient.token.getAuthenticationToken(
      {
        code,
        state
      },
      { withCredentials: true }
    );
    parseAndLog(zodSchema.tokenResponseSchema, TokenResponse);
    return TokenResponse;
  } catch {
    return null;
  }
};

export default {
  getPaymentNotices,
  getReceiptData,
  getTokenOneidentity,
  getTransactionDetails,
  getTransactions,
  getUserInfo,
  getUserInfoOnce
};
