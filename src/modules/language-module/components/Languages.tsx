import { Breadcrumb, Button, Flex, Form, Space, Table } from 'antd';
import React from 'react';
import {
  BREAD_CRUMBS_LANGUAGE,
  LanguageModalForm,
  useCreateLanguage,
  useOpenCloseModal,
} from '@/modules/language-module';
import { ILanguage } from '@/types';
import { useGetListLanguages } from '@/services';
import { columnsTableLanguages } from '@/modules/language-module/components/ColumnsTableLanguages';

export const Languages = () => {
  const { languages, isLoading } = useGetListLanguages();
  const {
    mutateCreateLanguage,
    isSuccessCreateLanguage,
    isLoadingCreateLanguage,
  } = useCreateLanguage();
  const { isModalOpen, setIsModalOpen } = useOpenCloseModal({
    isSuccessLanguage: isSuccessCreateLanguage,
  });

  const [form] = Form.useForm();

  const onFinishSubmit = (data: ILanguage) => {
    mutateCreateLanguage({ ...data });
  };

  if (isSuccessCreateLanguage) form.resetFields();

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={BREAD_CRUMBS_LANGUAGE} />
      </div>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Flex
          justify="space-between"
          align="center"
          gap="middle"
          style={{ marginBottom: '15px' }}
        >
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Language
          </Button>
        </Flex>
        <LanguageModalForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Add language"
          useForm={form}
          isSuccess={isSuccessCreateLanguage}
          isLoading={isLoadingCreateLanguage}
          onFinishSubmit={onFinishSubmit}
        />
        <Table
          bordered
          size="small"
          loading={isLoading}
          columns={columnsTableLanguages}
          dataSource={languages?.items}
        />
      </Space>
    </Flex>
  );
};
