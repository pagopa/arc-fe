import React from 'react';
// import TransactionDetail from '../components/Transactions/TransactionDetail';
import { useLoaderData } from 'react-router-dom';
// import utils from 'utils';
import QueryLoader from 'components/QueryLoader';

export default function Transaction() {
  const id = useLoaderData();
  console.log(id);
  const isError = true;
  // const { data, isError } = utils.loaders.getTransactionDetails(id as string);
  // const transactionDetailData = data && utils.converters.prepareTransactionDetailData(data);

  return (
    <>
      <QueryLoader
        fallback={isError && <p>Ops! Something went wrong, please try again</p>}
        queryKey="transactionDetail">
        {/* {transactionDetailData && <TransactionDetail transactionData={transactionDetailData} />} */}
        <></>
      </QueryLoader>
    </>
  );
}
