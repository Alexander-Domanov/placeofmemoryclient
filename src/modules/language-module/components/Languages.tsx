import { Breadcrumb, Button, Form } from 'antd';
import React from 'react';
import {
  LanguageListTable,
  LanguageModalForm,
  useOpenCloseModal,
  useCreateLanguage,
  useMessage,
  BREAD_CRUMBS_LANGUAGE,
} from '@/modules/language-module';
import { ILanguage } from '@/types';

export const Languages = () => {
  const {
    mutateCreateLanguage,
    isSuccessCreateLanguage,
    isLoadingCreateLanguage,
    errorCreateLanguage,
  } = useCreateLanguage();
  const { isModalOpen, setIsModalOpen } = useOpenCloseModal({
    isSuccessLanguage: isSuccessCreateLanguage,
  });
  const [form] = Form.useForm();
  const { contextHolder } = useMessage({
    error: errorCreateLanguage,
    isSuccess: isSuccessCreateLanguage,
  });
  const onFinishSubmit = (data: ILanguage) => {
    mutateCreateLanguage({ ...data });
  };

  return (
    <>
      {contextHolder}
      <Breadcrumb items={BREAD_CRUMBS_LANGUAGE} />
      <>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Language
        </Button>
      </>
      <LanguageModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Add language"
        useForm={form}
        isSuccess={isSuccessCreateLanguage}
        isLoading={isLoadingCreateLanguage}
        onFinishSubmit={onFinishSubmit}
      />
      <>
        <LanguageListTable />
      </>
    </>
  );
};
