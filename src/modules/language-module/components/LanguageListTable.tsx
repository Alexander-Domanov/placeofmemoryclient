import { Form, Table } from 'antd';
import { useState } from 'react';
import { useGetListLanguages } from '@/services';
import {
  getColumnsLanguages,
  LanguageModalForm,
  useOpenCloseModal,
  useDeleteLanguage,
  useGetLanguage,
  useMessage,
  useUpdateLanguage,
  useHandleDataFromServer,
} from '@/modules/language-module';
import { ILanguage } from '@/types';

export const LanguageListTable = () => {
  const [currentID, setCurrentID] = useState<number | null>(null);
  const [updateCurrentID, setUpdateCurrentID] = useState<number | null>(null);
  const [form] = Form.useForm();
  const { dataListLanguages, isFetchingDataListLanguagesLanguages } =
    useGetListLanguages();
  const {
    mutateDeleteLanguage,
    isSuccessDeleteLanguage,
    errorDeleteLanguage,
    isLoadingDeleteLanguage,
  } = useDeleteLanguage();
  const { mutateUpdateLanguage, isSuccessUpdateLanguage } = useUpdateLanguage();
  const { dataLanguage, isFetchingLanguage } = useGetLanguage({
    languageID: updateCurrentID,
  });
  const { isModalOpen, setIsModalOpen } = useOpenCloseModal({
    isSuccessLanguage: isSuccessUpdateLanguage,
  });
  const handlerUpdateLanguage = (updateID: number | null) => {
    if (updateID) {
      setUpdateCurrentID(updateID);
      setIsModalOpen(true);
    }
  };
  const onFinishSubmit = (data: ILanguage) => {
    if (updateCurrentID)
      mutateUpdateLanguage({ languageID: updateCurrentID, ...data });
  };
  const handlerDeleteLanguage = (languageID: number | null) => {
    if (languageID) {
      mutateDeleteLanguage({ languageID });
      setCurrentID(languageID);
    }
  };

  const { contextHolder } = useMessage({
    error: errorDeleteLanguage,
    isSuccess: isSuccessDeleteLanguage,
  });

  useHandleDataFromServer({
    data: dataLanguage,
    isSuccess: isFetchingLanguage,
    form,
  });
  return (
    <>
      {contextHolder}
      <Table
        loading={isFetchingDataListLanguagesLanguages}
        columns={getColumnsLanguages({
          handlerDeleteLanguage,
          handlerUpdateLanguage,
          isLoadingDeleteLanguage,
          currentID,
        })}
        dataSource={dataListLanguages?.items}
        className="pt-3"
      />
      <LanguageModalForm
        useForm={form}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        isSuccess={isSuccessUpdateLanguage}
        isLoading={isFetchingLanguage}
        onFinishSubmit={onFinishSubmit}
        title="Update language"
      />
    </>
  );
};
