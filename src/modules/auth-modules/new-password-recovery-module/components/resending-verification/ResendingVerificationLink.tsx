import Link from 'next/link';
import { AuthLayout } from '@/components';
import { routes } from '@/common/routing/routes';

export const ResendingVerificationLink = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <span className="font-bold">
          Тэрмін дзеяння спасылкі для праверкі электроннай пошты скончыўся
        </span>
        <span>
          Здаецца, тэрмін дзеяння спасылкі для праверкі скончыўся. Не
          хвалюйцеся, мы можам адправіць спасылку яшчэ раз
        </span>
        <Link className="underline" href={routes.auth.forgotPassword}>
          Паўторна адправіць спасылку для праверкі
        </Link>
      </div>
    </AuthLayout>
  );
};
