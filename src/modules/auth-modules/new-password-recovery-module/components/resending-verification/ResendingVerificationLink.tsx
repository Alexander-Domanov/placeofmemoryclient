import Link from 'next/link';
import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';

export const ResendingVerificationLink = () => {
  const { t } = useTranslation();
  const { secondDescription, firstDescription, forgotPasswordLink } =
    t.auth.recovery.resendPage;
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <p className="font-bold">{firstDescription}</p>
        <p>{secondDescription}</p>
        <Link className="underline" href={routes.auth.forgotPassword}>
          {forgotPasswordLink}
        </Link>
      </div>
    </AuthLayout>
  );
};
