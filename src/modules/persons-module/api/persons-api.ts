import axios from 'axios';
import { authInstance } from '@/services';
import {
  FilterCondition,
  ICreatePerson,
  IGetPersonsResponse,
  IPaginationPersons,
  IPerson,
} from '@/types';

export const getPersons = (data: IPaginationPersons) => {
  return authInstance.get<IGetPersonsResponse>('persons', {
    params: {
      ...data,
      sortBy: data.sorting.field,
      sortDirection: data.sorting.order,
    },
  });
};

export const createPerson = (personData: ICreatePerson) => {
  return authInstance.post<IPerson>('persons', personData);
};

export const deletePerson = (id: number | null) => {
  return authInstance.delete(`persons/${id}`);
};

export const updatePersonStatus = (id: string | null, status: string) => {
  return authInstance.put(`persons/${id}/status`, { status });
};

export const updatePerson = (id: string, data: ICreatePerson) => {
  return authInstance.put(`persons/${id}`, { ...data });
};

export const getPerson = (id: string | undefined | string[]) => {
  return authInstance.get<IPerson>(`persons/${id}`);
};

interface GetPersonsPublicParams {
  pageSize?: number;
  pageNumber?: number;
  lang?: string;
  name?: string;
  lastName?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  deathDate?: string;
  filterConditionBirthDate?: string;
  filterConditionDeathDate?: string;
}

export const getPersonsPublic = (params: GetPersonsPublicParams) => {
  const {
    pageSize = 10,
    pageNumber = 1,
    lang = 'by',
    name = '',
    lastName = '',
    birthDate = null,
    country = '',
    city = '',
    deathDate = null,
    filterConditionBirthDate = FilterCondition.gte,
    filterConditionDeathDate = FilterCondition.lte,
  } = params;

  return axios.get<IGetPersonsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/persons/public/all`,
    {
      params: {
        pageSize,
        pageNumber,
        lang,
        name,
        lastName,
        birthDate,
        country,
        city,
        deathDate,
        filterConditionBirthDate,
        filterConditionDeathDate,
      },
    }
  );
};

export const getPersonPublic = (slug: string, lang = 'by') => {
  return axios.get<IPerson>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/persons/${slug}/public`,
    {
      params: {
        lang,
      },
    }
  );
};
