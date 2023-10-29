import { authInstance } from '@/services';
import { ICreatePerson, IGetPersonsResponse, IPerson } from '@/types';

export const getPersons = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  return authInstance.get<IGetPersonsResponse>('persons', {
    params: {
      pageNumber: page,
      pageSize,
      status,
      name,
      sortBy: sorting.field,
      sortDirection: sorting.order,
    },
  });
};

export const createPerson = (personData: ICreatePerson) => {
  return authInstance.post<IPerson>('persons', personData);
};

export const deletePerson = (id: number | null) => {
  return authInstance.delete(`persons/${id}`);
};

export const updatePersonStatus = (id: number | null, status: string) => {
  return authInstance.put(`persons/${id}/status`, { status });
};

export const updatePerson = (
  id: string | string[] | undefined,
  data: ICreatePerson
) => {
  return authInstance.put(`persons/${id}`, { ...data });
};

export const getPerson = (id: string | undefined | string[]) => {
  return authInstance.get<IPerson>(`persons/${id}`);
};
