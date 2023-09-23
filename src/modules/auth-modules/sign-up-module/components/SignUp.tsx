import Link from 'next/link';
import { Container } from '@/components';
import { Button } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';

export const SignUp = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <section className="w-[450px]">Images</section>
      <section className="flex-grow">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Sign up to Minsk</h1>
          <Button onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
            Sign up with Google
          </Button>
          <Button>Continue with email</Button>
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
