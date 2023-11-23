import { FC, useEffect, useState } from 'react';
import { AutoComplete, Flex, Select } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { useTitlePlaces } from '@/modules/places-module/hooks/useTtitlePlaces';

const { Option } = Select;

const renderTitle = (title: string, id: number) => (
  <span key={id}>{title}</span>
);

const renderItem = (title: string) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
    </div>
  ),
});

interface TitlePlacesFormProps {
  onFinishValue: (placeDetail: {
    namePlace: string;
    id: number;
    formattedAddress: string;
  }) => void;
  disabled?: boolean;
}

export const TitlePlaces: FC<TitlePlacesFormProps> = ({
  onFinishValue,
  disabled,
}) => {
  const [searchParam, setSearchParam] = useState('name');

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    searchTerm: '',
  });

  const search = useDebounce(pagination.searchTerm, 500);

  const { titlePlaces } = useTitlePlaces({
    pageNumber: pagination.page,
    pageSize: pagination.pageSize,
    [searchParam]: search.toLowerCase(),
  });

  const handleSearch = (value: string) => {
    setPagination({ ...pagination, searchTerm: value });
  };

  const options = titlePlaces?.items.map((place) => ({
    label: renderTitle(`${place.country} (${place.city})`, place.id),
    options: [renderItem(place.nameCemetery)],
    id: place.id,
    namePlace: place.nameCemetery,
    formattedAddress: place.formattedAddress,
  }));

  const findIdFromOption = (selectedValue: string) => {
    const selectedOption = options?.find(
      (option) => option.namePlace === selectedValue
    );

    if (selectedOption) {
      return selectedOption;
    }
    return null;
  };

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
  }, [searchParam]);

  return (
    <Flex gap={0}>
      <Select
        style={{ width: 120 }}
        defaultValue="name"
        onChange={(value) => setSearchParam(value)}
        disabled={disabled}
      >
        <Option key="name" value="name">
          Name
        </Option>
        <Option key="city" value="city">
          City
        </Option>
        <Option key="country" value="country">
          Country
        </Option>
      </Select>

      <AutoComplete
        style={{ width: '100%' }}
        onSearch={handleSearch}
        placeholder="Search for a place"
        options={options}
        onSelect={(value) => {
          const placeDetail = findIdFromOption(value);
          if (placeDetail !== null) {
            onFinishValue(placeDetail);
          }
        }}
        allowClear
        disabled={disabled}
      />
    </Flex>
  );
};
