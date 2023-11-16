import { ChangeEvent, useRef, useState } from 'react';
import {
  useDeleteAvatar,
  useUploadAvatar,
} from '@/modules/account-modules/edit-profile-module';
import { useUserStore } from '@/store/userStore';
import { AvatarComponent, Button, Input } from '@/ui';
import { Spinner } from '@/ui/spinner/Spinner';
import { IMAGE_FORMATS } from '@/common/constants';

export const AvatarBlock = () => {
  const { urlAvatar, setUrlAvatar } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showErrorSizeImage, setShowErrorSizeImage] = useState<boolean>(false);

  const { isLoading: isLoadingUploadAvatar, mutate: uploadAvatar } =
    useUploadAvatar();
  const { isLoading: isLoadingDeleteAvatar, mutate: deleteAvatar } =
    useDeleteAvatar({ setUrlAvatar });

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.size <= 2 * 1024 * 1024) {
        setShowErrorSizeImage(false);
        const formData = new FormData();
        formData.append('file', file);
        uploadAvatar(formData);
      } else {
        setShowErrorSizeImage(true);
      }
    }
  };
  const onSelectClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  return (
    <>
      <div className="flex sm:flex-col pt-3 items-center gap-3">
        <AvatarComponent src={urlAvatar} alt="user-avatar" />
        <Button
          disabled={isLoadingUploadAvatar}
          type="button"
          onClick={onSelectClick}
        >
          {isLoadingUploadAvatar ? <Spinner /> : 'Загрузіць новае фота'}
        </Button>
        <Input
          type="file"
          accept={IMAGE_FORMATS.join(',')}
          ref={fileInputRef}
          className="hidden"
          id="fileInput"
          onChange={handleFileUpload}
          multiple
        />
        <Button
          type="button"
          disabled={isLoadingDeleteAvatar}
          onClick={() => deleteAvatar()}
        >
          {isLoadingDeleteAvatar ? <Spinner /> : 'Выдаліць'}
        </Button>
      </div>
      <div className="flex gap-3 flex-col align-middle items-center text-sm pt-3">
        <span>JPG, GIF або PNG. Максімальны памер 2 Мб</span>
        {showErrorSizeImage && (
          <span className="text-red-500">
            Памер файла перавышае 2 мегабайты
          </span>
        )}
      </div>
    </>
  );
};
