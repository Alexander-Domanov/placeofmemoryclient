import { FC } from 'react';
import { useRouter } from 'next/router';
import { routes } from '@/common/routing/routes';
import { IGetPersonsResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import { SITE_PERSONS_PER_PAGE } from '../constants/persons-constants';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import { PersonsSearchForm } from './PersonsSearchForm';
import { PersonsItemMain } from '@/modules/persons-module/components/PersonsItemMain';
import { useTranslation } from '@/components/internationalization';

interface Props {
  persons: IGetPersonsResponse;
}

export const PersonsMain: FC<Props> = ({ persons }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onPageChange = (page: number) => {
    if (page === 1) {
      router.push(routes.persons.index);
    } else {
      router.push(`${routes.persons.page(page)}`);
    }
  };
  const {
    title: titleT,
    archive: archiveT,
    people: peopleT,
    noData: noDataT,
  } = t.people.page;

  return (
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px] lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <BreadcrumbMain items={[{ text: titleT }]} />

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">
            {archiveT}
            <span className="text-dark-100 font-light ">{peopleT}</span>
          </h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <PersonsSearchForm />
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-6 gap-4 lg:grid-cols-4  sm:grid-cols-2">
            {persons?.items.map((person) => (
              <PersonsItemMain person={person} key={person.id} />
            ))}
          </div>

          {persons?.items.length === 0 ? (
            <div className="flex justify-center mt-10 text-2xl text-dark-100">
              {noDataT}
            </div>
          ) : (
            <div className="mt-20 md:mt-10">
              <AntPagination
                page={Number(router.query.page) || 1}
                pageSize={SITE_PERSONS_PER_PAGE}
                total={persons.totalCount}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
