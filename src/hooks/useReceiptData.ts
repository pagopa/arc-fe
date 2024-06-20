import { useEffect, useState } from 'react';
// import utils from 'utils';

export const useReceiptData = (transactionId: string) => {
  console.log(transactionId);
  const [receipt /*setReceipt*/] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      // const { data } = await utils.apiClient.transactions.getTransactionReceipt(transactionId);
      // if (data.attachments.length && data.attachments[0].url) {
      //   setReceipt(data.attachments[0].url);
      // } else {
      //   throw new Error('Receipt not found');
      // }
    } catch (e) {
      // TODO error handling
      setError(true);
      console.error(e);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { receipt, isPending, error };
};
