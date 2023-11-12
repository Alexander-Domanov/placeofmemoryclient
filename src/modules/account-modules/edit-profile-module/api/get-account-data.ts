import { authInstance } from '@/services';
import { RootProfile } from '@/modules/account-modules/edit-profile-module';

export const getAccountData = (): Promise<RootProfile> => {
  return authInstance.get(`users/profile`);
};
