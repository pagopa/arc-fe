import utils from 'utils';

const dashoboard = () => {
  try {
    return utils.apiClient.transactions.getTransactionList();
  } catch (e) {
    console.error(e);
    return [];
  }
};

const transactionDetails = (id: string | undefined) => {
  try {
    if (!id) throw 'no id';
    return id && utils.apiClient.transactions.getTransactionDetails(id);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default {
  dashoboard,
  transactionDetails
};
