import React from 'react';

import Link from 'next/link';

import { useTranslation } from '@/components/internationalization';

export const EmailSuccessMessage = () => {
  const { t } = useTranslation();
  const { titleT, descriptionT, signInT } =
    t.auth.registrationConfirmation.emailSuccessMessage;
  return (
    <div className="flex justify-center bg-dark-700 items-center text-base sm:text-sm gap-5 flex-col text-light-300 h-screen md:pt-[28px] md:pb-[28px] lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <h2 className="font-semibold text-center text-2xl">{titleT}</h2>
      <span className="">{descriptionT}</span>
      <Link className="underline" href="/">
        {signInT}
      </Link>
    </div>
  );
};
