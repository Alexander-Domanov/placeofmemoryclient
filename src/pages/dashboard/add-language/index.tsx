import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { Languages } from '@/modules/language-module';

const AddLanguagePage = () => {
  return (
    <>
      <Head>
        <title>Add Language</title>
      </Head>
      <Languages />
    </>
  );
};

AddLanguagePage.getLayout = getDashboardLayout;

export default AddLanguagePage;
