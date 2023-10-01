import React from 'react';

import { useRouter } from 'next/router';
import {
  CreateNewPasswordPage,
  ResendingVerificationLink,
  useCheckRecoveryCode,
} from '@/modules/auth-modules/recovery-module';

export const Recovery = () => {
  const router = useRouter();

  const recoveryCode = router.query && (router.query.code as string);

  const { isError, status, isSuccess } = useCheckRecoveryCode(recoveryCode);

  if (status === 'loading') return <div>Loading...</div>;
  if (isError) return <ResendingVerificationLink />;
  if (isSuccess) return <CreateNewPasswordPage recoveryCode={recoveryCode} />;

  return <></>;
};
