import utils from 'utils';

const dashoboard = () => {
  try {
    return utils.apiClient.transactions.getTransactionList();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default {
  dashoboard
};
