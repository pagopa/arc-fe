import utils from 'utils';

export const useUserEmail = () => {
  const { data } = utils.loaders.getUserInfo();
  return data?.email;
};
