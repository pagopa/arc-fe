import { useEffect } from 'react';
import { useStore } from 'store/GlobalStore';
import { STATE } from 'store/types';
import utils from 'utils';

export const useUserInfo = () => {
  const { setState, state } = useStore();

  const { data, isSuccess } = utils.loaders.getUserInfoOnce();

  useEffect(() => {
    if (isSuccess && data) {
      delete data.email;
      setState(STATE.USER_INFO, data);
    }
  }, [isSuccess]);

  return { userInfo: state.userInfo };
};
