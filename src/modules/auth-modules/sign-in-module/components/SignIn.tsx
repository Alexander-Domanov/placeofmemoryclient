import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthLayout } from '@/components';
import { Button, Input } from '@/ui';
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { schemaLogin, useLogin } from '@/modules/auth-modules/sign-in-module';
import { routes } from '@/common/routing/routes';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';

export const SignIn = () => {
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(schemaLogin);
  const { query, push } = useRouter();
  const { sendLoginData, isLoading } = useLogin(
    () => {
      push(routes.main);
    },
    () =>
      setCustomError(
        'password',
        'The password or the email or Username are incorrect. Try again, please'
      ),
    () => reset()
  );

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
      setViewQueryStatus(
        `This account is not in the system, if you want to register, go to the page "Sign Up" `
      );
    }

    if (queryStatus === AUTH2_STATUS['204']) {
      setViewQueryStatus(
        'A user with this email already exists. Go to your email for further instructions'
      );
    }
  }, [queryStatus]);

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <AuthLayout>
      {viewQueryStatus && <span>{viewQueryStatus}</span>}

      <h1 className="font-semibold text-center sm:text-2xl text-4xl">
        Увайдзіце ў свой акаўнт
      </h1>

      <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

      <Button
        onClick={OAUTH_AUTHORIZATION.registrationGoogle}
        className="gap-1"
      >
        Увайдзіце праз &nbsp; <FaGoogle size={isMobile ? 22 : 33} />
        oogle
      </Button>

      <div>
        <div className="mt-8 mb-8 flex items-center text-center text-dark-150 justify-center text-sm">
          <div className="flex-grow  h-[1px] bg-dark-300" />

          <span className="mx-4">
            або ўвайдзіце з дапамогай электроннай пошты
          </span>

          <div className="flex-grow h-[1px] bg-dark-300" />
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Input
            type="email"
            id="email"
            // label="Электронная пошта"
            label="Адрас электроннай пошты"
            error={errors?.email?.message}
            {...register('email')}
          />

          <Input
            type="password"
            id="password"
            error={errors?.password?.message}
            label="Пароль"
            {...register('password')}
          />

          <div className="flex text-sm justify-end">
            <Link
              className="text-xs underline"
              href={routes.auth.forgotPassword}
            >
              Забыўся?
            </Link>
          </div>

          <Button disabled={isLoading} className="mt-1 " type="submit">
            {isLoading ? <Spinner /> : 'Увайсці'}
          </Button>
        </form>
      </div>

      <div className="flex gap-1 text-sm justify-center ">
        <span> У вас няма акаўнта?</span>

        <Link className="underline" href={routes.auth.signUp}>
          Зарэгістравацца
        </Link>
      </div>
    </AuthLayout>
  );
};
