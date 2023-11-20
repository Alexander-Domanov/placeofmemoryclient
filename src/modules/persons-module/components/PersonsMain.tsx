import { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { routes } from '@/common/routing/routes';
import { IGetPersonsResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { SITE_PERSONS_PER_PAGE } from '@/modules/persons-module/constants/persons-constants';

interface Props {
  persons: IGetPersonsResponse;
}

export const PersonsMain: FC<Props> = ({ persons }) => {
  const router = useRouter();

  const onPageChange = (page: number) => {
    if (page === 1) {
      router.push(routes.persons.index);
    } else {
      router.push(`${routes.persons.page(page)}`);
    }
  };

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[28px] pb-[60px] pl-[60px] pr-[60px] md:pl-[28px] md:pr-[28px]">
      <div className="container">
        <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
          <Link href={routes.main} className="cursor-pointer">
            <AiOutlineHome size={isMobile ? 16 : 22} />
          </Link>

          <div>/</div>

          <span className="text-accent-100">Архіў_Людзі</span>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">
            Архіў
            <span className="text-dark-100 font-light ">_Людзі</span>
          </h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <div className="grid grid-cols-6 gap-4 lg:grid-cols-4  sm:grid-cols-2">
            {persons?.items.map((person) => (
              <div key={person.id} className="hover:shadow-iconHover shadow-lg">
                <Link
                  href={routes.persons.person(person.slug)}
                  className="flex flex-col h-full"
                >
                  <div className="aspect-[170/210] relative flex-shrink-0">
                    <Image
                      src={person.photos[0]?.versions.huge.url}
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
            ))}
          </div>

          <div className="mt-10 md:mt-8">
            <AntPagination
              page={Number(router.query.page) || 1}
              pageSize={SITE_PERSONS_PER_PAGE}
              total={persons.totalCount}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
