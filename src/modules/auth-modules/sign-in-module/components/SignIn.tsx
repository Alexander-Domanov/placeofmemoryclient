import Link from 'next/link';
import { Container } from '@/components';
import { Button } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';

export const SignIn = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <div className="w-[450px]">Images</div>
      <div className="flex-grow">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Sign in to Minsk</h1>
          <Button onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
            Sign in with Google
          </Button>
          <div>Form Sign in</div>
          <div className="flex gap-1">
            <span> Don't have an account?</span>
            <Link className="underline" href="/signup/new">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};
