import { Breadcrumb, Button, Flex, Form, Table } from 'antd';
import React from 'react';
import {
  LanguageModalForm,
  useCreateLanguage,
  useOpenCloseModal,
} from '@/modules/language-module';
import { ILanguage } from '@/types';
import { useGetListLanguages } from '@/services';
import { ColumnsTableLanguages } from '@/modules/language-module/components/ColumnsTableLanguages';
import { routes } from '@/common/routing/routes';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';

export const Languages = () => {
  const { t } = useTranslation();
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
  const columnsTableLanguages = ColumnsTableLanguages(t);

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.languages.index,
      text: t.dashboard.languages.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex justify="space-between" align="center" gap="middle">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          title={t.dashboard.languages.add.title}
        >
          {t.dashboard.languages.add.label}
        </Button>
      </Flex>

      <LanguageModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={t.dashboard.languages.form.title}
        useForm={form}
        isSuccess={isSuccessCreateLanguage}
        isLoading={isLoadingCreateLanguage}
        onFinishSubmit={onFinishSubmit}
      />

      <Table
        bordered
        rowKey={(record) => record.id}
        size="small"
        loading={isLoading}
        columns={columnsTableLanguages}
        dataSource={languages?.items}
        scroll={{ x: 1000 }}
        pagination={{
          position: ['bottomCenter'],
        }}
      />
    </Flex>
  );
};
