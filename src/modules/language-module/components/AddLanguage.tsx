import { Breadcrumb, Button, Form, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { routes } from '@/common/routing/routes';
import {
  AddLanguageForm,
  ModalLanguage,
  useCreateLanguage,
  useMessage,
} from '@/modules/language-module';
import { ILanguage } from '@/types';

const { Title } = Typography;

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.addLanguage.index,
    title: 'Add Language',
  },
];
export const AddLanguage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    mutateCreateLanguage,
    isSuccessCreateLanguage,
    isLoadingCreateLanguage,
    errorCreateLanguage,
  } = useCreateLanguage();
  const { contextHolder } = useMessage({
    error: errorCreateLanguage,
    isSuccess: isSuccessCreateLanguage,
  });
  const onFinishSubmit = (data: ILanguage) => {
    mutateCreateLanguage({ ...data });
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isSuccessCreateLanguage]);

  return (
    <>
      {contextHolder}
      <Breadcrumb items={breadcrumbs} />
      <div className="flex justify-center">
        <Title level={4}>Add Language or Update Language</Title>
      </div>
      <>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Language
        </Button>
        <ModalLanguage
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          title="Add Language"
          handleCancelCallBack={() => form.resetFields()}
        >
          <Spin spinning={isLoadingCreateLanguage} delay={500}>
            <div className="flex justify-center w-full pt-3">
              <AddLanguageForm
                onFinishSubmit={onFinishSubmit}
                isSuccess={isSuccessCreateLanguage}
                useForm={form}
              />
            </div>
          </Spin>
        </ModalLanguage>
      </>
    </>
  );
};
