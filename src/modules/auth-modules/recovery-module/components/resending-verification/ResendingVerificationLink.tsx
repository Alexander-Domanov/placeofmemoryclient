import Link from 'next/link';
import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';

export const ResendingVerificationLink = () => {
  return (
    <AuthLayout>
      <div>
        <span className="font-bold mt-6 mb-3">
          Email verification link expired
        </span>
        <span>
          Looks like the verification link has expired. Not to worry, we can
          send the link again
        </span>
        <Link
          className="hover:no-underline hover:text-light-100 hover:bg-accent-100 text-light-100 inline-block text-center bg-accent-500 px-6 py-1.5 rounded-sm item leading-6"
          href={routes.auth.forgotPassword}
        >
          Resend verification link
        </Link>
      </div>
    </AuthLayout>
  );
};
