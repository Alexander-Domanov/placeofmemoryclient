import React from 'react';

import Head from 'next/head';
import { useTranslation } from '@/components/internationalization';
import { NextPageWithLayout } from '@/pages/_app';
import { ResendRecoveryForm } from '@/modules/auth-modules/forgot-password-module/components/resend-recovery-form/ResendRecoveryForm';
import { Header } from '@/components';

const ResendForm: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.auth.resendForm.headTitle}</title>
      </Head>
      <Header />
      <ResendRecoveryForm />
    </>
  );
};

export default ResendForm;
