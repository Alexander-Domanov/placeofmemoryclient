import { Breadcrumb, Spin, Typography } from 'antd';
import React from 'react';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { routes } from '@/common/routing/routes';
import {
  AddLanguageForm,
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
  const onFinishSubmit = (data: ILanguage) => mutateCreateLanguage({ ...data });
  return (
    <>
      {contextHolder}
      <Breadcrumb items={breadcrumbs} />
      <div className="flex justify-center">
        <Title level={4}>Add Language or Update Language</Title>
      </div>
      <Spin spinning={isLoadingCreateLanguage} delay={500}>
        <AddLanguageForm
          onFinishSubmit={onFinishSubmit}
          isSuccess={isSuccessCreateLanguage}
        />
      </Spin>
    </>
  );
};
