import Head from 'next/head';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { AddLanguage } from '@/modules/language-module';

const AddLanguagePage = () => {
  return (
    <>
      <Head>
        <title>Add Language</title>
      </Head>
      <AddLanguage />
    </>
  );
};

AddLanguagePage.getLayout = getDashboardLayout;

export default AddLanguagePage;
