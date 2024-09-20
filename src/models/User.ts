import { UserInfo } from '../../generated/apiClient';

export type UserMemo = Omit<UserInfo, 'email' | 'fiscalCode'>;
