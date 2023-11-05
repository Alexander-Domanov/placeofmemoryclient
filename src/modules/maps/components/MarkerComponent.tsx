import { FC } from 'react';
import { Marker } from '@react-google-maps/api';
import { IPerson } from '@/types';

const MarkerComponent: FC<{ locations: IPerson[] }> = ({ locations }) => {
  return (
    <>
      {locations?.map((item) => (
        <Marker
          key={item.id}
          position={{
            lat: item.location.lat || 0,
            lng: item.location.lng || 0,
          }}
          // icon={item.photos[0].versions.large.url}
        />
      ))}
    </>
  );
};

export default MarkerComponent;
