import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useDebounce } from 'usehooks-ts';
import { routes } from '@/common/routing/routes';
import { FilterCondition, IGetPersonsResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import { PersonsItemMain } from '@/modules/persons-module/components/PersonsItemMain';
import { useTranslation } from '@/components/internationalization';
import { Input } from '@/ui';
import { useGetPersonsMain } from '@/modules/persons-module/hooks/useGetPersonsMain';

interface Props {
  persons: IGetPersonsResponse;
}

export const PersonsMain: FC<Props> = ({ persons }) => {
  const { push, query } = useRouter();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [filterConditionBirthDate, setFilterConditionBirthDate] =
    useState<FilterCondition>(FilterCondition.gte);
  const [filterConditionDeathDate, setFilterConditionDeathDate] =
    useState<FilterCondition>(FilterCondition.lte);
  const nameD = useDebounce(name, 1500);
  const lastNameD = useDebounce(lastName, 1500);
  const birthDateD = useDebounce(birthDate, 2000);
  const deathDateD = useDebounce(deathDate, 2000);
  const countryD = useDebounce(country, 2000);
  const cityD = useDebounce(city, 1500);

  const currentYear = new Date().getFullYear();

  const pageParams = query.page as string;

  const { dataPersons, isLoading } = useGetPersonsMain({
    pageNumber: Number(pageParams),
    ...(name && { name: nameD }),
    ...(lastName && { lastName: lastNameD }),
    ...(birthDate && { birthDate: birthDateD }),
    ...(country && { country: countryD }),
    ...(city && { city: cityD }),
    ...(deathDate && { deathDate: deathDateD }),
    ...(filterConditionBirthDate && { filterConditionBirthDate }),
    ...(filterConditionDeathDate && { filterConditionDeathDate }),
    persons,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const onPageChange = (newPage: number) => {
    if (dataPersons && newPage >= 1 && newPage <= dataPersons.pagesCount) {
      push(routes.persons.page(Number(newPage)));
    }
  };
  const {
    title: titleT,
    archive: archiveT,
    people: peopleT,
    noData: noDataT,
  } = t.people.page;

  const {
    name: nameT,
    lastName: lastNameT,
    country: countryT,
    city: cityT,
    birthDate: birthDateT,
    deathDate: deathDateT,
    search: searchT,
    gte: gteT,
    lte: lteT,
    clear: clearT,
    error: errorT,
  } = t.people.search.page;

  const validateBirthDate = (birthDate: string) => {
    const isValid =
      yup.number().min(0).max(currentYear).isValidSync(+birthDate) &&
      (!birthDate || birthDate.length === 4);

    return isValid ? null : { errorT };
  };
  const validateDeathDate = (deathDate: string) => {
    const isValid =
      yup.number().min(0).max(currentYear).isValidSync(+deathDate) &&
      (!deathDate || deathDate.length === 4);

    return isValid ? null : { errorT };
  };

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
          <div className="grid grid-cols-[190px_190px_300px] gap-3 lg:grid-cols-[1fr_1fr_300px] sm:grid-cols-2 sm:gap-3 justify-end">
            <div className="sm:order-1">
              <Input
                type="text"
                id="name"
                value={name}
                label={nameT}
                showErrorMessage={false}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="sm:order-2">
              <Input
                type="text"
                id="lastName"
                value={lastName}
                label={lastNameT}
                showErrorMessage={false}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="sm:order-5 grid grid-cols-[130px_1fr] gap-1 sm:grid-cols-[1fr_2fr] sm:col-span-2">
              <select
                id="filterConditionBirthDate"
                className="block focus:outline-none rounded-md bg-dark-700 text-dark-150 focus:outline-0 px-3 py-2 text-xs border-dark-300 border-[1px]"
                value={filterConditionBirthDate}
                onChange={(e) => {
                  setFilterConditionBirthDate(
                    e.target.value as FilterCondition
                  );
                }}
              >
                <option value={FilterCondition.gte}>{gteT}</option>
                <option value={FilterCondition.lte}>{lteT}</option>
              </select>

              <Input
                type="text"
                id="birthDate"
                value={birthDate}
                maxLength={4}
                className="flex-grow"
                error={validateBirthDate(birthDate)}
                label={birthDateT}
                showErrorMessage={false}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="sm:order-3">
              <Input
                type="text"
                id="country"
                value={country}
                label={countryT}
                showErrorMessage={false}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="sm:order-4">
              <Input
                type="text"
                id="city"
                value={city}
                label={cityT}
                showErrorMessage={false}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="sm:order-6 grid grid-cols-[130px_1fr] gap-1 sm:grid-cols-[1fr_2fr] sm:col-span-2">
              <select
                id="filterConditionDeathDate"
                className="block focus:outline-none rounded-md bg-dark-700 text-dark-150 focus:outline-0 px-3 py-2 text-xs border-dark-300 border-[1px]"
                value={filterConditionDeathDate}
                onChange={(e) =>
                  setFilterConditionDeathDate(e.target.value as FilterCondition)
                }
              >
                <option value={FilterCondition.gte}>{gteT}</option>
                <option value={FilterCondition.lte}>{lteT}</option>
              </select>

              <Input
                type="text"
                id="deathDate"
                maxLength={4}
                error={validateDeathDate(deathDate)}
                value={deathDate}
                label={deathDateT}
                showErrorMessage={false}
                onChange={(e) => setDeathDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div style={{ minHeight: loading ? '200px' : '0' }}>
            {loading && (
              <div className="flex justify-center mt-10 text-2xl text-dark-100">
                Loading...
              </div>
            )}
          </div>

          {!loading && (
            <div className="grid grid-cols-6 gap-4 lg:grid-cols-4 sm:grid-cols-2">
              {dataPersons?.items.map((person) => (
                <PersonsItemMain person={person} key={person.id} />
              ))}
            </div>
          )}

          {dataPersons?.items.length === 0 ? (
            <div className="flex justify-center mt-10 text-2xl text-dark-100">
              {noDataT}
            </div>
          ) : (
            <div className="mt-20 md:mt-10">
              <AntPagination
                page={Number(pageParams) || 1}
                pageSize={dataPersons.pageSize}
                total={dataPersons.totalCount}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
