import React from 'react';
// import TransactionDetail from '../components/Transactions/TransactionDetail';
import { useLoaderData } from 'react-router-dom';
 import utils from 'utils';
import QueryLoader from 'components/QueryLoader';
import { TransactionDetailsSkeleton } from 'components/Skeleton';
import { TransactionDetails } from 'components/Transactions';

export default function Transaction() {
  const id = useLoaderData();
   const { data, isError } = utils.loaders.getTransactionDetails(id as string);
   const transactionDetailData = data && utils.converters.prepareTransactionDetailData(data);
  return (
    <>
      <QueryLoader
        loaderComponent={<TransactionDetailsSkeleton />}
        fallback={isError && <p>Ops! Something went wrong, please try again</p>}
        queryKey="transactionDetail">
         {transactionDetailData && <TransactionDetails transactionData={transactionDetailData} />}
        <TransactionDetailsSkeleton />
      </QueryLoader>
    </>
  );
}
