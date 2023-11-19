import { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { routes } from '@/common/routing/routes';
import { IGetPersonsResponse } from '@/types';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/articles-constants';

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

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
          <Link href={routes.main} className="cursor-pointer">
            <AiOutlineHome size={22} />
          </Link>

          <div>/</div>

          <span className="text-accent-100">Артыкулы</span>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4">
          <h2 className="text-light-300 text-5xl sm:text-3xl">Артыкулы</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <div className="grid grid-cols-5 gap-x-8 gap-y-6">
            {persons?.items.map((person) => (
              <div key={person.id}>
                <Link
                  href={routes.persons.person(person.slug)}
                  className="flex flex-col h-full"
                >
                  <div className="aspect-[170/210] relative flex-shrink-0">
                    <Image
                      src={person.photos[0]?.versions.huge.url}
                      fill
                      alt={`${person.firstName} ${person.lastName}`}
                      className="object-cover"
                    />
                  </div>

                  <div className="bg-dark-300 flex-grow text-center text-sm font-bold p-2">
                    {person.firstName} {person.lastName}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Pagination
              pageSize={SITE_ARTICLES_PER_PAGE}
              current={Number(router.query.page) || 1}
              total={persons.totalCount}
              showSizeChanger={false}
              onChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
