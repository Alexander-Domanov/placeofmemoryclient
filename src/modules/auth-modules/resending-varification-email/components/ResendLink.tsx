import { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/internationalization';

export const ResendLink: FC<{ path: string }> = ({ path }) => {
  const { t } = useTranslation();
  const { titleT, resendLinkT, descriptionT } =
    t.auth.ResendingVerificationLink;
  return (
    <div className="flex justify-center bg-dark-700 gap-5 text-base sm:text-sm items-center flex-col text-light-300 h-screen">
      <h2 className="font-bold text-2xl text-center">{titleT}</h2>
      <span className="text-center">{descriptionT}</span>
      <Link className="underline" href={path}>
        {resendLinkT}
      </Link>
    </div>
  );
};
