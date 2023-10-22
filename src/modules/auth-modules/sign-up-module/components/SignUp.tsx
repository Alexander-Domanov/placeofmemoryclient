import Link from 'next/link';
import { useState } from 'react';
import { AuthLayout } from '@/components';
import { Button, Input } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';
import {
  registrationSchema,
  useRegister,
} from '@/modules/auth-modules/sign-up-module';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { routes } from '@/common/routing/routes';

const videoForLayout =
  'https://media.istockphoto.com/id/670852240/video/nature-photographer.mp4?s=mp4-640x640-is&k=20&c=MWW5_lvT4duO8Ztd45Q1Xy6dmDrBaQ0mWGHVITArPJo=';
export const SignUp = () => {
  const [showOrHiddenForm, setShowOrHiddenForm] = useState<boolean>(false);
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(registrationSchema);

  const { sendRegisteredData, isLoading } = useRegister(
    () => reset(),
    setCustomError
  );
  const registeredDataSubmit = (data: any) => {
    sendRegisteredData(data);
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthLayout videoSrc={videoForLayout}>
      <h1 className="font-bold text-xl mb-10">Sign up to Minsk</h1>
      {!showOrHiddenForm && (
        <>
          <Button
            className="font-fontHeader"
            onClick={OAUTH_AUTHORIZATION.registrationGoogle}
          >
            Sign up with Google
          </Button>

          <div className="flex justify-center text-sm mb-7 mt-7">
            <span>or</span>
          </div>
        </>
      )}
      <Button onClick={() => setShowOrHiddenForm(!showOrHiddenForm)}>
        {!showOrHiddenForm ? 'Continue with email' : 'Go back'}
      </Button>
      {showOrHiddenForm && (
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(registeredDataSubmit)}
        >
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
          <div className="text-sm flex justify-center">
            <span>
              Password must contain 1-9, a-z, A-Z, and specified symbols
            </span>
          </div>
          <Button className="mt-1" type="submit">
            Sign Up
          </Button>
        </form>
      )}
      <div className="flex gap-1 text-sm justify-center">
        <span> Already have an account?</span>
        <Link className="underline" href={routes.auth.signIn}>
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};
