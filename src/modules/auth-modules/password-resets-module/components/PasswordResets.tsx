import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, Input } from '@/ui';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import {
  Captcha,
  emailSchema,
  useForgotPassword,
} from '@/modules/auth-modules/password-resets-module';
import { AuthLayout } from '@/components';

export const PasswordResets = () => {
  const [captcha, setCaptcha] = useState('');

  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(emailSchema);
  const { sendLinkPasswordRecovery, isLoading, variables } = useForgotPassword(
    // onSuccess,
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

  return (
    <AuthLayout image="image">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold">Forgot Password?</h1>
        <div className="break-normal w-[416px]">
          <p>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
          <p className="mt-3">
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
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
          <Button className="mt-1">Send Reset Instructions</Button>
          <Captcha onRecaptchaChangeHandler={onRecaptchaChange} />
        </form>
        <div />
      </div>
    </AuthLayout>
  );
};
