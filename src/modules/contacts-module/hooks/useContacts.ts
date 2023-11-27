import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { noRefetch } from '@/common/helpers/noRefetch';
import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { useMeQuery } from '@/services';

export const useContacts = () => {
  const { data: me } = useMeQuery();
  const {
    data: contacts,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['contacts', { lang: me?.lang }],
    queryFn: () => getContacts(me?.lang),
    select: (response) => response.data,
    keepPreviousData: true,
    ...noRefetch,
    cacheTime: 0,
    staleTime: 0,
    retry: 0,
    // enabled: !!me,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);

  return { contacts, isFetching, isLoading };
};
