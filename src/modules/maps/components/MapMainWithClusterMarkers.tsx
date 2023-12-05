import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { BsSearch } from 'react-icons/bs';
import { ILocation } from '@/types';
import { IPersonForMap } from '@/types/persons/person-for-map.type';
import { mapOptions } from '@/modules/maps/components/options/MapOptions';
import { useTranslation } from '@/components/internationalization';

const containerStyle = {
  height: '70vh',
  // aspectRatio: '16/9',
  width: '100%',
  borderRadius: '10px',
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

        const na = t.people.person.page.notData;

        const contentString = `
         <div class="flex gap-2 flex-col">
          <img src="${p.url}" alt="${p.firstName} ${
          p.lastName
        }" class="max-w-60 max-h-full object-contain rounded-lg">
            <div class="text-black text-center">
             <p class="font-bold m-1">${p.firstName} ${p.lastName}</p>
             <p class="mb-1">${p.birthDate || na} - ${p.deathDate || na}</p>
            </div>
          <a href="${lang}/persons/person/${
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
        lat: place?.geometry?.location?.lat() || 0,
        lng: place?.geometry?.location?.lng() || 0,
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
    <div className="w-full">
      <div className="flex justify-end md:justify-center md:flex-wrap">
        <Autocomplete
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoadAutoComplete}
        >
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <BsSearch />
            </span>

            <input
              placeholder={t.map.page.search}
              type="text"
              title={inputValue}
              className="w-80 h-10 flex-shrink-0 rounded-full bg-dark-300 shadow-md hover:shadow-icon px-12 sm:w-60 sm:h-8 sm:px-10 outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </Autocomplete>
      </div>

      <div className="flex items-center justify-center mt-10">
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
    <div className="flex justify-center mt-10 text-2xl text-dark-100">
      {t.map.page.loading}
    </div>
  );
};

export default MapMainWithClusterMarkers;
