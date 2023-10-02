import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { passwordRecoveryAPI } from '@/services';

export const useCheckRecoveryCode = (recoveryCode: string) => {
  const { isError, status, isSuccess, mutate } = useMutation({
    mutationKey: ['check-recovery-code'],
    mutationFn: passwordRecoveryAPI.checkRecoveryCode,
  });

  useEffect(() => {
    recoveryCode && mutate({ recoveryCode });
  }, [mutate, recoveryCode]);

  return { mutate, isError, isSuccess, status };
};
