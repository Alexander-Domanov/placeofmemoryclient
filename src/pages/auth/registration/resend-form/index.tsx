import React from 'react';

import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import { useTranslation } from '@/components/internationalization';
import { ResendVerificationEmail } from '@/modules/auth-modules/resend-verification-form/ResendVerificationEmail';
import { Header } from '@/components';

const ResendForm: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.auth.resendForm.titleT}</title>
      </Head>
      <Header />
      <ResendVerificationEmail />
    </>
  );
};

export default ResendForm;
