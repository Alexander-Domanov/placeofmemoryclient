import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { Container } from '@/components';
import { Button, Input } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import {
  schemaLogin,
  useLoginMutation,
} from '@/modules/auth-modules/sign-in-module';

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
    <Container className="flex justify-center items-center h-screen">
      <section className="w-[450px]">Images</section>
      <section className="flex-grow">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Sign in to Minsk</h1>
          <Button onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
            Sign in with Google
          </Button>
          <div>
            <span>or sign in with email</span>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              <Button className="mt-1" type="submit">
                Sign In
              </Button>
            </form>
          </div>
          <div className="flex gap-1">
            <span> Don't have an account?</span>
            <Link className="underline" href="/signup/new">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};
