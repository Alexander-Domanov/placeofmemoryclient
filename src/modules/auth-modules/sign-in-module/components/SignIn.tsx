import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthLayout } from '@/components';
import { Button, Input, InputWithEye } from '@/ui';
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { schemaLogin, useLogin } from '@/modules/auth-modules/sign-in-module';
import { routes } from '@/common/routing/routes';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useTranslation } from '@/components/internationalization';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';

export const SignIn = () => {
  const { t } = useTranslation();
  const {
    emailT,
    buttonSignInT,
    signUpT,
    buttonGT,
    descriptionT,
    passwordT,
    titleT,
    noAccT,
    customErrors,
    forgotT,
    STATUS_ERROR_204_TR,
    STATUS_ERROR_401_TR,
  } = t.auth.signIn.page;
  const { errors, trigger, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(schemaLogin());
  const { query, push } = useRouter();
  const { sendLoginData, isLoading } = useLogin(
    () => {
      push(routes.main);
    },
    () => setCustomError('password', customErrors),
    () => reset()
  );
  useChangingLanguageError({ trigger, errors });

  const handleFormSubmit = ({ email, password }: FieldValues) => {
    sendLoginData({
      email,
      password,
    });
  };

  const [viewQueryStatus, setViewQueryStatus] = useState<string | null>(null);
  const queryStatus = query.status_code as string;

  useEffect(() => {
    if (!queryStatus) return;

    if (queryStatus === AUTH2_STATUS['401']) {
      setViewQueryStatus(STATUS_ERROR_401_TR);
    }

    if (queryStatus === AUTH2_STATUS['204']) {
      setViewQueryStatus(STATUS_ERROR_204_TR);
    }
  }, [queryStatus]);

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <AuthLayout>
      {viewQueryStatus && (
        <span className="text-center sm:mb-4 mb-8 text-xs">
          {viewQueryStatus}
        </span>
      )}

      <h1 className="font-semibold text-center sm:text-2xl text-4xl">
        {titleT}
      </h1>

      <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

      <Button
        onClick={OAUTH_AUTHORIZATION.registrationGoogle}
        className="gap-1"
      >
        {buttonGT} &nbsp; <FaGoogle size={isMobile ? 22 : 33} />
        oogle
      </Button>

      <div>
        <div className="mt-8 mb-8 flex items-center text-center text-dark-150 justify-center text-sm">
          <div className="flex-grow  h-[1px] bg-dark-300" />

          <span className="mx-4">{descriptionT} </span>

          <div className="flex-grow h-[1px] bg-dark-300" />
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Input
            type="email"
            id="email"
            label={emailT}
            error={errors?.email?.message}
            {...register('email')}
          />

          <InputWithEye
            id="password"
            error={errors?.password?.message}
            label={passwordT}
            {...register('password')}
          />

          <div className="flex text-sm justify-end">
            <Link
              className="text-xs underline"
              href={routes.auth.forgotPassword}
            >
              {forgotT}
            </Link>
          </div>

          <Button disabled={isLoading} className="mt-1 " type="submit">
            {isLoading ? <Spinner /> : buttonSignInT}
          </Button>
        </form>
      </div>

      <div className="flex gap-1 text-sm justify-center ">
        <span> {noAccT}</span>

        <Link className="underline" href={routes.auth.signUp}>
          {signUpT}
        </Link>
      </div>
    </AuthLayout>
  );
};
