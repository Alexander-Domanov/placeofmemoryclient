import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Button, Flex } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { ILocation, IPerson } from '@/types';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { useTranslation } from '@/components/internationalization';

const containerStyle = {
  height: '50vh',
  width: '100%',
  borderRadius: '10px',
};

interface MapWithMarkersProps {
  center: Omit<ILocation, 'place'>;
  locations: IPerson[];
}

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: true,
  fullscreenControl: true,
  streetViewControl: false,
};

const MapWithMarkersComponent: FC<MapWithMarkersProps> = ({
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
  const [selectedLocations, setSelectedLocations] = useState<IPerson[]>([]);

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
      mapRef.current.setZoom(15);
    }
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (map && selectedLocations.length > 0) {
      const infoWindow = new google.maps.InfoWindow();

      const markers = selectedLocations.map((p) => {
        const url =
          p.photos && p.photos.length > 0
            ? p.photos[0].versions.medium.url
            : pictureBackup;
        const offset = 0.0001;
        const marker = new google.maps.Marker({
          position: {
            lat: p.location.lat + (Math.random() - 0.5) * offset,
            lng: p.location.lng + (Math.random() - 0.5) * offset,
          },
          map: mapRef.current,
          icon: '/leaflet/reshot-icon.svg',
        });

        const contentString = `
<div class="flex gap-2 flex-col">
  <img src="${url}" alt="${p.firstName} ${
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
  <div class="text-black text-center">
              <p class="font-bold m-1">
                ${p.location.lat}, ${p.location.lng}
              </p>
            </div>
</div>`;

        marker.addListener('click', () => {
          infoWindow.close();
          infoWindow.setContent(contentString);
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

  return isLoaded ? (
    <Flex gap="large" vertical>
      <Button onClick={() => panTo(center)}>
        {t.dashboard.locationInfo.buttons.panTo}
      </Button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultMapOptions}
      >
        <MarkerF
          key="center"
          position={{
            lat: center.lat + (Math.random() - 0.5) * 0.0001,
            lng: center.lng + (Math.random() - 0.5) * 0.0001,
          }}
          options={{ icon: '/leaflet/reshot-icon-place.svg', zIndex: 1000 }}
        />
      </GoogleMap>
    </Flex>
  ) : (
    <></>
  );
};

export default MapWithMarkersComponent;
