import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import {
  useDeleteAvatar,
  useUploadAvatar,
} from '@/modules/account-modules/edit-profile-module';
import { useUserStore } from '@/store/userStore';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { ImageComponent } from '@/ui/image/ImageComponent';
import { useTranslation } from '@/components/internationalization';
import { useMeQuery } from '@/services';
import { StatusUser } from '@/types';

export const AvatarBlock = () => {
  const { data: me } = useMeQuery();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status]);

  const { urlAvatar, setUrlAvatar } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showErrorSizeImage, setShowErrorSizeImage] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { t } = useTranslation();
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
          width={width && width > 639 ? 130 : 120}
          className="rounded-full"
          height={width && width > 639 ? 130 : 120}
          alt="user-avatar"
        />
        {isHovered && !isDisabled && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ borderRadius: '50%' }}
          >
            <div className="flex gap-8">
              <div className="cursor-pointer" onClick={onSelectClick}>
                {isLoadingUploadAvatar ? (
                  <Spinner />
                ) : (
                  <FaUpload
                    className="hover:fill-accent-100"
                    size={width && width > 639 ? 26 : 22}
                  />
                )}
              </div>

              {urlAvatar && (
                <div className="cursor-pointer" onClick={() => deleteAvatar()}>
                  {isLoadingDeleteAvatar ? (
                    <Spinner />
                  ) : (
                    <FaTrash
                      className="hover:fill-accent-100"
                      size={width && width > 639 ? 26 : 22}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="align-middle flex flex-col items-center text-dark-150 text-xs pt-3 text-center">
        <span>{t.account.page.descriptionImage}</span>
        {showErrorSizeImage && (
          <span className="text-red-500">{t.account.page.errorMessage}</span>
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
