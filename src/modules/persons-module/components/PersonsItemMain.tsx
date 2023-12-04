import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IPerson } from '@/types';
import { routes } from '@/common/routing/routes';
import { useWindowSize } from '@/common/hooks/useWindowResize';

interface Props {
  person: IPerson;
}

// const CityTooltip: FC<{ city: string; country: string }> = ({
//   city,
//   country,
// }) => (
//   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 rounded-sm">
//     <div className="text-xs font-bold break-after-all text-center">
//       {country} ({city})
//     </div>
//   </div>
// );

const CityMobileTooltip: FC<{ city: string; country: string }> = ({
  city,
  country,
}) => (
  <div className="absolute top-0 left-0 flex items-center justify-center right-0 bg-black bg-opacity-30 transition-all duration-300 text-light-300 p-1 rounded-t-sm">
    <div className="text-xs font-bold break-after-all text-center">
      {country} ({city})
    </div>
  </div>
);

export const PersonsItemMain: FC<Props> = ({ person }) => {
  const [isHovered, setHovered] = useState(false);

  const { width } = useWindowSize();
  const isTable = width && width < 767;

  return (
    <div
      key={person.id}
      className="hover:shadow-iconHover shadow-lg transition-all duration-300"
      onMouseEnter={() => !isTable && setHovered(true)}
      onMouseLeave={() => !isTable && setHovered(false)}
    >
      <Link
        href={routes.persons.person(person.slug)}
        className="flex flex-col h-full"
      >
        <div className="aspect-[170/210] relative flex-shrink-0">
          <Image
            src={person.photos[0]?.versions.medium.url}
            fill
            alt={`${person.firstName} ${person.lastName}`}
            className="object-cover rounded-t-sm"
          />
          {!isTable && isHovered && (
            <CityMobileTooltip city={person.city} country={person.country} />
          )}

          {isTable && (
            <CityMobileTooltip city={person.city} country={person.country} />
          )}
        </div>

        <div className="bg-dark-300 flex-grow text-center text-xs font-bold p-2 rounded-b-sm">
          {person.firstName} {person.lastName}
        </div>
      </Link>
    </div>
  );
};
