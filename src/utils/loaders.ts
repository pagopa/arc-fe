import { useQuery, QueryKey } from '@tanstack/react-query';
import { STATE } from 'store/types';
import utils from 'utils';
import { ZodSchema } from 'zod';
import * as zodSchema from '../../generated/zod-schema';
import { Params } from 'react-router-dom';
import converters from './converters';

const parseAndLog = <T>(schema: ZodSchema, data: T, throwError: boolean = true): void | never => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(result.error.issues);
    if (throwError) throw result.error;
  }
};

interface GetNoticesListQuery {
  /** max number of elements returned, default 10*/
  size: number;
  paidByMe?: boolean;
  registeredToMe?: boolean;
  ordering: 'ASC' | 'DESC';
}
/**
 * Retrieve the paged notices list from arc
 */
const getNoticesList = (
  query: GetNoticesListQuery,
  continuationToken: string,
  queryKey?: QueryKey
) =>
  useQuery({
    queryKey: queryKey || ['noticesList'],
    queryFn: async () => {
      const { data: noticesList, headers } = await utils.apiClient.notices.getNoticesList(
        {
          size: query.size,
          paidByMe: query.paidByMe,
          registeredToMe: query.registeredToMe,
          orderBy: 'TRANSACTION_DATE',
          ordering: query.ordering
        },
        {
          headers: {
            'x-continuation-token': continuationToken
          }
        }
      );
      parseAndLog(zodSchema.noticesListDTOSchema, noticesList);
      return {
        notices: noticesList.notices,
        continuationToken: headers['x-continuation-token']
      };
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
      parseAndLog(zodSchema.paymentNoticesListDTOSchema, data);
      return data;
    }
  });

const getPaymentNoticeDetails = ({ params: { id, paTaxCode } }: { params: Params }) => {
  if (!id || !paTaxCode) throw new Error('id and paTaxCode are required');

  return () =>
    useQuery({
      queryKey: ['paymentNoticeDetails'],
      queryFn: async () => {
        const { data } = await utils.apiClient.paymentNotices.getPaymentNoticesDetails(id, {
          paTaxCode
        });
        parseAndLog(zodSchema.paymentNoticesListDTOSchema, data);
        return converters.normalizePaymentNoticeDetails(data);
      }
    });
};

/** returns the object { data: File, filename: string } or null if an error occours */
export const getReceiptPDF = async (transactionId: string) => {
  try {
    const { data, headers } = await utils.apiClient.notices.getNoticeReceipt(transactionId, {
      format: 'blob'
    });
    const filename =
      (headers['content-disposition'] as string).split('filename=')[1].replace(/"/g, '') ||
      `${transactionId}.pdf`;
    return { data, filename };
  } catch {
    return null;
  }
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

/** returns the TokenResponse or null if an error occours */
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
  getPaymentNoticeDetails,
  getReceiptPDF,
  getTokenOneidentity,
  getNoticeDetails,
  getNoticesList,
  getUserInfo,
  getUserInfoOnce
};
