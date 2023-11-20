import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountSettingForm,
  AvatarBlock,
  editAccountData,
  ResponseError,
  useGetProfile,
} from '@/modules/account-modules/edit-profile-module';

import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useTranslation } from '@/components/internationalization';

export const EditProfile = () => {
  const { profileData } = useGetProfile();
  const client = useQueryClient();
  const { t } = useTranslation();
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
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="flex items-center justify-center mt-10">
          <span className="text-3xl font-semibold sm:text-xl">
            {t.account.page.title}
          </span>
        </div>

        <div className="items-center justify-center mt-10 flex flex-col">
          <AvatarBlock />
        </div>

        <div className="flex items-center justify-center mt-10">
          <AccountSettingForm
            isEditProfileLoading={isEditProfileLoading}
            profileData={profileData}
            settingFormSubmit={settingFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};
