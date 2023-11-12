import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountSettingForm,
  AvatarBlock,
  editAccountData,
  ResponseError,
  useGetProfile,
} from '@/modules/account-modules/edit-profile-module';

import { ErrorNotification } from '@/common-dashboard/errorNotification';

export const EditProfile = () => {
  const { profileData, isLoading: isProfileLoading } = useGetProfile();
  const client = useQueryClient();

  const { mutate: editeProfile, isLoading: isEditProfileLoading } = useMutation(
    {
      mutationFn: editAccountData,
      onSuccess: async () => {
        await client.invalidateQueries(['get-profile-page']);
      },
      onError: async (error: ResponseError) => {
        ErrorNotification(error);

        await client.invalidateQueries(['get-profile-page']);
      },
    }
  );

  const settingFormSubmit = (data: any) => {
    editeProfile(data);
  };

  return (
    <section className="flex flex-col gap-4 items-center">
      <span className="text-3xl font-semibold sm:text-xl">
        Рэдактаваць акаўнт
      </span>
      <AvatarBlock />
      <AccountSettingForm
        isEditProfileLoading={isEditProfileLoading}
        profileData={profileData}
        settingFormSubmit={settingFormSubmit}
      />
    </section>
  );
};
