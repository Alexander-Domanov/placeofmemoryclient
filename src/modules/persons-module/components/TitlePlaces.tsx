import React, { FC, useState } from 'react';
import { AutoComplete } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { useTitlePlaces } from '@/modules/places-module/hooks/useTtitlePlaces';

interface TitlePlacesFormProps {
  onFinishValue: (placeDetail: {
    value: string;
    id: number;
    formattedAddress: string;
  }) => void;
}
export const TitlePlaces: FC<TitlePlacesFormProps> = ({ onFinishValue }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    searchTerm: '',
  });

  const search = useDebounce(pagination.searchTerm, 500);

  const { titlePlaces } = useTitlePlaces(
    pagination.page,
    pagination.pageSize,
    search
  );

  const handleSearch = (value: string) => {
    setPagination({ ...pagination, searchTerm: value });
  };

  const options = titlePlaces?.items.map((place) => ({
    value: place.nameCemetery,
    id: place.id,
    formattedAddress: place.formattedAddress,
  }));

  const findIdFromOption = (selectedValue: string) => {
    const selectedOption = options?.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      return selectedOption;
    }
    return null;
  };

  return (
    <AutoComplete
      style={{ width: '100%' }}
      onSearch={handleSearch}
      status="warning"
      placeholder="Search place by name"
      options={options}
      onSelect={(value) => {
        const placeDetail = findIdFromOption(value);
        if (placeDetail !== null) {
          onFinishValue(placeDetail);
        }
      }}
      allowClear
    />
  );
};