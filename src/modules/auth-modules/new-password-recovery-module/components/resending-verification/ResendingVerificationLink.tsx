import Link from 'next/link';
import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';

export const ResendingVerificationLink = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-3">
        <span className="font-bold">Email verification link expired</span>
        <span>
          Looks like the verification link has expired. Not to worry, we can
          send the link again
        </span>
        <Link className="underline" href={routes.auth.forgotPassword}>
          Resend verification link
        </Link>
      </div>
    </AuthLayout>
  );
};
