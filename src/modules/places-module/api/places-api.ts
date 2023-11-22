import { authInstance } from '@/services';
import {
  ICreatePlace,
  IGetPlacesResponse,
  IGetTitlePlacesResponse,
  IPaginationPlaces,
  IPlace,
} from '@/types';

export const getPlaces = (data: IPaginationPlaces) => {
  return authInstance.get<IGetPlacesResponse>('places', {
    params: {
      ...data,
      sortBy: data.sorting.field,
      sortDirection: data.sorting.order,
    },
  });
};

export const getTitlePlaces = (data: {
  pageNumber: number;
  pageSize: number;
  name?: string;
  city?: string;
  country?: string;
}) => {
  return authInstance.get<IGetTitlePlacesResponse>('places/country/titles', {
    params: {
      ...data,
    },
  });
};

export const createPlace = (placeData: ICreatePlace) => {
  return authInstance.post<IPlace>('places', placeData);
};

export const deletePlace = (id: number | null) => {
  return authInstance.delete(`places/${id}`);
};

export const updatePlaceStatus = (id: string | null, status: string) => {
  return authInstance.put(`places/${id}/status`, { status });
};

export const updatePlace = (id: string, data: ICreatePlace) => {
  return authInstance.put(`places/${id}`, { ...data });
};

export const getPlace = (id: string) => {
  return authInstance.get<IPlace>(`places/${id}`);
};
