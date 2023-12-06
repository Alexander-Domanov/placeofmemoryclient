import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  AccountSettingForm,
  AvatarBlock,
  editAccountData,
  ResponseError,
  useGetProfile,
} from '@/modules/account-modules/edit-profile-module';

import { ErrorNotification } from '@/common-dashboard/errorNotification';
import { useTranslation } from '@/components/internationalization';
import { useMeQuery } from '@/services';
import { StatusUser } from '@/types';
import { ModalInfo } from '@/components';

export const EditProfile = () => {
  const { profileData } = useGetProfile();
  const client = useQueryClient();
  const { t } = useTranslation();

  const { data: me } = useMeQuery();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [me?.status]);

  const closeModal = () => {
    setShowModal(false);
  };

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
        {showModal ? (
          <ModalInfo
            onClose={closeModal}
            title={t.dashboard.modalInfo.title}
            message={t.dashboard.modalInfo.description.paragraphs}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
