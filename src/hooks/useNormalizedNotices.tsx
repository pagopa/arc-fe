import utils from 'utils';
import converters from 'utils/converters';

export const useNormalizedNotices = () => {
  const queryResult = utils.loaders.getPaymentNotices();
  const data = converters.prepareNoticesData(queryResult.data);
  return { ...queryResult, data };
};
