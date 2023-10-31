import { useQuery } from '@tanstack/react-query';
import { noRefetch } from '@/common/helpers/noRefetch';
import { getPerson } from '@/modules/persons-module/api/persons-api';

export const usePerson = (id: string | undefined | string[]) => {
  const {
    data: person,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['person', { id }],
    queryFn: () => getPerson(id),
    enabled: !!id,
    select: (response) => response.data,
    ...noRefetch,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return { person, isLoading, isSuccess };
};
