import utils from 'utils';

const dashboard = async () => {
  try {
    const { data: transactions } = await utils.apiClient.transactions.getTransactionList();
    // run-time validation of the getTransactionList's Response
    utils.zodSchema.transactionsResponseSchema.parse(transactions);
    return transactions;
  } catch (e) {
    console.error(e);
    // react-router-dom will catch this error and an errorElement component shown as feedback
    return e;
  }
};

const transactionDetails = async (id: string | undefined) => {
  try {
    if (!id) throw new Error('no id');
    return id && (await utils.apiClient.transactions.getTransactionDetails(id));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const transactionList = async () => {
  try {
    return await utils.apiClient.transactions.getTransactionList();
  } catch (e) {
    console.error(e);
    return [];
  }
};
//I kept the two loaders separate because they are named after the route, not the kind of data that they return.

export default {
  dashboard,
  transactionDetails,
  transactionList
};
