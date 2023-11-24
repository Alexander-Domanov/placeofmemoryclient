import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IPerson } from '@/types';
import { routes } from '@/common/routing/routes';

interface Props {
  person: IPerson;
}

export const PersonsItemMain: FC<Props> = ({ person }) => {
  return (
    <div
      key={person.id}
      className="hover:shadow-iconHover shadow-lg transition-all duration-300"
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
        </div>

        <div className="bg-dark-300 flex-grow text-center text-xs font-bold p-2 rounded-b-sm">
          {person.firstName} {person.lastName}
        </div>
      </Link>
    </div>
  );
};
