import utils from 'utils';
import { useTranslation } from 'react-i18next';

interface NoticesListParams {
  paidByMe?: boolean;
  registeredToMe?: boolean;
}

export const useNormalizedNoticesList = (params?: NoticesListParams) => {
  const { t } = useTranslation();
  const queryResult = utils.loaders.getNoticesList(params);
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
