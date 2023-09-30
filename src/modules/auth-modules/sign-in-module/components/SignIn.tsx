import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { AuthLayout, Container } from '@/components';
import { Button, Input } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import {
  schemaLogin,
  useLoginMutation,
} from '@/modules/auth-modules/sign-in-module';
import { routes } from '@/common/routing/routes';

export const SignIn = () => {
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(schemaLogin);

  const { sendLoginData, isLoading } = useLoginMutation(
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

  return (
    <AuthLayout image="Image">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold">Sign in to Minsk</h1>
        <Button onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
          Sign in with Google
        </Button>
        <div>
          <span>or sign in with email</span>
          <form
            className="flex flex-col"
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
            <Link
              className="text-xs underline"
              href={routes.auth.forgotPassword}
            >
              Forgot Password?
            </Link>
            <Button className="mt-1" type="submit">
              Sign In
            </Button>
          </form>
        </div>
        <div className="flex gap-1">
          <span> Don't have an account?</span>
          <Link className="underline" href={routes.auth.signUp}>
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
