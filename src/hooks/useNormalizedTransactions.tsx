import utils from 'utils';
import { TransactionDTO } from '../../generated/apiClient';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

export const useNormalizedTransactions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isError } = utils.loaders.getTransactions();

  const getTransactions = (filter?: (transaction: TransactionDTO) => boolean | undefined) =>
    data
      ? utils.converters.prepareRowsData({
          transactions: filter ? data.transactions?.filter(filter) : data.transactions,
          status: { label: t('app.transactions.payed') },
          payee: { multi: t('app.transactions.multiEntities') },
          action: (id) => navigate(`${ArcRoutes.TRANSACTION}`.replace(':ID', id))
        })
      : [];

  const transactions = {
    all: getTransactions(),
    paidByMe: getTransactions((transaction) => transaction.payedByMe),
    registeredToMe: getTransactions((transaction) => transaction.registeredToMe),
    error: isError
  };

  return transactions;
};
