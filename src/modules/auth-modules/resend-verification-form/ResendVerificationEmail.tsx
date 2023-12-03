import React from 'react';
import { useRouter } from 'next/router';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { useSendVerifyEmail } from '@/modules/auth-modules/resend-verification-form/hooks/useSendVerifyEmail';
import { routes } from '@/common/routing/routes';
import { ResendVerificationForm } from '@/components/resend-verification-form/ResendVerificationForm';
import { emailSchema } from '@/modules/auth-modules/forgot-password-module';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';

export const ResendVerificationEmail = () => {
  const { push, locale } = useRouter();
  const language = locale as string;
  const { handleSubmit, trigger, register, reset, setCustomError, errors } =
    useGlobalForm(emailSchema());

  useChangingLanguageError({ trigger, errors });
  const { isLoading, resendVerification } = useSendVerifyEmail(
    setCustomError,
    () => reset(),
    () => push(routes.auth.signIn)
  );

  const submitData = (data: any) => {
    resendVerification({ email: data.email, lang: language });
  };

  return (
    <ResendVerificationForm
      isLoading={isLoading}
      submitData={submitData}
      handleSubmit={handleSubmit}
      error={errors?.email?.message}
      register={register}
    />
  );
};
