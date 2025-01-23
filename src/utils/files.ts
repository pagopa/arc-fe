import utils from 'utils';

/**
 * Downloads pdf for a transaction
 */
export const downloadReceiptPDF = async (transactionId: string) => {
  const response = await utils.loaders.getReceiptPDF(transactionId);
  if (!response) {
    throw new Error('Error getting the PDF');
  }

  const { data, filename } = response;
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
