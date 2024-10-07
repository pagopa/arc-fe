import utils from 'utils';
import { TransactionDTO } from '../../generated/apiClient';
import { useTranslation } from 'react-i18next';

export const useNormalizedNoticesList = () => {
  const { t } = useTranslation();
  const queryResult = utils.loaders.getNoticesList();
  const { data } = queryResult;

  const getNoticesList = (filter?: (transaction: TransactionDTO) => boolean | undefined) =>
    data
      ? utils.converters.prepareRowsData({
          notices: filter ? data.notices?.filter(filter) : data.notices,
          status: { label: t('app.transactions.paid') },
          payee: { multi: t('app.transactions.multiEntities') }
        })
      : [];

  const noticesList = {
    all: getNoticesList(),
    paidByMe: getNoticesList((notices) => notices.paidByMe),
    registeredToMe: getNoticesList((notices) => notices.registeredToMe),
    queryResult
  };

  return noticesList;
};
