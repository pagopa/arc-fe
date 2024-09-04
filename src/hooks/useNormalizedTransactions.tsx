import utils from 'utils';
import { TransactionDTO } from '../../generated/apiClient';
import { useTranslation } from 'react-i18next';

export const useNormalizedTransactions = () => {
  const { t } = useTranslation();
  const queryResult = utils.loaders.getTransactions();
  const { data } = queryResult;

  const getTransactions = (filter?: (transaction: TransactionDTO) => boolean | undefined) =>
    data
      ? utils.converters.prepareRowsData({
          transactions: filter ? data.transactions?.filter(filter) : data.transactions,
          status: { label: t('app.transactions.paid') },
          payee: { multi: t('app.transactions.multiEntities') },
        })
      : [];

  const transactions = {
    all: getTransactions(),
    paidByMe: getTransactions((transaction) => transaction.paidByMe),
    registeredToMe: getTransactions((transaction) => transaction.registeredToMe),
    queryResult
  };

  return transactions;
};
