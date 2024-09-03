import { usePersistentSignal } from 'hooks/usePersistentSignal';
import { STATE } from './types';
import { UserMemo } from 'models/User';

// Initialize the persistent store
export const userInfoState = usePersistentSignal<UserMemo | undefined>(STATE.USER_INFO, {
  storage: sessionStorage
});

// Function to update the user info
export function setUserInfo(user: UserMemo | undefined) {
  userInfoState.state.value = user;
}
