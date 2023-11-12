import { useQuery } from '@tanstack/react-query';
import {
  getAccountData,
  RootProfile,
} from '@/modules/account-modules/edit-profile-module';

export const useGetProfileData = () => {
  return useQuery({
    queryKey: ['get-profile-page'],
    queryFn: getAccountData,
    staleTime: 0,
    cacheTime: 0,
    select: (data: any): RootProfile => data?.data,
  });
};
