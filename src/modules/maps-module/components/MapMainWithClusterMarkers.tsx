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
  width: '100%',
  borderRadius: '20px',
};

const defaultMapOptions = {
  terrain: 'road',
  disableDefaultUI: false,
  // fullscreenControl: false,
  streetViewControl: true,
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
<div class="flex gap-2 flex-col">
  <img src="${p.url}" alt="${p.firstName} ${
          p.lastName
        }" class="max-w-60 max-h-full object-contain rounded-md">
  <div class="text-black text-center">
    <p class="font-bold m-1">${p.firstName} ${p.lastName}</p>
    <p class="mb-1">${p.birthDate || 'n/a'} - ${p.deathDate || 'n/a'}</p>
  </div>
  <a href="/peoples/${
    p?.slug || ''
  }" class="cursor-pointer text-blue-500 text-center">
    <span class="hover:underline">${p?.slug || ''}</span>
  </a>
</div>`;

        marker.addListener('click', () => {
          infoWindow.close();
          infoWindow.setContent(contentString);
          infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
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
    <div className="flex flex-col">
      <div className="flex items-center  text-dark-100 gap-3 mb-5 text-xl leading-[64px] font-light">
        <Link href={routes.main} className="cursor-pointer">
          <AiFillHome className="text-dark-100" size={24} />
        </Link>
        /
        <span className="cursor-pointer flex gap-3 items-center justify-center">
          Інтэрактыўная_Мапа
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
              <BsSearch className="text-white" />
            </span>

            <input
              placeholder="ПОШУК"
              type="text"
              title={inputValue}
              className="border-8 border-transparent  mt-27 px-12 rounded-3xl bg-dark-300 text-white text-lg focus:outline-none focus:shadow-outline-gray"
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
          zoom={6}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            ...mapOptions,
            ...defaultMapOptions,
            ...{
              // disableDefaultUI: true,
              clickableIcons: true,
            },
          }}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MapMainWithClusterMarkers;