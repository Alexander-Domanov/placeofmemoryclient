import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';
import {
  CreateNewPasswordForm,
  useCreateNewPassword,
} from '@/modules/auth-modules/new-password-recovery-module';
import { useTranslation } from '@/components/internationalization';

interface CreateNewPasswordPageProps {
  recoveryCode: string;
}

export const CreateNewPasswordPage = ({
  recoveryCode = '',
}: CreateNewPasswordPageProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    mutate: createNewPassword,
    isLoading,
    isSuccess,
  } = useCreateNewPassword();

  const onSubmitHandler = async (newPassword: string) => {
    createNewPassword({
      newPassword,
      recoveryCode,
    });
  };

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;

    if (isSuccess) {
      setSuccessMessage(t.auth.recovery.recoveryPage.successMessage);

      redirectTimer = setTimeout(() => {
        router.push(routes.auth.signIn);
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
    return () => {};
  }, [isSuccess, router]);

  return (
    <AuthLayout>
      {successMessage && (
        <div className="text-center mb-4">{successMessage}</div>
      )}

      {!successMessage && (
        <CreateNewPasswordForm
          isLoading={isLoading}
          onSubmitHandler={onSubmitHandler}
        />
      )}
    </AuthLayout>
  );
};
