import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPersons } from '@/modules/persons-module/api/persons-api';

export const usePersons = (
  page: number,
  pageSize: number,
  status: string,
  name: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  const {
    data: persons,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['persons', { page, pageSize, status, name, sorting }],
    queryFn: () => getPersons(page, pageSize, status, name, sorting),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
  });

  return { persons, isLoading, refetch };
};
