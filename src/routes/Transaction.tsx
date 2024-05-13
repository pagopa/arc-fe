import React from 'react';
import TransactionDetail from '../components/Transactions/TransactionDetail';
import { useLoaderData } from 'react-router-dom';
import { TransactionDetailResponse } from '../../generated/apiClient';
import utils from 'utils';
import { AxiosResponse } from 'axios';

export default function Transaction() {
  const transactionDetail = useLoaderData();
  const transactionDetailData = utils.converters.prepareTransactionDetailData(
    (transactionDetail as AxiosResponse<TransactionDetailResponse>).data
  );
  return <TransactionDetail transactionData={transactionDetailData} />;
}
