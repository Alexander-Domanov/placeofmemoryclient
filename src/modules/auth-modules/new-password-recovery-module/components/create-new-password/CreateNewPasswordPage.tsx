import React from 'react';

import { useRouter } from 'next/router';
import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';
import {
  CreateNewPasswordForm,
  useCreateNewPassword,
} from '@/modules/auth-modules/new-password-recovery-module';

interface CreateNewPasswordPageProps {
  recoveryCode: string;
}

export const CreateNewPasswordPage = ({
  recoveryCode = '',
}: CreateNewPasswordPageProps) => {
  const router = useRouter();

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

  if (isLoading) return <div>Loading...</div>;
  if (isSuccess) router.push(routes.auth.signIn);
  return (
    <AuthLayout>
      <CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />
    </AuthLayout>
  );
};
