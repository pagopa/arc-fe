import { usePersistentSignal } from 'hooks/usePersistentSignal';
import { STATE } from './types';
import { UserInfo } from '../../generated/apiClient';

// Initialize the persistent store
export const userInfoState = usePersistentSignal<UserInfo | undefined>(STATE.USER_INFO, {
  storage: sessionStorage
});

// Function to update the payment notice
export function setUserInfo(notice: UserInfo | undefined) {
  userInfoState.state.value = notice;
}
