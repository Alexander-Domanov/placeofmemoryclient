import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Button, Divider, Form, Input, message, Space } from 'antd';
import { containerStyle } from '@/modules/maps/components/MapOptions';
import { extractPlaceData } from '@/modules/maps/components/helpers/placeUtils';
import { AutoCompleteMapComponentProps } from '@/modules/maps/components/types/AutoCompleteMapComponentProps.type';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

const initialCenter = {
  lat: 52.2296756,
  lng: 21.0122287,
};
const maxZoomLevel = 18;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const styleButton = {
  cursor: 'pointer',
  color: '#1890ff',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
};

const MapWithAutoComplete: React.FC<AutoCompleteMapComponentProps> = ({
  onPlaceSelected,
}) => {
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    version: 'weekly',
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

  const [form] = Form.useForm();

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
    }
  };
  const onPlaceSelectedToForm = (place: IPlaceResultAfterExtract): void => {
    form.setFieldValue(['country'], place?.country);
    form.setFieldValue(['city'], place?.city);
    form.setFieldValue(
      ['administrativeAreaLevel1'],
      place?.administrativeAreaLevel1
    );
    form.setFieldValue(
      ['administrativeAreaLevel2'],
      place?.administrativeAreaLevel2
    );
    form.setFieldValue(['street'], place?.street);
    form.setFieldValue(['streetNumber'], place?.streetNumber);
    form.setFieldValue(['postalCode'], place?.postalCode);
    form.setFieldValue(['formattedAddress'], place?.formattedAddress);
    form.setFieldValue(
      ['location', 'name'],
      place?.formattedAddress.split(',')[0]
    );
    form.setFieldValue(['location', 'lat'], place?.location?.lat);
    form.setFieldValue(['location', 'lng'], place?.location?.lng);
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
      // message.success(`Found place: ${place.formatted_address}`);
    } else {
      message.error('Please enter text');
    }
  };

  const handleSearchTypeChange = () => {
    setMarkerVisible(false);
    form.resetFields();
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
      });
    }
  };

  const onFinish = (values: any) => {
    // message.info(`fin ===+_===== ${JSON.stringify(values)}`);
    onPlaceSelected(values);
  };

  const onExecuteGeoCoder = () => {
    if (markerPosition?.lat && markerPosition?.lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const place = results[0] as google.maps.GeocoderResult;
          const filteredPlace = extractPlaceData(place);
          onPlaceSelectedToForm(filteredPlace);
        }
      });
    }
  };

  return isLoaded ? (
    <Space direction="vertical" align="center">
      <Button onClick={onExecuteGeoCoder}>Define Location</Button>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoadAutoComplete}>
        <Input
          placeholder="Search location…"
          allowClear
          style={{
            width: 400,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            textOverflow: `ellipses`,
            marginBottom: '16px',
          }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {markerVisible && markerPosition && (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>
      <Space direction="horizontal">
        <Button onClick={handleSearchTypeChange} style={styleButton}>
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
      <Divider />
      <Space direction="vertical">
        <Form
          {...layout}
          form={form}
          // size="small"
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          // validateMessages={validateMessages}
        >
          <Form.Item
            name={['country']}
            label="Country"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input placeholder="Input Country" allowClear />
          </Form.Item>
          <Form.Item name={['city']} label="City" rules={[{ required: true }]}>
            <Input placeholder="Input City" allowClear />
          </Form.Item>
          <Form.Item name={['administrativeAreaLevel1']} label="State">
            <Input placeholder="Input State" allowClear />
          </Form.Item>
          <Form.Item name={['administrativeAreaLevel2']} label="District">
            <Input placeholder="Input District" allowClear />
          </Form.Item>
          <Form.Item name={['street']} label="Street">
            <Input placeholder="Input Street" allowClear />
          </Form.Item>
          <Form.Item name={['streetNumber']} label="Street Number">
            <Input placeholder="Input Street Number" allowClear />
          </Form.Item>
          <Form.Item name={['formattedAddress']} label="Formatted Address">
            <Input placeholder="Input Street Number" allowClear />
          </Form.Item>
          <Form.Item
            name={['location', 'name']}
            label="Location Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Input Longtitude" allowClear />
          </Form.Item>
          <Form.Item
            name={['location', 'lng']}
            label="Longtitude"
            rules={[{ required: true }]}
          >
            <Input placeholder="Input Longtitude" allowClear />
          </Form.Item>
          <Form.Item
            name={['location', 'lat']}
            label="Latitude"
            rules={[{ required: true }]}
          >
            <Input placeholder="Input Longtitude" allowClear />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  ) : (
    <></>
  );
};

export default MapWithAutoComplete;
