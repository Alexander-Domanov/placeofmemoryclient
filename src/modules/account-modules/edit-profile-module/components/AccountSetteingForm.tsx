import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Button, Input } from '@/ui';
import { Spinner } from '@/ui/spinner/Spinner';
import { settingsSchema } from '@/modules/account-modules/edit-profile-module';
import { useTranslation } from '@/components/internationalization';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';

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
        label={t.account.page.name}
        {...register('userName')}
        error={errors?.userName?.message}
      />

      <Input
        type="text"
        label={t.account.page.city}
        {...register('city')}
        error={errors?.city?.message}
      />

      <Button
        type="submit"
        variant="default"
        disabled={isEditProfileLoading}
        className="xsm:ml-0 ml-auto mt-[30px] text-[16px]"
      >
        {isEditProfileLoading ? <Spinner /> : t.account.page.buttonSave}
      </Button>
    </form>
  );
};
