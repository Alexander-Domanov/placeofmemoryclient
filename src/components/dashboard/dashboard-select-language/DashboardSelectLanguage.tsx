import { Select, Space, Spin } from 'antd';
import { useGetListLanguages, useLangSwitcher } from '@/services';

export const DashboardSelectLanguage = () => {
  const {
    dataListLanguages,
    isSuccessDataListLanguagesLanguages,
    isErrorDataListLanguagesLanguages,
    isFetchingDataListLanguagesLanguages,
  } = useGetListLanguages();
  const { mutateLangSwitcher, isErrorLangSwitcher, isSuccessLangSwitcher } =
    useLangSwitcher();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const optionsLanguagesList = dataListLanguages?.items.map(
    (language, index) => ({
      value: language.name + index,
      label: language.name,
    })
  );

  return (
    <>
      {!isFetchingDataListLanguagesLanguages ? (
        <Space wrap>
          <Select
            onChange={handleChange}
            // defaultValue={defaultValueLanguage}
            style={{ width: 120 }}
            options={optionsLanguagesList}
            loading={isFetchingDataListLanguagesLanguages}
          />
        </Space>
      ) : (
        <Spin className="w-[120px]" />
      )}
    </>
  );
};
