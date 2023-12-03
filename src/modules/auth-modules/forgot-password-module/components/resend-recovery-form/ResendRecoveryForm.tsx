import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import {
  emailSchema,
  useForgotPassword,
} from '@/modules/auth-modules/forgot-password-module';
import { ResendVerificationForm } from '@/components/resend-verification-form/ResendVerificationForm';
import { routes } from '@/common/routing/routes';

export const ResendRecoveryForm = () => {
  const { push, locale } = useRouter();
  const [captcha, setCaptcha] = useState('');
  const language = locale as string;
  const { handleSubmit, register, reset, errors, setCustomError } =
    useGlobalForm(emailSchema());

  const onSuccess = () => {
    push(routes.auth.signIn);
    reset();
  };
  const { sendLinkPasswordRecovery, isLoading } = useForgotPassword(
    onSuccess,
    setCustomError
  );

  const onRecaptchaChange = (token: string) => {
    setCaptcha(token);
  };

  const submitData = (data: any) => {
    const { email } = data;

    sendLinkPasswordRecovery({
      data: { email, recaptcha: captcha },
      lang: language,
    });
  };

  return (
    <ResendVerificationForm
      isLoading={isLoading}
      submitData={submitData}
      handleSubmit={handleSubmit}
      error={errors?.email?.message}
      register={register}
      isCaptcha
      onRecaptchaChange={onRecaptchaChange}
      disabled={!captcha}
    />
  );
};
