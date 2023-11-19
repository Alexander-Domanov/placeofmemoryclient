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

  return (
    <AuthLayout>
      {showMessage ? (
        <div className="text-justify sm:text-xs text-sm flex gap-3 flex-col">
          <p>
            калі гэты адрас электроннай пошты выкарыстоўваўся для стварэння
            ўліковага запісу, інструкцыі па для скіду пароля будзе адпраўлена
            вам. Праверце сваю электронную пошту.{' '}
          </p>

          <Link
            className="underline text-sm font-bold"
            href={routes.auth.signIn}
          >
            Перайдзіце да ўваходу
          </Link>
        </div>
      ) : (
        <>
          <h1 className="font-semibold text-center sm:text-2xl text-4xl">
            Забыліся пароль?
          </h1>

          <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

          <div className="break-normal mb-3 text-xs sm:text-xs text-justify text-dark-150 sm:w-[320px] text-sm w-[416px]">
            <p>
              Увядзіце адрас электроннай пошты, які вы выкарыстоўвалі, калі
              далучыліся, і мы вышлем інструкцыі па скідцы пароля.
            </p>

            <p className="mt-3">
              У мэтах бяспекі мы НЕ захоўваем ваш пароль. Так што адпачывайце
              запэўніў, што мы ніколі не адправім ваш пароль па электроннай
              пошце.
            </p>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              id="email"
              label="Адрас электроннай пошты"
              error={errors?.email?.message}
              {...register('email')}
            />
            <Captcha onRecaptchaChangeHandler={onRecaptchaChange} />

            <Button disabled={isLoading} className="mt-1">
              {isLoading ? <Spinner /> : 'Адправіць інструкцыі'}
            </Button>
          </form>
          <div />
        </>
      )}
    </AuthLayout>
  );
};
