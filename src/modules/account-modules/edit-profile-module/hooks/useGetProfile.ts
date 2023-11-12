import { useEffect } from 'react';
import { useGetProfileData } from '@/modules/account-modules/edit-profile-module';
import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const useGetProfile = () => {
  const {
    data: profileData,
    isFetching: isFetchingProfileData,
    isLoading,
    error,
  } = useGetProfileData();

  const initialProfileData = {
    userName: profileData?.userName || '',
    city: profileData?.city || '',
  };

  useEffect(() => {
    if (error) {
      ErrorNotification(error);
    }
  }, [error]);
  return {
    profileData: initialProfileData,
    isFetchingProfileData,
    isLoading,
  };
};
