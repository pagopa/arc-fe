import React from 'react';
import { useLoaderData } from 'react-router-dom';
import utils from 'utils';
import QueryLoader from 'components/QueryLoader';
import { TransactionDetailsSkeleton } from 'components/Skeleton';
import { TransactionDetails } from 'components/Transactions';

export default function Notice() {
  const id = useLoaderData();
  const { data, isError } = utils.loaders.getNoticeDetails(id as string);
  const transactionDetailData = data && utils.converters.prepareNoticeDetailData(data);

  if (isError) {
    return <p>Ops! Something went wrong, please try again</p>;
  }

  return (
    <>
      <QueryLoader loaderComponent={<TransactionDetailsSkeleton />} queryKey="transactionDetail">
        {transactionDetailData && <TransactionDetails transactionData={transactionDetailData} />}
      </QueryLoader>
    </>
  );
}
