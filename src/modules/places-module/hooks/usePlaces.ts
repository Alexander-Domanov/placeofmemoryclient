import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPlaces } from '@/modules/places-module/api/places-api';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

interface IError {
  messages: {
    message: string;
    field: string;
  }[];
  error: string;
  statusCode: number;
}
export const usePlaces = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const {
    data: places,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['places', { page, pageSize, status, name, sorting }],
    queryFn: () => getPlaces(page, pageSize, status, name, sorting),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    retry: 0,
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { places, isLoading };
};
