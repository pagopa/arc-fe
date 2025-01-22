import utils from 'utils';

/**
 * Downloads pdf for a transaction
 */
export const getReceipt = async (transactionId: string) => {
  const { data, filename } = await utils.loaders.getReceiptData(transactionId);
  const url = window.URL.createObjectURL(data);

  // Create a temporary <a> tag for downloading
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Trigger the download
  document.body.appendChild(a);
  a.click();

  // remove comment to open the file in a new tab
  // window.open(url, '_blank');

  // Remove the temporary <a> tag and release the URL of the Blob object
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
