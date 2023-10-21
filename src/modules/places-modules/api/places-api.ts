import { authInstance } from '@/services';
import { IGetPlacesResponse } from '@/types/places/get-places-response.type';
import { IPlace } from '@/types';

export const getPlaces = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  return authInstance.get<IGetPlacesResponse>('places', {
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

export const deletePlace = (id: number | null) => {
  return authInstance.delete(`places/${id}`);
};

export const updatePlaceStatus = (id: number | null, status: string) => {
  return authInstance.put(`places/${id}/status`, { status });
};

export const getPlace = (id: string | undefined | string[]) => {
  return authInstance.get<IPlace>(`places/${id}`);
};
