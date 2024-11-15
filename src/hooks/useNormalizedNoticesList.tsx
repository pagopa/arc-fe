import utils from 'utils';
import { useTranslation } from 'react-i18next';

interface NormalizedNoticesListParams {
  paidByMe?: boolean;
  registeredToMe?: boolean;
  continuationToken: string;
  ordering: 'ASC' | 'DESC';
}

export const useNormalizedNoticesList = (params: NormalizedNoticesListParams) => {
  const { t } = useTranslation();
  const queryResult = utils.loaders.getNoticesList(
    {
      size: 10,
      ordering: params.ordering,
      paidByMe: params.paidByMe,
      registeredToMe: params.registeredToMe
    },
    params?.continuationToken
  );
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
    all: !params.paidByMe && !params.registeredToMe ? getNoticesList() : [],
    paidByMe: params.paidByMe ? getNoticesList() : [],
    registeredToMe: params.registeredToMe ? getNoticesList() : [],
    queryResult,
    token: data?.continuationToken
  };

  return noticesList;
};
