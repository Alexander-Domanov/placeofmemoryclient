import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Flex } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { ILocation, IPerson } from '@/types';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { mapOptions } from '@/modules/maps/components/options/MapOptions';

const containerStyle = {
  // height: '100%',
  aspectRatio: '16/9',
  width: '100%',
  borderRadius: '8px',
};

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
  streetViewControl: false,
  backgroundColor: 'rgb(250, 250, 250)',
};

interface MapMainWithMarkersProps {
  center: Omit<ILocation, 'place'>;
  locations: IPerson[];
  markerIcon?: boolean;
}

const MapMainWithMarkersComponent: FC<MapMainWithMarkersProps> = ({
  center,
  locations,
  markerIcon = false,
}) => {
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
        const marker = new google.maps.Marker({
          position: {
            lat: p.location.lat,
            lng: p.location.lng,
          },
          map: mapRef.current,
          icon: '/leaflet/reshot-icon.svg',
          clickable: true,
          cursor: 'pointer',
        });

        // const contentString = `
        //   <div class="flex gap-2 flex-col">
        //     <div class="text-black text-center">
        //       <p class="font-bold m-1">
        //         ${p.location.lat}, ${p.location.lng}
        //       </p>
        //     </div>
        //   </div>`;

        const contentString = `
         <div class="flex gap-2 flex-col">
          <img src="${url}" alt="${p.firstName} ${
          p.lastName
        }" class="max-w-60 max-h-full object-contain rounded-lg">
            <div class="text-black text-center">
             <p class="font-bold m-1">${p.firstName} ${p.lastName}</p>
             <p class="mb-1">${p.birthDate || 'n/a'} - ${
          p.deathDate || 'n/a'
        }</p>
            </div>
          <a href="/persons/${
            p?.slug || ''
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

  const icon =
    locations && locations.length > 0
      ? '/leaflet/reshot-icon-place.svg'
      : '/leaflet/reshot-icon.svg';

  return isLoaded ? (
    <Flex gap="large" vertical>
      {/* <Button onClick={() => panTo(center)}>Pan to Current Location</Button> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
          ...defaultMapOptions,
          ...{ clickableIcons: true },
        }}
      >
        {markerIcon && (
          <MarkerF
            key="center"
            position={{ lat: center.lat, lng: center.lng }}
            options={{ icon, zIndex: 1000 }}
          />
        )}
      </GoogleMap>
    </Flex>
  ) : (
    <></>
  );
};

export default MapMainWithMarkersComponent;
