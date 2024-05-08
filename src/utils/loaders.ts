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
    //to avoid getting an error about params.id being possibly undefined I had to put in "as string", because if the params.id happens to be undefined the user would be redirected to the home
    // because this wouldn't be a valid route, so there wouldn't be a problem actually.
    return utils.apiClient.transactions.getTransactionDetails(id as string);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default {
  dashoboard,
  transactionDetails
};
