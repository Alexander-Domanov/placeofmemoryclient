import { ChangeEvent, useRef, useState } from 'react';
import { AvatarComponent, Button, Input } from '@/ui';
import {
  useDeleteAvatar,
  useUploadAvatar,
} from '@/modules/account-modules/edit-profile-module';
import { useUserStore } from '@/store/userStore';

export const EditProfile = () => {
  const [showErrorSizeImage, setShowErrorSizeImage] = useState<boolean>(false);
  const { urlAvatar } = useUserStore();
  const { isLoading: isLoadingUploadAvatar, mutate: uploadAvatar } =
    useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isLoading: isLoadingDeleteAvatar, mutate: deleteAvatar } =
    useDeleteAvatar();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.size <= 800 * 1024) {
        setShowErrorSizeImage(false);
        const formData = new FormData();
        formData.append('file', file);
        uploadAvatar(formData);
      } else {
        setShowErrorSizeImage(true);
      }
    }
  };
  const isDisabled = isLoadingUploadAvatar || isLoadingDeleteAvatar;

  const onSelectClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  return (
    <section className="flex flex-col items-center">
      <span>Edit Profile</span>
      <div className="flex pt-3 items-center gap-3">
        <AvatarComponent src={urlAvatar} alt="user-avatar" />
        <Button
          disabled={isLoadingUploadAvatar}
          type="button"
          onClick={onSelectClick}
        >
          Upload new picture
        </Button>
        <Input
          type="file"
          accept="image/jpeg,image/png, image/jpeg, image/tif"
          ref={fileInputRef}
          className="hidden"
          id="fileInput"
          onChange={handleFileUpload}
          multiple
        />
        <Button
          type="button"
          disabled={isDisabled}
          onClick={() => deleteAvatar()}
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-3 flex-col align-middle items-center text-sm pt-3">
        <span>JPG, GIF or PNG. Max size of 800K</span>
        {showErrorSizeImage && (
          <span className="text-red-500">File size exceeds 800 kilobytes</span>
        )}
      </div>
      <form className="flex flex-col align-middle w-[416px] pt-3 gap-3">
        <Input type="text" label="Username" />
        <Input type="text" label="firstname" />
        <Input type="text" label="lastname" />
        <span>DatePicker???</span>

        <Input type="text" label="city" />
        <Button
          type="submit"
          variant="default"
          className="xsm:ml-0 ml-auto mt-[30px] text-[16px]"
        >
          Save changes
        </Button>
      </form>
    </section>
  );
};
