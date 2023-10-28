import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Button, Input, message, Space } from 'antd';
import { containerStyle } from '@/modules/maps/components/options/MapOptions';
import { MapLocationProps } from '@/modules/maps/components/types/AutoCompleteMapComponentProps.type';

const initialCenter = {
  lat: 52.2296756,
  lng: 21.0122287,
};
const maxZoomLevel = 18;

const styleButton = {
  cursor: 'pointer',
  color: '#1890ff',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
};

const MapWithAutoComplete: React.FC<MapLocationProps> = ({
  onDefineLocation,
}) => {
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    version: 'weekly',
    language: 'en',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` || '',
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
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

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    map.setOptions({
      maxZoom: maxZoomLevel,
    });
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
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
    <Space direction="vertical" align="center">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoadAutoComplete}>
        <Input
          placeholder="Search location…"
          allowClear
          title={inputValue}
          style={{
            width: 400,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            textOverflow: `ellipses`,
            marginBottom: '16px',
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{
          ...containerStyle,
          height: '400px',
          width: '450px',
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
      <Space direction="horizontal" style={{ marginBottom: '10px' }}>
        <Button
          onClick={handleSearchTypeChange}
          style={{ ...styleButton, color: '#f66321' }}
        >
          Remove marker
        </Button>
        <Button
          onClick={() => setAllowMapClick(!allowMapClick)}
          style={styleButton}
        >
          {allowMapClick ? 'Disable Map Click' : 'Enable Map Click'}
        </Button>
        <Button onClick={requestUserLocation} style={styleButton}>
          Request My Location
        </Button>
      </Space>
    </Space>
  ) : (
    <></>
  );
};

export default MapWithAutoComplete;
