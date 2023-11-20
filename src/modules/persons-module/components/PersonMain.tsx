import { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import Image from 'next/image';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { routes } from '@/common/routing/routes';
import { IPerson } from '@/types';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';

interface Props {
  person: IPerson;
}

export const PersonMain: FC<Props> = ({ person }) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="overflow-hidden">
          <div className="whitespace-nowrap scrollbar scrollbar-none overflow-auto flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
            <Link href={routes.main} className="cursor-pointer">
              <AiOutlineHome size={isMobile ? 16 : 22} />
            </Link>

            <div>/</div>

            <Link href={routes.persons.index}>
              <span>Артыкулы</span>
            </Link>

            <div>/</div>

            <span className="text-accent-100">{`${person.firstName} ${person.lastName}`}</span>
          </div>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">
            Архіў
            <span className="text-dark-100 font-light">_Асоба</span>
          </h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <div className="grid grid-cols-[400px_1fr] gap-20">
            <div>
              <div className="text-4xl font-bold">
                {person.firstName} {person.lastName}
              </div>

              <div className="mt-2 text-dark-100 text-xl">
                {person.birthDate
                  ? convertDateToFormat(person.birthDate, 'DD.MM.YYYY')
                  : 'Няма дадзеных'}
                &nbsp;-&nbsp;
                {person.deathDate
                  ? convertDateToFormat(person.deathDate, 'DD.MM.YYYY')
                  : 'Няма дадзеных'}
              </div>

              <div className="mt-10">
                <Image
                  src={person.photos[0]?.versions.huge.url}
                  alt={`${person.firstName} ${person.lastName}`}
                  width={person.photos[0]?.versions.huge.width}
                  height={person.photos[0]?.versions.huge.height}
                  loading="eager"
                  className="object-cover rounded-lg shadow-icon"
                />
              </div>

              <Link
                href={routes.persons.index}
                className="mt-16 inline-flex text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"
              >
                <BsArrowLeftCircleFill className="text-dark-300" />
                <span className="sr-only">Previous</span>
              </Link>
            </div>

            <div>
              <div className="text-3xl text-dark-100">Месца нараджэння</div>
              <div className="mt-4">
                {person.country}, {person.city}
              </div>

              <div className="mt-8 text-3xl text-dark-100">Біяграфія</div>
              <div
                className="mt-4 wysiwyg"
                dangerouslySetInnerHTML={{ __html: person.biography }}
              />

              <div className="mt-8 text-3xl text-dark-100">На мапе</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
