import utils from 'utils';
import { useTranslation } from 'react-i18next';

interface NormalizedNoticesListParams {
  paidByMe?: boolean;
  registeredToMe?: boolean;
}

export const useNormalizedNoticesList = (params?: NormalizedNoticesListParams) => {
  const { t } = useTranslation();
  // size = 100 to be modified when the pagination will be introduced
  const queryResult = utils.loaders.getNoticesList({ ...params, size: 100 });
  const { data } = queryResult;

  const getNoticesList = () =>
    data
      ? utils.converters.prepareRowsData({
          notices: data.notices,
          status: { label: t('app.transactions.paid') },
          payee: { multi: t('app.transactions.multiEntities') }
        })
      : [];

  const noticesList = {
    all: !params?.paidByMe && !params?.registeredToMe ? getNoticesList() : [],
    paidByMe: params?.paidByMe ? getNoticesList() : [],
    registeredToMe: params?.registeredToMe ? getNoticesList() : [],
    queryResult
  };

  return noticesList;
};
