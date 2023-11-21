import { ConfigProvider, Select, Space, Spin } from 'antd';
import React, { FC } from 'react';
import { useGetListLanguages, useLangSwitcher } from '@/services';
import { useUserStore } from '@/store/userStore';

const ChevronDownIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    style={{ color: '#fff' }}
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4 ml-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const DashboardSelectLanguage = () => {
  const { lang } = useUserStore();
  const { languages, isFetchingDataListLanguagesLanguages } =
    useGetListLanguages();
  const { mutateLangSwitcher } = useLangSwitcher();
  const handleChange = (option: any) => {
    mutateLangSwitcher({ lang: option.label });
  };

  const optionsLanguagesList = languages?.items.map((language) => ({
    value: language.id,
    label: language.code,
  }));

  return (
    <>
      {!isFetchingDataListLanguagesLanguages && lang ? (
        <Space wrap>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: 'rgb(44 44 44)',
                  optionActiveBg: '#d5dae0',
                  colorBgElevated: '#4E4E4E',
                  controlItemBgActive: '#a4a2a2',
                  controlOutline: 'transparent',
                  colorText: '#fff',
                  lineType: 'round',
                },
              },
            }}
          >
            <Select
              onChange={(value, option) => handleChange(option)}
              defaultValue={lang}
              style={{ width: 60 }}
              suffixIcon={<ChevronDownIcon />}
              options={optionsLanguagesList}
              loading={isFetchingDataListLanguagesLanguages}
            />
          </ConfigProvider>
        </Space>
      ) : (
        <Spin />
      )}
    </>
  );
};
