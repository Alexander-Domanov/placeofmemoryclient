import { ChangeEvent, useRef, useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import {
  useDeleteAvatar,
  useUploadAvatar,
} from '@/modules/account-modules/edit-profile-module';
import { useUserStore } from '@/store/userStore';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { ImageComponent } from '@/ui/image/ImageComponent';

export const AvatarBlock = () => {
  const { urlAvatar, setUrlAvatar } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showErrorSizeImage, setShowErrorSizeImage] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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

  const handleAvatarHover = () => {
    setIsHovered(true);
  };

  const handleAvatarLeave = () => {
    setIsHovered(false);
  };

  const { width } = useWindowSize();

  return (
    <>
      <div
        className={`relative flex sm:flex-col items-center gap-3 ${
          isHovered ? 'cursor-pointer' : ''
        }`}
        onMouseEnter={handleAvatarHover}
        onMouseLeave={handleAvatarLeave}
      >
        <ImageComponent
          src={urlAvatar}
          width={width && width > 639 ? 100 : 60}
          className="rounded-full"
          height={width && width > 639 ? 100 : 60}
          alt="user-avatar"
        />
        {isHovered && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ borderRadius: '50%' }}
          >
            <div className="flex gap-3">
              <div className="cursor-pointer" onClick={onSelectClick}>
                {isLoadingUploadAvatar ? (
                  <Spinner />
                ) : (
                  <FaUpload
                    className="hover:fill-accent-100"
                    size={width && width > 639 ? 22 : 16}
                  />
                )}
              </div>

              <div className="cursor-pointer" onClick={() => deleteAvatar()}>
                {isLoadingDeleteAvatar ? (
                  <Spinner />
                ) : (
                  <FaTrash
                    className="hover:fill-accent-100"
                    size={width && width > 639 ? 22 : 16}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3 flex-col align-middle items-center text-sm pt-3">
        <span>JPG, GIF або PNG. Максімальны памер 2 Мб</span>
        {showErrorSizeImage && (
          <span className="text-red-500">
            Памер файла перавышае 2 мегабайты
          </span>
        )}
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png, image/jpeg, image/tif"
        ref={fileInputRef}
        className="hidden"
        id="fileInput"
        onChange={handleFileUpload}
        multiple
      />
    </>
  );
};
