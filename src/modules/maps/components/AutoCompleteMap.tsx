import React, { useState } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { Input, message, Space } from 'antd';

interface AutoCompleteMapComponentProps {
  onPlaceSelected: (place: PlaceResult) => void;
}

export interface PlaceResult {
  country: string;
  city: string;
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  formattedAddress: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
}

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
      const filteredPlace: PlaceResult = {
        country:
          place.address_components?.find((c) => c.types.includes('country'))
            ?.long_name || '',
        city:
          place.address_components?.find((c) => {
            return c.types.includes('locality');
          })?.long_name || '',
        administrativeAreaLevel1:
          place.address_components?.find((c) => {
            return c.types.includes('administrative_area_level_1');
          })?.long_name || '',
        administrativeAreaLevel2:
          place.address_components?.find((c) => {
            return c.types.includes('administrative_area_level_2');
          })?.long_name || '',
        street:
          place.address_components?.find((c) => {
            return c.types.includes('route');
          })?.long_name || '',
        streetNumber:
          place.address_components?.find((c) => {
            return c.types.includes('street_number');
          })?.long_name || '',
        postalCode:
          place.address_components?.find((c) => {
            return c.types.includes('postal_code');
          })?.long_name || '',
        location: {
          name: place.name || '',
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        },
        formattedAddress: place.formatted_address || '',
      };
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
