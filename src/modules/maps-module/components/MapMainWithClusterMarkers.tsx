import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Flex, Input } from 'antd';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { BsSearch } from 'react-icons/bs';
import { ILocation } from '@/types';
import { IPersonForMap } from '@/types/persons/person-for-map.type';
import { mapOptions } from '@/modules/maps/components/options/MapOptions';

const containerStyle = {
  height: '60vh',
  width: '100%',
  borderRadius: '20px',
};

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: false,
  fullscreenControl: true,
  streetViewControl: true,
  // fullscreenControlOptions: {
  //   position: google.maps.ControlPosition.RIGHT_BOTTOM,
  // },
  backgroundColor: 'rgb(250, 250, 250)',
};

interface MapWithMarkersProps {
  center: Omit<ILocation, 'place'>;
  locations: IPersonForMap[];
}

const MapMainWithClusterMarkers: FC<MapWithMarkersProps> = ({
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
      <div>
        <Autocomplete
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoadAutoComplete}
        >
          <Input
            placeholder="  ПОШУК ПА ГОРАДУ"
            allowClear
            type="text"
            title={inputValue}
            prefix={<BsSearch />}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `340px`,
              height: `38px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `60px`,
              backgroundColor: '#565656',
              borderColor: 'rgb(69, 69, 69)',
              boxShadow: `0 2px 6px rgba(64, 64, 64, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
          ...defaultMapOptions,
        }}
      />
    </Flex>
  ) : (
    <></>
  );
};

export default MapMainWithClusterMarkers;
