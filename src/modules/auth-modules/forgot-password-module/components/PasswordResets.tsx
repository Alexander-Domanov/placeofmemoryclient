import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { Button, Input } from '@/ui';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';

import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';
import {
  Captcha,
  emailSchema,
  useForgotPassword,
} from '@/modules/auth-modules/forgot-password-module';

export const PasswordResets = () => {
  const [captcha, setCaptcha] = useState('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(emailSchema);
  const { sendLinkPasswordRecovery, isLoading } = useForgotPassword(
    () => setShowMessage(true),
    (field: string, massage: string) => {
      setCustomError(field, massage);
      setCaptcha('');
    }
  );
  const onRecaptchaChange = (token: string) => {
    setCaptcha(token);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    const { email } = data;

    sendLinkPasswordRecovery({ email, recaptcha: captcha });
    reset();
  };

  if (isLoading) <div>Loading...</div>;
  return (
    <AuthLayout>
      {showMessage ? (
        <>
          <p>
            if this email address was used to create an account, instructions to
            reset your password will be sent to you. Please check your email.
          </p>
          <Link
            className="underline text-sm font-bold"
            href={routes.auth.signIn}
          >
            Go to Sign In
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-bold text-xl mb-10">Forgot Password?</h1>
          <div className="break-normal text-sm w-[416px]">
            <p>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <p className="mt-3">
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              id="email"
              label="Email Address"
              error={errors?.email?.message}
              {...register('email')}
            />
            <Captcha onRecaptchaChangeHandler={onRecaptchaChange} />
            <Button className="mt-1">Send Reset Instructions</Button>
          </form>
          <div />
        </>
      )}
    </AuthLayout>
  );
};
