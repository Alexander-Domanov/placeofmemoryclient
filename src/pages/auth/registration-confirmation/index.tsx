import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { ResendingVerificationEmail } from '@/modules/auth-modules/resending-varification-email/ResendingVerificationEmail';

const RegistrationConfirmation: NextPageWithLayout = () => {
  const {
    query: { code },
  } = useRouter();

  return <ResendingVerificationEmail code={code as string} />;
};

export default RegistrationConfirmation;
