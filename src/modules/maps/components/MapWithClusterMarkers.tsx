import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Button, Flex, Input } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { ILocation } from '@/types';
import { IPersonForMap } from '@/types/persons/person-for-map.type';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { useTranslation } from '@/components/internationalization';

const containerStyle = {
  height: '60vh',
  width: '100%',
  borderRadius: '6px',
};

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: true,
  fullscreenControl: true,
  streetViewControl: false,
};

interface MapWithMarkersProps {
  center: Omit<ILocation, 'place'>;
  locations: IPersonForMap[];
}

const MapWithClusterMarkers: FC<MapWithMarkersProps> = ({
  center,
  locations,
}) => {
  const { t, localeLanguage, defaultLocale } = useTranslation();
  const lang = localeLanguage === defaultLocale ? '' : `/${localeLanguage}`;

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    libraries: ['places'],
    version: 'weekly',
    language: 'en',
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
      mapRef.current.setZoom(6);
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
        const offset = 0.0001;
        const marker = new google.maps.Marker({
          position: {
            lat: p.location.lat + (Math.random() - 0.5) * offset,
            lng: p.location.lng + (Math.random() - 0.5) * offset,
          },
          map: mapRef.current,
          icon: '/leaflet/reshot-icon.svg',
          clickable: true,
          cursor: 'pointer',
          // animation: google.maps.Animation.DROP,
        });

        const contentString = `
<div class="flex gap-2 flex-col">
  <img src="${p.url || pictureBackup}" alt="${p.firstName} ${
          p.lastName
        }" class="max-w-60 max-h-full object-contain rounded-lg">
  <div class="text-black text-center">
    <p class="font-bold m-1">${p.firstName} ${p.lastName}</p>
       <p class="mb-1">${p.birthDate || 'n/a'} - ${p.deathDate || 'n/a'}
  </div>
  <a href="${lang}/dashboard/persons/${
          p?.id || ''
        }" class="cursor-pointer text-blue-500 text-center">
    <span class="hover:underline">${p?.slug || ''}</span>
  </a>
</div>`;

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
      if (mapRef.current) {
        mapRef.current.panTo({ lat: position.lat, lng: position.lng });
        mapRef.current.setZoom(13);
      }
    }
  };

  return isLoaded ? (
    <Flex gap="large" vertical>
      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="primary" onClick={() => panTo(center)}>
            {t.dashboard.map.button}
          </Button>
        </div>

        <Flex align="center">
          <Autocomplete
            onPlaceChanged={onPlaceChanged}
            onLoad={onLoadAutoComplete}
          >
            <Input
              placeholder={t.dashboard.map.search}
              allowClear
              title={inputValue}
              style={{
                width: '300px',
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
        // options={{ ...mapOptions, ...defaultMapOptions }}
        options={{ ...defaultMapOptions }}
      />
    </Flex>
  ) : (
    <></>
  );
};

export default MapWithClusterMarkers;
