import utils from 'utils';

const dashoboard = async () => {
  try {
    const { data: transactions } = await utils.apiClient.transactions.getTransactionList();
    // run-time validation of the getTransactionList's Response
    utils.zodSchema.transactionsResponseSchema.parse(transactions);
    return transactions;
  } catch (e) {
    console.error(e);
    // will be catched by react-router-dom and an errorElement component shown as feedback
    return e;
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
