import { useStore } from 'store/GlobalStore';
import { STATE } from 'store/types';
import utils from 'utils';
import { UserInfo } from '../../generated/apiClient';

export const useUserInfo = (): { userInfo: UserInfo | undefined } => {
  const { setState, state } = useStore();

  const { data } = utils.loaders.getUserInfoOnce();

  if (data) {
    delete data.email;
    setState(STATE.USER_INFO, data);
  }

  return { userInfo: state?.userInfo };
};
