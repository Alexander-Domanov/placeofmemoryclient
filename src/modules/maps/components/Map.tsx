import { FC, useCallback, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { message } from 'antd';
import {
  containerStyle,
  mapOptions,
} from '@/modules/maps/components/options/MapOptions';
import { extractPlaceData } from '@/modules/maps/components/helpers/placeUtils';

import { AutoCompleteMapComponentProps } from '@/modules/maps/components/types/AutoCompleteMapComponentProps.type';

const center = {
  lat: 52.2296756,
  lng: 21.0122287,
};

const MapComponent: FC<AutoCompleteMapComponentProps> = ({
  onPlaceSelected,
}) => {
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    version: 'weekly',
    language: 'en',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const clickedLocation = {
      lat: event.latLng?.lat(),
      lng: event.latLng?.lng(),
    };

    if (marker) {
      marker.setMap(null);
    }

    if (clickedLocation.lat && clickedLocation.lng) {
      const geocoder = new google.maps.Geocoder();
      // @ts-ignore
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const place = results[0] as google.maps.GeocoderResult;
          const filteredPlace = extractPlaceData(place);
          const newMarker = new google.maps.Marker({
            position: clickedLocation as google.maps.LatLngLiteral,
            map,
            title: filteredPlace.formattedAddress,
          });
          setMarker(newMarker);
          message.success(`Found place: ${marker?.getTitle()}`);
          onPlaceSelected(filteredPlace);
        }
      });
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6.5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
      onClick={handleMapClick}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
