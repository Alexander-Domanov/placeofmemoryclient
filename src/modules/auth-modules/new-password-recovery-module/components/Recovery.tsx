import React from 'react';

import { useRouter } from 'next/router';
import {
  CreateNewPasswordPage,
  ResendingVerificationLink,
  useCheckRecoveryCode,
} from '@/modules/auth-modules/new-password-recovery-module';
import { Spinner } from '@/ui/spinner/Spinner';
import { AuthLayout } from '@/components';

export const Recovery = () => {
  const router = useRouter();

  const recoveryCode = router.query && (router.query.code as string);

  const { isError, status, isSuccess } = useCheckRecoveryCode(recoveryCode);

  if (status === 'loading')
    return (
      <AuthLayout>
        <div className="flex justify-center">
          <Spinner />
        </div>
      </AuthLayout>
    );
  if (isError) return <ResendingVerificationLink />;
  if (isSuccess) return <CreateNewPasswordPage recoveryCode={recoveryCode} />;

  return <></>;
};
