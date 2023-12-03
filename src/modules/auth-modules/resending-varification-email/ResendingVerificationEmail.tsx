import React, { FC } from 'react';

import Head from 'next/head';
import { useSendConfirmationCode } from '@/modules/auth-modules/resending-varification-email/hooks/useSendConfirmationCode';
import { useTranslation } from '@/components/internationalization';
import { EmailSuccessMessage } from '@/modules/auth-modules/resending-varification-email/components/EmailSuccesMessage';
import { ResendLink } from '@/modules/auth-modules/resending-varification-email/components/ResendLink';
import { Spinner } from '@/ui/spinner/Spinner';
import { Header } from '@/components';

type PropsType = { code: string };

export const ResendingVerificationEmail: FC<PropsType> = ({ code }) => {
  const { isLoading, isError, isSuccess } = useSendConfirmationCode(code);
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className="flex h-screen bg-dark-700 items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <Head>
        <title>
          {isSuccess
            ? t.auth.registrationConfirmation.emailSuccessMessage.headTitleT
            : t.auth.ResendingVerificationLink.headTitleT}
        </title>
      </Head>
      <Header />
      {isSuccess && <EmailSuccessMessage />}
      {isError && <ResendLink path="registration/resend-form" />}
    </>
  );
};
