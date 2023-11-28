import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { noRefetch } from '@/common/helpers/noRefetch';
import { IGetPersonsResponse } from '@/types';
import { getPersonsPublicMain } from '@/modules/persons-module/api/persons-api';

interface IProps {
  persons: IGetPersonsResponse;
}

interface IPersonsProps {
  pageSize?: number;
  pageNumber?: number;
  lang?: string;
  name?: string;
  lastName?: string;
  birthYear?: string;
  country?: string;
  city?: string;
  deathYear?: string;
  filterConditionBirthDate?: string;
  filterConditionDeathDate?: string;
}

export const useGetPersonsMain = ({
  name,
  lastName,
  country,
  city,
  deathYear,
  birthYear,
  filterConditionBirthDate,
  filterConditionDeathDate,
  persons,
  pageNumber,
}: IPersonsProps & IProps) => {
  const { locale } = useRouter();
  const {
    data: dataPersons,
    isSuccess: isSuccessPersons,
    isError: isErrorPersons,
    isFetching: isFetchingPersons,
    isLoading,
  } = useQuery(
    [
      'persons-main',
      pageNumber,
      name,
      lastName,
      country,
      city,
      deathYear,
      birthYear,
      filterConditionBirthDate,
      filterConditionDeathDate,
    ],
    () =>
      getPersonsPublicMain({
        name,
        country,
        city,
        lang: locale,
        pageNumber,
        lastName,
        deathYear,
        birthYear,
        filterConditionBirthDate,
        filterConditionDeathDate,
      }),
    {
      ...noRefetch,
      initialData: persons,
      cacheTime: 0,
      staleTime: 0,
    }
  );
  return {
    dataPersons,
    isErrorPersons,
    isSuccessPersons,
    isFetchingPersons,
    isLoading,
  };
};
