import { useMutation } from 'react-query';
import { passwordRecoveryAPI } from '@/services';

export const useCreateNewPassword = () => {
  return useMutation({
    mutationKey: ['create-new-password'],
    mutationFn: passwordRecoveryAPI.createNewPassword,
  });
};
