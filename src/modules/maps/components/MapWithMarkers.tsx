import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Button, Flex } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { ILocation, IPerson } from '@/types';

const containerStyle = {
  height: '500px',
  width: '100%',
  borderRadius: '10px',
  // position: 'absolute',
  // overflow: 'none',
};

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: true,
  fullscreenControl: false,
  streetViewControl: false,
};

interface MapWithMarkersProps {
  center: Omit<ILocation, 'place'>;
  locations: IPerson[];
}

const MapWithMarkersComponent: FC<MapWithMarkersProps> = ({
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
  const [selectedLocations, setSelectedLocations] = useState<IPerson[]>([]);

  const [activeMarker, setActiveMarker] = useState<IPerson | null>(null);

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

      const markers = selectedLocations.map((location) => {
        const marker = new google.maps.Marker({
          position: {
            lat: location.location.lat,
            lng: location.location.lng,
          },
          map: mapRef.current,
        });

        marker.addListener('click', () => {
          infoWindow.close();
          infoWindow.setContent(location.id.toString());
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
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // options={mapOptions}
      />
    </Flex>
  ) : (
    <></>
  );
};

export default MapWithMarkersComponent;
