import React, { useState } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { Input, message, Space } from 'antd';
import { extractPlaceData } from '@/modules/maps/components/helpers/placeUtils';
import { AutoCompleteMapComponentProps } from '@/modules/maps/components/types/AutoCompleteMapComponentProps.type';

const AutoCompleteMapComponent: React.FC<AutoCompleteMapComponentProps> = ({
  onPlaceSelected,
}) => {
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    version: 'weekly',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` || '',
  });

  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad: (autocomplete: google.maps.places.Autocomplete) => void = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const filteredPlace = extractPlaceData(place);
      onPlaceSelected(filteredPlace);
      message.success(`Found place: ${place.formatted_address}`);
    } else {
      message.error('Please enter text');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Space direction="vertical">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <Input
          placeholder="Search for Tide Information"
          allowClear
          style={{
            width: 400,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            textOverflow: `ellipses`,
          }}
        />
      </Autocomplete>
    </Space>
  );
};

export default AutoCompleteMapComponent;
