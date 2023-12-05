import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Button, Input } from '@/ui';
import { Spinner } from '@/ui/spinner/Spinner';
import { settingsSchema } from '@/modules/account-modules/edit-profile-module';
import { useTranslation } from '@/components/internationalization';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';
import { useMeQuery } from '@/services';
import { StatusUser } from '@/types';

interface IProfileData {
  userName?: string;
  city?: string;
}

interface IAccountSettingForm {
  profileData: IProfileData;
  settingFormSubmit: (data: IProfileData) => void;
  isEditProfileLoading: boolean;
}
export const AccountSettingForm = ({
  profileData,
  settingFormSubmit,
  isEditProfileLoading,
}: IAccountSettingForm) => {
  const { data: me } = useMeQuery();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      userName: profileData.userName,
      city: profileData.city || '',
    },
    resolver: yupResolver(settingsSchema()),
    mode: 'onChange',
  });
  const { t } = useTranslation();
  useEffect(() => {
    setValue('userName', profileData.userName);
    setValue('city', profileData.city);
  }, [profileData]);

  useChangingLanguageError({ trigger, errors });
  return (
    <form
      className="align-middle sm:w-[330px] w-[420px] gap-3 flex flex-col"
      onSubmit={handleSubmit(settingFormSubmit)}
    >
      <Input
        type="text"
        id="userName"
        label={t.account.page.name}
        {...register('userName')}
        error={errors?.userName?.message}
        disabled={isDisabled}
      />

      <Input
        type="text"
        id="city"
        label={t.account.page.city}
        {...register('city')}
        error={errors?.city?.message}
        disabled={isDisabled}
      />

      <Button
        type="submit"
        variant="default"
        disabled={isEditProfileLoading || isDisabled}
        className="xsm:ml-0 ml-auto mt-[30px] text-[16px]"
      >
        {isEditProfileLoading ? <Spinner /> : t.account.page.buttonSave}
      </Button>
    </form>
  );
};
