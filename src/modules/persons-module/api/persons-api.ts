import { authInstance } from '@/services';
import {
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
