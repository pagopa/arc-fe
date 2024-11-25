import { UserMemo } from 'models/User';
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
      const user: UserMemo = { name: data.name, familyName: data.familyName, userId: data.userId };
      setState(STATE.USER_INFO, user);
    }
  }, [isSuccess]);

  return { userInfo: state.userInfo };
};
