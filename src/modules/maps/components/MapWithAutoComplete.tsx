import { FC, useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Button, Flex, Input, message } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { MapLocationProps } from '@/modules/maps/components/types/AutoCompleteMapComponentProps.type';

const initialCenter = {
  lat: 52.2296756,
  lng: 21.0122287,
};
const maxZoomLevel = 18;

const MapWithAutoComplete: FC<MapLocationProps> = ({ onDefineLocation }) => {
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    version: 'weekly',
    language: 'en',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [center, setCenter] = useState(initialCenter);
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [allowMapClick, setAllowMapClick] = useState(true);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (map && markerPosition) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(markerPosition);
      map.fitBounds(bounds);
    }
  }, [map, markerPosition]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    map.setOptions({
      maxZoom: maxZoomLevel,
    });
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);
  const onLoadAutoComplete: (
    autocomplete: google.maps.places.Autocomplete
  ) => void = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (allowMapClick) {
      const clickedLocation = {
        lat: event.latLng?.lat() || 0,
        lng: event.latLng?.lng() || 0,
      };
      setMarkerPosition(clickedLocation);
      setCenter(clickedLocation);
      setMarkerVisible(true);
      onDefineLocation(clickedLocation);
    }
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const position = {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      };
      setMarkerPosition(position);
      setCenter(position);
      setMarkerVisible(true);
      onDefineLocation(position);
      setInputValue(place.formatted_address || '');
    } else {
      message.error('Please enter text');
    }
  };

  const handleSearchTypeChange = () => {
    setMarkerVisible(false);
    onDefineLocation(null);
  };

  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(userLocation);
        setCenter(userLocation);
        setMarkerVisible(true);
        map?.panTo(userLocation);
        map?.setZoom(maxZoomLevel);
        onDefineLocation(userLocation);
      });
    }
  };

  return isLoaded ? (
    <Flex vertical gap="middle">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoadAutoComplete}>
        <Flex gap="small">
          <Button
            type="default"
            onClick={requestUserLocation}
            style={{ cursor: 'pointer', color: '#000000', width: '60px' }}
            icon={<AimOutlined style={{ fontSize: 22 }} />}
          />

          <Input
            placeholder="Show your location or Search location"
            allowClear
            title={inputValue}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Flex>
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={{
          aspectRatio: '16/9',
          borderRadius: '6px',
        }}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {markerVisible && markerPosition && (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>

      <Button
        onClick={handleSearchTypeChange}
        style={{ cursor: 'pointer', color: '#f66321' }}
      >
        Remove marker
      </Button>

      <Button
        onClick={() => setAllowMapClick(!allowMapClick)}
        style={{ cursor: 'pointer' }}
      >
        {allowMapClick ? 'Disable Map Click' : 'Enable Map Click'}
      </Button>
    </Flex>
  ) : (
    <Flex vertical>
      <p>Loading...</p>
    </Flex>
  );
};

export default MapWithAutoComplete;
