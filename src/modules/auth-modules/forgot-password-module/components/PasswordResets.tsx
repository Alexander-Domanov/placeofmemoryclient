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
import { Spinner } from '@/ui/spinner/Spinner';
import { useTranslation } from '@/components/internationalization';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';

export const PasswordResets = () => {
  const { t, localeLanguage } = useTranslation();
  const [captcha, setCaptcha] = useState('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { errors, trigger, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(emailSchema());
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
    sendLinkPasswordRecovery({
      data: { email, recaptcha: captcha },
      lang: localeLanguage,
    });
    reset();
  };
  useChangingLanguageError({ errors, trigger });
  const {
    titleT,
    buttonT,
    signInLink,
    descriptionFirstT,
    descriptionSecondT,
    showMessageT,
    emailT,
  } = t.auth.forgotPassword.page;

  return (
    <AuthLayout>
      {showMessage ? (
        <div className="text-justify sm:text-xs text-sm flex gap-3 flex-col">
          <p className="text-dark-150">{showMessageT} </p>

          <Link
            className="underline text-sm font-bold"
            href={routes.auth.signIn}
          >
            {signInLink}
          </Link>
        </div>
      ) : (
        <>
          <h1 className="font-semibold text-center sm:text-2xl text-4xl">
            {titleT}
          </h1>

          <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

          <div className="break-normal mb-3 sm:text-xs text-justify text-dark-150 sm:w-[320px] text-sm w-[416px]">
            <p>{descriptionFirstT} </p>

            <p className="mt-3">{descriptionSecondT}</p>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              id="email"
              label={emailT}
              error={errors?.email?.message}
              {...register('email')}
            />
            <Captcha onRecaptchaChangeHandler={onRecaptchaChange} />

            <Button disabled={isLoading} className="mt-1">
              {isLoading ? <Spinner /> : buttonT}
            </Button>
          </form>
          <div />
        </>
      )}
    </AuthLayout>
  );
};
