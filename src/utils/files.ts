import utils from 'utils';

export const getReceipt = async (transactionId: string) => {
  try {
    const receiptResult = await utils.loaders.getReceiptData(transactionId);

    const file = new Blob([receiptResult as BlobPart], { type: 'application/pdf' });

    const link = window.URL.createObjectURL(file);

    if (link) {
      window.open(link);
    } else {
      console.warn('No receipt available');
    }
  } catch (e) {
    console.warn('No notice receipt available');
  }
};
