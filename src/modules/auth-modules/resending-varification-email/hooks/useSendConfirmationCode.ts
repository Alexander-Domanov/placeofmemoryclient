import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { sendCode } from '@/modules/auth-modules/resending-varification-email/api/sendCode';

export const useSendConfirmationCode = (code: string) => {
  const mutation = useMutation({
    mutationFn: sendCode,
  });

  useEffect(() => {
    if (code) {
      mutation.mutate({ confirmationCode: code });
    }
  }, [code]);

  return mutation;
};
