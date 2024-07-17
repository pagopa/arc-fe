import { useEffect, useState } from 'react';
import utils from 'utils';

export const useReceiptData = (transactionId: string) => {
  const [receipt, setReceipt] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      const { data } = await utils.apiClient.transactions.getTransactionReceipt(transactionId, {
        format: 'blob'
      });
      const file = new Blob([data as BlobPart], { type: 'application/pdf' });

      const link = window.URL.createObjectURL(file);
      setReceipt(link);
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
