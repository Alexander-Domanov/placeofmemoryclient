import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Button, Flex, Input } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { ILocation } from '@/types';
import { IPersonForMap } from '@/types/persons/person-for-map.type';
import { mapOptions } from '@/modules/maps/components/options/MapOptions';

const containerStyle = {
  height: '60vh',
  width: '100%',
  borderRadius: '10px',
  // position: 'absolute',
  // overflow: 'none',
};

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: false,
  fullscreenControl: true,
  streetViewControl: true,
};

interface MapWithMarkersProps {
  center: Omit<ILocation, 'place'>;
  locations: IPersonForMap[];
}

const MapWithClusterMarkers: FC<MapWithMarkersProps> = ({
  center,
  locations,
}) => {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    libraries: ['places'],
    version: 'weekly',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedCenter, setSelectedCenter] =
    useState<google.maps.LatLngLiteral>();
  const [selectedLocations, setSelectedLocations] = useState<IPersonForMap[]>(
    []
  );

  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (center) {
      setSelectedCenter({ lat: center.lat, lng: center.lng });
      setSelectedLocations(locations);
    }
  }, [center]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(7);
    }
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (map && selectedLocations.length > 0) {
      const infoWindow = new google.maps.InfoWindow({
        content: '',
      });

      const markers = selectedLocations.map((p) => {
        const marker = new google.maps.Marker({
          position: {
            lat: p.location.lat,
            lng: p.location.lng,
          },
          map: mapRef.current,
          icon: '/google/people35.png',
          clickable: true,
          cursor: 'pointer',
          // animation: google.maps.Animation.DROP,
        });

        const contentString = `
<Flex gap="large" vertical>
<img src="${p.url}" alt="${p.firstName} ${
          p.lastName
        }" style="max-width: 100px; max-height: 100px;">
<p>${p.firstName} ${p.lastName}: ${p.birthDate || 'n/a'} - ${
          p.deathDate || 'n/a'
        }</p>
</Flex>`;

        marker.addListener('click', () => {
          infoWindow.close();
          infoWindow.setContent(contentString);
          infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -10) });
          infoWindow.open(marker.getMap(), marker);
        });

        return marker;
      });

      const markerCluster = new MarkerClusterer({
        map,
        markers,
      });
    }
  }, [map, selectedLocations]);

  const onLoadAutoComplete: (
    autocomplete: google.maps.places.Autocomplete
  ) => void = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const position = {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      };
      setSelectedCenter(position);
      setInputValue(place.formatted_address || '');
    }
  };

  return isLoaded ? (
    <Flex gap="large" vertical>
      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="primary" onClick={() => panTo(center)}>
            Pan to location Poland …
          </Button>
        </div>

        <Flex align="center">
          <Autocomplete
            onPlaceChanged={onPlaceChanged}
            onLoad={onLoadAutoComplete}
          >
            <Input
              placeholder="Go to ...   input location"
              allowClear
              title={inputValue}
              style={{
                width: 400,
                textOverflow: `ellipses`,
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Autocomplete>
        </Flex>
      </Flex>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedCenter}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ ...mapOptions, ...defaultMapOptions }}
      />
    </Flex>
  ) : (
    <></>
  );
};

export default MapWithClusterMarkers;
