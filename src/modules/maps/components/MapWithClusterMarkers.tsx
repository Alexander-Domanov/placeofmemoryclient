import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Button, Flex } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { ILocation } from '@/types';
import { IPersonForMap } from '@/types/persons/person-for-map.type';
import { mapOptions } from '@/modules/maps/components/options/MapOptions';

const containerStyle = {
  height: '700px',
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
      const infoWindow = new google.maps.InfoWindow();

      const markers = selectedLocations.map((p) => {
        const marker = new google.maps.Marker({
          position: {
            lat: p.location.lat,
            lng: p.location.lng,
          },
          map: mapRef.current,
          icon: '/google/people35.png',
        });

        marker.addListener('click', () => {
          infoWindow.close();
          infoWindow.setContent(
            `${p.firstName} ${p.lastName}:  ${p.birthDate || 'n/a'} - ${
              p.deathDate || 'n/a'
            }`
          );
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
      <Button onClick={() => panTo(center)}>Pan to Current Location</Button>

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
