import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components';
import { Button, Input } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';
import {
  registrationSchema,
  useRegister,
} from '@/modules/auth-modules/sign-up-module';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';

export const SignUp = () => {
  const [showOrHiddenForm, setshowOrHiddenForm] = useState<boolean>(false);
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(registrationSchema);

  const { sendRegisteredData, isLoading, variables } = useRegister(
    () => reset(),
    setCustomError
  );
  const registeredDataSubmit = (data: any) => {
    sendRegisteredData(data);
  };

  return (
    <Container className="flex justify-center items-center h-screen">
      <section className="w-[450px]">Images</section>
      <section className="flex-grow">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Sign up to Minsk</h1>
          <Button onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
            Sign up with Google
          </Button>
          <Button onClick={() => setshowOrHiddenForm(!showOrHiddenForm)}>
            Continue with email
          </Button>
          <form onSubmit={handleSubmit(registeredDataSubmit)}>
            <Input
              type="text"
              id="userName"
              label="Username"
              error={errors?.userName?.message}
              {...register('userName')}
            />
            <Input
              type="email"
              id="email"
              label="Email"
              error={errors?.email?.message}
              {...register('email')}
            />
            <Input
              placeholder="6+ characters"
              type="password"
              id="password"
              error={errors?.password?.message}
              label="Password"
              {...register('password')}
            />
            <Button className="mt-1" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-1">
            <span> Already have an account?</span>
            <Link className="underline" href="/signin/session/new">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};
