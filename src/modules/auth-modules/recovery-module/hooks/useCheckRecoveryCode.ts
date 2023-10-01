import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { passwordRecoveryAPI } from '@/services';

export const useCheckRecoveryCode = (recoveryCode: string) => {
  const { isError, status, isSuccess, mutate } = useMutation({
    mutationKey: ['check-recovery-code'],
    mutationFn: passwordRecoveryAPI.checkRecoveryCode,
    onError: (error) => {
      console.log('error', error);
    },
  });

  useEffect(() => {
    recoveryCode && mutate({ recoveryCode });
  }, [mutate, recoveryCode]);

  return { mutate, isError, isSuccess, status };
};
