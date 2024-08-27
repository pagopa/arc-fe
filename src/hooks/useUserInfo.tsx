import { useStore } from 'store/GlobalStore';
import { STATE } from 'store/types';
import utils from 'utils';

export const useUserInfo = () => {
  const {
    setState,
    state: { userInfo }
  } = useStore();

  const { data } = utils.loaders.getUserInfo();
  if (data) {
    setState(STATE.USER_INFO, data);
  }

  return { userInfo };
};
