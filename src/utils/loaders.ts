import { useQuery } from '@tanstack/react-query';
import { STATE } from 'store/types';
import utils from 'utils';
import { ZodSchema } from 'zod';
import * as zodSchema from '../../generated/zod-schema';
import { AxiosError } from 'axios';

const parseAndLog = <T>(schema: ZodSchema, data: T, throwError: boolean = true): void | never => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(result.error.issues);
    if (throwError) throw result.error;
  }
};

interface GetNoticesList {
  /** max number of elements returned, default 10*/
  size?: number;
  paidByMe?: boolean;
  registeredToMe?: boolean;
}
/**
 * Retrieve the paged notices list from arc
 */
const getNoticesList = (query?: GetNoticesList) =>
  useQuery({
    queryKey: ['noticesList'],
    queryFn: async () => {
      const { data: noticesList } = await utils.apiClient.notices.getNoticesList({
        size: query?.size,
        paidByMe: query?.paidByMe,
        registeredToMe: query?.registeredToMe
      });
      parseAndLog(zodSchema.noticesListDTOSchema, noticesList);
      return noticesList;
    }
  });

const getNoticeDetails = (id: string) =>
  useQuery({
    queryKey: ['noticeDetails'],
    queryFn: async () => {
      const { data: notice } = await utils.apiClient.notices.getNoticeDetails(id);
      parseAndLog(zodSchema.noticeDetailsDTOSchema, notice);
      return notice;
    }
  });

const getPaymentNotices = () =>
  useQuery({
    queryKey: ['paymentNotices'],
    queryFn: async () => {
      const { data } = await utils.apiClient.paymentNotices.getPaymentNotices({});
      parseAndLog(zodSchema.paymentNoticesListDTOSchema, data, false);
      return data;
    }
  });

export const getReceiptData = async (transactionId: string) => {
  const { data } = await utils.apiClient.notices.getNoticeReceipt(transactionId, {
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
    // TODO check global state instead of
    // storage once preact/signals
    // testing is fixed
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
  } catch (error) {
    const code = (error as AxiosError<{ status: number }>).response?.status || 408;
    return code;
  }
};

export default {
  getPaymentNotices,
  getReceiptData,
  getTokenOneidentity,
  getNoticeDetails,
  getNoticesList,
  getUserInfo,
  getUserInfoOnce
};
