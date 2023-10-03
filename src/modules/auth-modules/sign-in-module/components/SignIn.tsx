import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthLayout } from '@/components';
import { Button, Input } from '@/ui';
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { schemaLogin, useLogin } from '@/modules/auth-modules/sign-in-module';
import { routes } from '@/common/routing/routes';

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

  // Получение статуса при логинизации или регистрации в google
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthLayout>
      {viewQueryStatus && <span>{viewQueryStatus}</span>}
      <h1 className="font-bold text-xl mb-10">Sign in to Minsk</h1>
      <Button onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
        Sign in with Google
      </Button>
      <div>
        <div className="flex justify-center text-sm mb-7 mt-7">
          <span>or sign in with email</span>
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Input
            type="email"
            id="email"
            label="Email"
            error={errors?.email?.message}
            {...register('email')}
          />
          <Input
            type="password"
            id="password"
            error={errors?.password?.message}
            label="Password"
            {...register('password')}
          />
          <div className="flex text-sm justify-end">
            <Link
              className="text-xs underline"
              href={routes.auth.forgotPassword}
            >
              Forgot?
            </Link>
          </div>
          <Button className="mt-1" type="submit">
            Sign In
          </Button>
        </form>
      </div>
      <div className="flex gap-1 text-sm justify-center">
        <span> Don't have an account?</span>
        <Link className="underline" href={routes.auth.signUp}>
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};
