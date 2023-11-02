import { Select, Space, Spin } from 'antd';
import { useGetListLanguages, useLangSwitcher } from '@/services';
import { useUserStore } from '@/store/userStore';

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
          <Select
            onChange={(value, option) => handleChange(option)}
            defaultValue={lang}
            style={{ width: 60, borderColor: 'transparent' }}
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
