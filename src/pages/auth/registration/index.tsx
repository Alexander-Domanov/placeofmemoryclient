import Head from 'next/head';
import { SignUp } from '@/modules/auth-modules/sign-up-module';
import { useTranslation } from '@/components/internationalization';
import { Header } from '@/components';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.auth.signUp.indexTitle}| Mogilki</title>
      </Head>

      <Header />

      {/* <SiteLayout contacts={contacts}> */}
      <SignUp />
      {/* </SiteLayout> */}
    </>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { data: contacts } = await getContacts();
//
//   return {
//     props: {
//       contacts,
//     },
//     revalidate: 30,
//   };
// };

// SignUpPage.getLayout = getLayoutWithHeader;
export default SignUpPage;
