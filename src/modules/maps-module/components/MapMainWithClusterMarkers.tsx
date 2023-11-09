import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { ILocation } from '@/types';
import { IPersonForMap } from '@/types/persons/person-for-map.type';
import { mapOptions } from '@/modules/maps/components/options/MapOptions';
import { routes } from '@/common/routing/routes';

const containerStyle = {
  height: '60vh',
  width: '90%',
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
    <div className="flex flex-col">
      <div className="flex items-center  text-dark-100 gap-3 mb-5 text-xl leading-[64px] font-light">
        <Link href={routes.main} className="cursor-pointer">
          <AiFillHome size={24} />
        </Link>
        /
        <span className="cursor-pointer flex gap-3 items-center justify-center">
          <span>Мапа</span>
        </span>
      </div>

      <div className="flex items-center justify-start">
        <h2 className="text-6xl text-light-100 leading-[60px]">
          Інтэрактыўная Мапа
        </h2>
      </div>

      <hr className="w-full mt-[28px] mb-8 transform rotate-180" />

      <div className="ml-auto mb-8 flex items-center">
        <Autocomplete
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoadAutoComplete}
        >
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BsSearch className="text-gray-600" />
            </span>

            <input
              placeholder="ПОШУК ПА ГОРАДУ"
              type="text"
              title={inputValue}
              className="border-2 border-transparent w-400 h-55 mt-27 px-12 rounded-3xl bg-custom-color text-gray-600 focus:outline-none focus:shadow-outline-gray"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </Autocomplete>
      </div>

      <div className="flex items-center justify-center">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedCenter}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            ...mapOptions,
            ...defaultMapOptions,
          }}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MapMainWithClusterMarkers;
