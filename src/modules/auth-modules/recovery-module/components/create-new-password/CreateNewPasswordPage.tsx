import React from 'react';

import { useRouter } from 'next/router';
import { AuthLayout } from '@/components';
import {
  CreateNewPasswordForm,
  useCreateNewPassword,
} from '@/modules/auth-modules/recovery-module';
import { routes } from '@/common/routing/routes';

interface CreateNewPasswordPageProps {
  recoveryCode: string;
}

export const CreateNewPasswordPage = ({
  recoveryCode = '',
}: CreateNewPasswordPageProps) => {
  const router = useRouter();

  const { mutate: createNewPassword, isLoading } = useCreateNewPassword();

  const onSubmitHandler = async (newPassword: string) => {
    createNewPassword({
      newPassword,
      recoveryCode,
    });
    await router.push(routes.auth.signIn);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthLayout image="image">
      <CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />
    </AuthLayout>
  );
};
