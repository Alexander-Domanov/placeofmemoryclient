import { Table } from 'antd';
import { useState } from 'react';
import { useGetListLanguages } from '@/services';
import {
  getColumnsLanguages,
  useDeleteLanguage,
  useMessage,
} from '@/modules/language-module';

export const LanguageListTable = () => {
  const [currentID, setCurrentID] = useState<number | null>(null);
  const { dataListLanguages, isFetchingDataListLanguagesLanguages } =
    useGetListLanguages();
  const {
    mutateDeleteLanguage,
    isSuccessDeleteLanguage,
    errorDeleteLanguage,
    isLoadingDeleteLanguage,
  } = useDeleteLanguage();

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

  return (
    <>
      {contextHolder}
      <Table
        loading={isFetchingDataListLanguagesLanguages}
        columns={getColumnsLanguages({
          handlerDeleteLanguage,
          isLoadingDeleteLanguage,
          currentID,
        })}
        dataSource={dataListLanguages?.items}
        className="pt-3"
      />
    </>
  );
};
