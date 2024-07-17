import utils from 'utils';

export const useReceiptData = async (transactionId: string) => {
  const { data } = await utils.apiClient.transactions.getTransactionReceipt(transactionId, {
    format: 'blob'
  });
  const file = new Blob([data as BlobPart], { type: 'application/pdf' });

  const link = window.URL.createObjectURL(file);
  return link;
};

export default useReceiptData;
