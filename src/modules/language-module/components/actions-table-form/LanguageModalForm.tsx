import { Spin } from 'antd';
import React from 'react';
import {
  IAddLanguageForm,
  IModalLanguage,
  LanguageForm,
  LanguageModal,
} from '@/modules/language-module';

interface ILanguageCreateUpdate
  extends Omit<IModalLanguage, 'handleCancelCallBack' | 'children'>,
    IAddLanguageForm {
  isLoading: boolean;
}
export const LanguageModalForm = ({
  setIsModalOpen,
  isModalOpen,
  title,
  onFinishSubmit,
  isSuccess,
  isLoading,
  useForm,
}: ILanguageCreateUpdate) => {
  return (
    <LanguageModal
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
      title={title}
      handleCancelCallBack={() => useForm.resetFields()}
    >
      <Spin spinning={isLoading} delay={500}>
        <div className="flex justify-center w-full pt-3">
          <LanguageForm
            onFinishSubmit={onFinishSubmit}
            isSuccess={isSuccess}
            useForm={useForm}
          />
        </div>
      </Spin>
    </LanguageModal>
  );
};
